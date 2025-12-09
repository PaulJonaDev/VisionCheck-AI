import { created } from '../../core/response.js'
import { validateImage } from '../../services/image.service.js'
import { saveCapture } from '../../services/storage.service.js'
import { predict } from '../../services/ml.service.js'
import { analyze } from '../../services/analysis.service.js'
export async function postUpload(req, res) {
  const v = validateImage(req.body?.imageUri)
  const preds = await predict(v.uri)
  const explanation = analyze(preds)
  const item = saveCapture({ id: String(Date.now()), imageUri: v.uri, analysis: { preds, explanation }, meta: req.body })
  created(res, item)
}
