import { created } from '../../core/response.js'
import { validateImage } from '../../services/image.service.js'
import { saveCapture } from '../../services/storage.service.js'
import { predict, FALLBACK_PREDS } from '../../services/ml.service.js'
import { analyze } from '../../services/analysis.service.js'
export async function postUpload(req, res) {
  const v = validateImage(req.body?.imageUri)
  let preds = FALLBACK_PREDS
  try { preds = await predict(v.uri) } catch (e) { preds = FALLBACK_PREDS }
  const explanation = analyze(preds)
  const item = saveCapture({ id: String(Date.now()), imageUri: v.uri, analysis: { preds, explanation }, meta: req.body })
  created(res, item)
}
