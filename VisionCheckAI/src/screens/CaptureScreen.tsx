import { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { setLastCapture } from '../state/slices/analysisSlice';
import { assessQualityForUri } from '../services/quality';
import { PatternPrediction } from '../types';
import { RootStackParamList } from '../navigation';
import PrimaryButton from '../ui/components/PrimaryButton';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing } from '../ui/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useWindowDimensions } from 'react-native';
import { detectEyes } from '../services/eyeDetection';
import { cropToEyesRegion } from '../services/cropping';

export default function CaptureScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const cameraRef = useRef<any>(null);
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const guideSize = Math.max(60, Math.min(88, width * 0.22));

  useEffect(() => {
    if (!permission || !permission.granted) requestPermission();
  }, [permission, requestPermission]);

  const onCapture = async (camera?: any) => {
    if (!camera) return;
    const photo = await camera.takePictureAsync({ skipProcessing: true, quality: 0.9 });
    setPhotoUri(photo.uri);
    const quality = await assessQualityForUri(photo.uri);
    let eyeBoxes = null;
    try {
      eyeBoxes = await detectEyes(photo.uri);
    } catch {}
    let croppedUri = photo.uri;
    try {
      croppedUri = await cropToEyesRegion(photo.uri, eyeBoxes ?? undefined);
    } catch {}
    const preds: PatternPrediction[] = [
      { pattern: 'enrojecimiento', confidence: 0.4, severity: 'baja' },
      { pattern: 'opacidad', confidence: 0.2, severity: 'baja' },
      { pattern: 'reflejo_irregular', confidence: 0.3, severity: 'media' },
    ];
    dispatch(
      setLastCapture({
        id: Date.now().toString(),
        imageUri: croppedUri,
        capturedAt: Date.now(),
        quality: { brightness: quality.brightness, blurScore: undefined, distanceHint: undefined, eyeBoxes: eyeBoxes ?? undefined },
        predictions: preds,
      })
    );
    nav.navigate('Result');
  };

  if (!permission) {
    return (
      <View style={styles.center}><Text style={styles.text}>Solicitando permiso de cámara…</Text></View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>Se requiere acceso a la cámara.</Text>
        <PrimaryButton title="Permitir" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView ref={cameraRef} style={{ flex: 1 }} facing="front">
        <View style={[styles.eyeGuidesLayer, { top: Math.max(insets.top + height * 0.18, insets.top + 80) }]}>
          <View style={styles.eyeGuidesRow}>
            <View style={[styles.eyeGuide, { width: guideSize, height: guideSize, borderRadius: guideSize / 2 }]} />
            <View style={{ width: spacing.md }} />
            <View style={[styles.eyeGuide, { width: guideSize, height: guideSize, borderRadius: guideSize / 2 }]} />
          </View>
        </View>
        <LinearGradient colors={["transparent", "rgba(0,0,0,0.6)"]} style={[styles.overlay, { paddingBottom: spacing.lg + insets.bottom, paddingHorizontal: Math.max(spacing.md, Math.min(spacing.xl, width * 0.05)) }]}>
          <Text style={[styles.guide, { maxWidth: width - spacing.xl * 2 } ]}>Alinea tus ojos en los círculos guía para un escaneo más preciso</Text>
          <PrimaryButton title="Capturar" onPress={() => onCapture(cameraRef.current)} full />
          <View style={{ height: spacing.sm }} />
          <PrimaryButton title="Historial" onPress={() => nav.navigate('History')} variant="secondary" full />
        </LinearGradient>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bg },
  overlay: { flex: 1, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: spacing.lg, paddingHorizontal: spacing.lg },
  guide: { color: colors.text, backgroundColor: 'rgba(20,25,38,0.6)', padding: spacing.sm, borderRadius: 8, marginBottom: spacing.sm },
  text: { color: colors.text },
  eyeGuidesRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md },
  eyeGuide: { width: 72, height: 72, borderRadius: 36, borderWidth: 2, borderColor: '#8AA0C9', backgroundColor: 'rgba(138,160,201,0.08)' },
  eyeGuidesLayer: { position: 'absolute', width: '100%', alignItems: 'center' },
});