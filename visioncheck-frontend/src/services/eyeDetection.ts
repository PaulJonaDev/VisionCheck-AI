import { Platform } from 'react-native';
import type { EyeBox } from '../types';

export async function detectEyes(imageUri: string): Promise<EyeBox[] | null> {
  if (Platform.OS !== 'web') return null;
  try {
    const mod = await import('@mediapipe/face_mesh');
    const { FaceMesh } = mod as any;
    const faceMesh = new FaceMesh({
      locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });
    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageUri;

    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = reject;
    });

    const results: any = await new Promise((resolve) => {
      faceMesh.onResults((res: any) => resolve(res));
      faceMesh.send({ image: img });
    });

    const landmarks = results?.multiFaceLandmarks?.[0];
    if (!landmarks) return null;

    const leftIdx = [33, 133, 159, 145];
    const rightIdx = [263, 362, 386, 374];

    const toBox = (idxs: number[]): EyeBox => {
      const xs = idxs.map(i => landmarks[i].x);
      const ys = idxs.map(i => landmarks[i].y);
      const xMin = Math.max(Math.min(...xs) - 0.02, 0);
      const yMin = Math.max(Math.min(...ys) - 0.02, 0);
      const xMax = Math.min(Math.max(...xs) + 0.02, 1);
      const yMax = Math.min(Math.max(...ys) + 0.02, 1);
      return { x: xMin, y: yMin, w: xMax - xMin, h: yMax - yMin };
    };

    const left = toBox(leftIdx);
    const right = toBox(rightIdx);
    return [left, right];
  } catch (e) {
    return null;
  }
}