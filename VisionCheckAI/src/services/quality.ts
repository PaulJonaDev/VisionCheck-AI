export type QualityFeedback = { messages: string[]; ok: boolean; brightness?: number };

export async function assessQualityForUri(uri: string): Promise<QualityFeedback> {
  const messages: string[] = [];
  let ok = true;
  let brightness: number | undefined = undefined;
  if (typeof window !== 'undefined') {
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = uri;
      await new Promise<void>((res, rej) => {
        img.onload = () => res();
        img.onerror = () => res();
      });
      const canvas = document.createElement('canvas');
      const w = 64, h = 64;
      canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, w, h);
        const data = ctx.getImageData(0, 0, w, h).data;
        let sum = 0;
        for (let i = 0; i < data.length; i += 4) {
          const y = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
          sum += y;
        }
        brightness = Math.round(sum / (w * h));
        if (brightness < 60) { messages.push('Mejora la iluminación'); ok = false; }
      }
    } catch {}
  }
  messages.push('Mantén el dispositivo estable');
  return { messages, ok, brightness };
}
