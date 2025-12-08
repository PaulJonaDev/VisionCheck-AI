import { Text, StyleSheet, View } from 'react-native';
import { colors, spacing } from '../theme';

type Props = { title: string };

export default function SectionHeader({ title }: Props) {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  title: { color: colors.text, fontSize: 16, fontWeight: '700', marginRight: spacing.sm },
  line: { flex: 1, height: 1, backgroundColor: '#243147' },
});