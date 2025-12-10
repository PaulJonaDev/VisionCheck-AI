import { ok, fail } from '../../core/response.js'
import { predict } from '../../services/ml.service.js'
import fs from 'fs/promises'
import os from 'os'
import path from 'path'

export async function postPredict(req, res) {
  const { imageUri, base64, modelPath } = req.body || {}
  if (!imageUri && !base64) return fail(res, 400, 'imageUri or base64 required')
  let tmpFile
  try {
    let uri = imageUri
    if (base64 && !imageUri) {
      const buf = Buffer.from(base64.replace(/^data:image\/[a-zA-Z]+;base64,/, ''), 'base64')
      tmpFile = path.join(os.tmpdir(), `vcai_${Date.now()}.jpg`)
      await fs.writeFile(tmpFile, buf)
      uri = tmpFile
    }
    const preds = await predict(uri, { modelPath })
    ok(res, { preds, image: uri, model: preds?.model })
  } catch (e) {
    const code = e?.code || 'ML_ERROR'
    const status = code === 'ML_SCRIPT_NOT_FOUND' ? 500 : code === 'ML_TIMEOUT' ? 504 : 500
    fail(res, status, code, { message: e?.message })
  } finally {
    if (tmpFile) {
      try { await fs.unlink(tmpFile) } catch {}
    }
  }
}

