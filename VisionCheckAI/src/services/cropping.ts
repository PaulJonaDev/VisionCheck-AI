import { Platform, Image as RNImage } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';
import type { EyeBox } from '../types';

function clamp(n: number, min: number, max: number) { return Math.max(min, Math.min(max, n)); }

async function getImageSize(uri: string): Promise<{ width: number; height: number }> {
  if (Platform.OS === 'web') {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = uri;
    await new Promise<void>((res, rej) => { img.onload = () => res(); img.onerror = () => res(); });
    return { width: img.naturalWidth || img.width, height: img.naturalHeight || img.height };
  }
  return await new Promise((res, rej) => RNImage.getSize(uri, (w, h) => res({ width: w, height: h }),(e)=>res({width:1080,height:1080})));
}

export async function cropToEyesRegion(uri: string, eyeBoxes?: EyeBox[] | null): Promise<string> {
  const { width, height } = await getImageSize(uri);
  let x = Math.round(width * 0.2);
  let y = Math.round(height * 0.25);
  let w = Math.round(width * 0.6);
  let h = Math.round(height * 0.35);

  if (eyeBoxes && eyeBoxes.length === 2) {
    const xs = [eyeBoxes[0].x, eyeBoxes[1].x];
    const ys = [eyeBoxes[0].y, eyeBoxes[1].y];
    const xMaxs = [eyeBoxes[0].x + eyeBoxes[0].w, eyeBoxes[1].x + eyeBoxes[1].w];
    const yMaxs = [eyeBoxes[0].y + eyeBoxes[0].h, eyeBoxes[1].y + eyeBoxes[1].h];
    const xMinN = Math.min(xs[0], xs[1]);
    const yMinN = Math.min(ys[0], ys[1]);
    const xMaxN = Math.max(xMaxs[0], xMaxs[1]);
    const yMaxN = Math.max(yMaxs[0], yMaxs[1]);
    const padYTop = 0.12; // cejas
    const padYBottom = 0.10; // tabique
    const padX = 0.08;
    x = Math.round(width * clamp(xMinN - padX, 0, 1));
    y = Math.round(height * clamp(yMinN - padYTop, 0, 1));
    const x2 = Math.round(width * clamp(xMaxN + padX, 0, 1));
    const y2 = Math.round(height * clamp(yMaxN + padYBottom, 0, 1));
    w = clamp(x2 - x, 1, width);
    h = clamp(y2 - y, 1, height);
  }

  const result = await ImageManipulator.manipulateAsync(uri, [{ crop: { originX: x, originY: y, width: w, height: h } }], { compress: 0.9, format: ImageManipulator.SaveFormat.JPEG });
  return result.uri;
}