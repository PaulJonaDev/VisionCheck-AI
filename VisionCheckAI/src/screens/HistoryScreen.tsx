import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../ui/theme';
import { useWindowDimensions } from 'react-native';

export default function HistoryScreen() {
  const history = useSelector((s: RootState) => s.analysis.history);
  const { width } = useWindowDimensions();
  const photoSize = Math.min(120, Math.max(72, width * 0.24));
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <FlatList
        data={history}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: spacing.lg }}
        ListEmptyComponent={<View style={styles.center}><Text>Sin historial aún.</Text></View>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imageUri }} style={[styles.photo, { width: photoSize, height: photoSize }]} />
            <View style={{ flex: 1 }}>
              <Text style={styles.date}>{new Date(item.capturedAt).toLocaleString()}</Text>
              {item.predictions.slice(0, 3).map(p => (
                <Text key={`${item.id}-${p.pattern}`} style={styles.itemText}>{`${p.pattern} ${(p.confidence * 100).toFixed(0)}% (${p.severity})`}</Text>
              ))}
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  card: { flexDirection: 'row', backgroundColor: colors.card, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.md },
  photo: { width: 96, height: 96, borderRadius: radius.md, marginRight: spacing.md },
  date: { fontWeight: '600', marginBottom: 4, color: colors.text },
  itemText: { color: colors.text },
});