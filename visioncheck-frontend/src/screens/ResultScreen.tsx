import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../state/store';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { explain } from '../services/explanation';
import { addToHistory } from '../state/slices/analysisSlice';
import { useNavigation } from '@react-navigation/native';
import SectionHeader from '../ui/components/SectionHeader';
import PrimaryButton from '../ui/components/PrimaryButton';
import { colors, spacing, radius } from '../ui/theme';
import { useWindowDimensions } from 'react-native';

export default function ResultScreen() {
  const last = useSelector((s: RootState) => s.analysis.lastCapture);
  const dispatch = useDispatch();
  const nav = useNavigation();
  const { height, width } = useWindowDimensions();
  if (!last) return <View style={styles.center}><Text>No hay captura reciente.</Text></View>;
  const exp = explain(last.predictions);

  const saveToHistory = () => {
    dispatch(addToHistory(last));
    nav.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.photoWrap}>
        <Image source={{ uri: last.imageUri }} style={[styles.photo, { height: Math.min(360, Math.max(220, height * 0.4)) }]} />
        {!!last.quality.eyeBoxes && last.quality.eyeBoxes.length === 2 && (
          <>
            {last.quality.eyeBoxes.map((b, idx) => (
              <View key={`eb-${idx}`} style={[styles.box, {
                left: `${b.x * 100}%`,
                top: `${b.y * 100}%`,
                width: `${b.w * 100}%`,
                height: `${b.h * 100}%`,
              }]} />
            ))}
          </>
        )}
      </View>
      <SectionHeader title="Resultados del análisis" />
      {exp.lines.map((line, idx) => (
        <View key={`line-${idx}`} style={styles.lineBlock}>
          <Text style={styles.line}>{line}</Text>
          {!!exp.details?.[idx] && <Text style={styles.explain}>{exp.details[idx]}</Text>}
        </View>
      ))}
      {!!exp.hypotheses?.length && (
        <>
          <SectionHeader title="posibles patologias oculares(NO diagnoticas)" />
          <View style={[styles.chips, { marginHorizontal: -spacing.sm }]}>
            {exp.hypotheses.map((h, idx) => (
              <View key={`h-${idx}`} style={[styles.chip, { marginHorizontal: spacing.sm, marginBottom: spacing.sm }]}><Text style={styles.chipText}>{h}</Text></View>
            ))}
          </View>
        </>
      )}
      {!!exp.recommendation && (
        <>
          <SectionHeader title="Recomendación" />
          <Text style={styles.cta}>{exp.recommendation.callToAction}</Text>
          {!!exp.recommendation.exams.length && (
            <>
              <SectionHeader title="Posibles exámenes" />
              <View style={[styles.chips, { marginHorizontal: -spacing.sm }]}>
                {exp.recommendation.exams.map((h, idx) => (
                  <View key={`e-${idx}`} style={[styles.chip, { marginHorizontal: spacing.sm, marginBottom: spacing.sm }]}><Text style={styles.chipText}>{h}</Text></View>
                ))}
              </View>
            </>
          )}
        </>
      )}
      {typeof exp.lensProbability === 'number' && (
        <>
          <SectionHeader title="Posibilidad de requerir lentes" />
          <Text style={styles.cta}>{`${exp.lensProbability}% (estimación no diagnóstica)`}</Text>
        </>
      )}
      {!!exp.avoid?.length && (
        <>
          <SectionHeader title="Qué evitar" />
          <View style={[styles.chips, { marginHorizontal: -spacing.sm }]}>
            {exp.avoid.map((h, idx) => (
              <View key={`a-${idx}`} style={[styles.chip, { marginHorizontal: spacing.sm, marginBottom: spacing.sm }]}><Text style={styles.chipText}>{h}</Text></View>
            ))}
          </View>
        </>
      )}
      <Text style={styles.disclaimer}>{exp.disclaimer}</Text>
      <PrimaryButton title="Guardar en historial" onPress={saveToHistory} full />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  container: { padding: spacing.lg },
  photoWrap: { width: '100%', position: 'relative', marginBottom: spacing.md },
  photo: { width: '100%', height: 320, borderRadius: radius.md },
  box: { position: 'absolute', borderWidth: 2, borderColor: '#16C784', borderRadius: radius.sm },
  line: { fontSize: 14, marginBottom: 4, color: colors.text },
  lineBlock: { marginBottom: spacing.sm },
  explain: { fontSize: 13, color: colors.textDim },
  disclaimer: { fontSize: 12, color: colors.textDim, marginTop: spacing.sm },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.md },
  chip: { backgroundColor: colors.card, borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: 6 },
  chipText: { color: colors.text },
  cta: { color: colors.text, fontSize: 14, marginBottom: spacing.sm },
});