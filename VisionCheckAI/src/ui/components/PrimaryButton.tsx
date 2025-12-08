import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, radius, spacing } from '../theme';

type Props = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  full?: boolean;
};

export default function PrimaryButton({ title, onPress, variant = 'primary', full }: Props) {
  const style = [
    styles.base,
    variant === 'primary' ? styles.primary : styles.secondary,
    full ? { alignSelf: 'stretch' } : {},
  ];
  const textStyle = [styles.text, variant === 'secondary' ? styles.textSecondary : {}];
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: { paddingVertical: spacing.md, paddingHorizontal: spacing.xl, borderRadius: radius.lg },
  primary: { backgroundColor: colors.primary },
  secondary: { backgroundColor: colors.card, borderWidth: 1, borderColor: '#223046' },
  text: { color: '#fff', fontWeight: '600', textAlign: 'center' },
  textSecondary: { color: colors.text },
});