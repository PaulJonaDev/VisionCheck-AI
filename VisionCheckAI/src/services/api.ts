import { cfg } from '../config/env'
import type { PatternPrediction } from '../types'

function toPredictions(preds: any): PatternPrediction[] {
  const entries = Object.entries(preds || {})
  return entries
    .filter(([k]) => ['enrojecimiento','opacidad','reflejo_irregular','inflamacion','fatiga'].includes(String(k)))
    .map(([pattern, v]) => {
      const val = Number(v)
      const severity = val > 0.6 ? 'alta' : val > 0.3 ? 'media' : 'baja'
      return { pattern: pattern as any, confidence: val, severity }
    })
}

export async function uploadCapture(imageUri: string, meta?: any): Promise<{ id: string, predictions: PatternPrediction[] }>
{
  const res = await fetch(`${cfg.backendUrl}/upload`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ imageUri, meta })
  })
  const json = await res.json()
  const predictions = toPredictions(json?.analysis?.preds)
  return { id: String(json?.id || Date.now()), predictions }
}

