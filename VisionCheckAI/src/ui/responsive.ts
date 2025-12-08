import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const isSmallDevice = width < 360;
export const isTablet = Math.max(width, height) >= 900;

export function scaleSize(size: number) {
  const base = 375;
  return Math.round((width / base) * size);
}

export function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}