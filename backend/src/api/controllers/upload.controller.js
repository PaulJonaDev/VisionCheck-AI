import { created } from '../../core/response.js'
import { validateImage } from '../../services/image.service.js'
import { saveCapture } from '../../services/storage.service.js'
export function postUpload(req, res) { const v = validateImage(req.body?.imageUri); const item = saveCapture({ id: String(Date.now()), imageUri: v.uri, meta: req.body }); created(res, item) }