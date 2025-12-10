import { fail } from '../core/response.js'
import { env } from '../config/env.js'

const ALLOWED_MIMES = new Set(['image/jpeg','image/jpg','image/png'])
const ALLOWED_URI_SCHEMES = ['http:','https:','file:','seed:']

function approxBase64Bytes(b64) {
  const len = b64.length
  const padding = (b64.endsWith('==') ? 2 : b64.endsWith('=') ? 1 : 0)
  return Math.floor(len * 3/4) - padding
}

export function validateImagePayload(req, res, next) {
  const { imageUri, base64 } = req.body || {}
  if (!imageUri && !base64) return fail(res, 400, 'imageUri or base64 required')

  if (base64) {
    const m = String(base64).match(/^data:(.+);base64,(.+)$/)
    if (!m) return fail(res, 400, 'Invalid base64 data URL')
    const mime = m[1]
    const data = m[2]
    if (!ALLOWED_MIMES.has(mime)) return fail(res, 415, 'Unsupported image mime type', { mime })
    const bytes = approxBase64Bytes(data)
    if (bytes > env.upload.maxImageBytes) return fail(res, 413, 'Image too large', { maxBytes: env.upload.maxImageBytes })
    if (!/^[-A-Za-z0-9+/]+={0,2}$/.test(data)) return fail(res, 400, 'Invalid base64 payload')
  }

  if (imageUri) {
    try {
      const u = new URL(String(imageUri))
      if (!ALLOWED_URI_SCHEMES.includes(u.protocol)) return fail(res, 400, 'Unsupported URI scheme', { protocol: u.protocol })
      if (String(imageUri).length > 2048) return fail(res, 414, 'URI too long')
      const ext = (u.pathname.split('.').pop() || '').toLowerCase()
      if (ext && !['jpg','jpeg','png'].includes(ext)) return fail(res, 415, 'Unsupported image extension', { ext })
    } catch {
      // allow non-URL custom schemes like seed://image
      if (!String(imageUri).startsWith('seed://')) return fail(res, 400, 'Invalid imageUri')
    }
  }
  next()
}

