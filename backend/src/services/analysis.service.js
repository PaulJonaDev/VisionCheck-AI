export function analyze(preds) {
  const p = preds || { enrojecimiento: 0.3, opacidad: 0.2, reflejo_irregular: 0.4, inflamacion: 0.1, fatiga: 0.5 }
  const hypotheses = Object.entries(p).map(([k, v]) => ({ pattern: k, confidence: Number(v), severity: v > 0.6 ? 'alta' : v > 0.3 ? 'media' : 'baja' }))
  const recommendations = [ 'Consultar profesional si los síntomas persisten', 'Descansos visuales y buena iluminación', 'Evitar exposición prolongada a pantallas' ]
  return { hypotheses, recommendations }
}
