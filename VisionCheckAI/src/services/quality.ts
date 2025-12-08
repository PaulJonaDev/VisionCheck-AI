export type QualityFeedback = {
  messages: string[];
  ok: boolean;
};

export function assessQuality(): QualityFeedback {
  const messages: string[] = [];
  let ok = true;
  // Placeholder de calidad. En producción calcular blur/iluminación/distancia.
  messages.push('Mantén el dispositivo estable');
  messages.push('Asegura buena iluminación frontal');
  return { messages, ok };
}