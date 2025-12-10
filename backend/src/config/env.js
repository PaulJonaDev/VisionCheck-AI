import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '../../..')

export const env = {
  port: process.env.PORT || 4000,
  ml: {
    script: process.env.ML_SCRIPT_PATH || path.join(repoRoot, 'ml/inference/predict.py'),
    model: process.env.ML_MODEL_PATH || path.join(repoRoot, 'ml/models/mobilenet_v1/model.h5'),
    timeoutMs: Number(process.env.ML_TIMEOUT_MS || 5000)
  },
  upload: {
    maxImageBytes: Number(process.env.MAX_IMAGE_BYTES || 6 * 1024 * 1024)
  }
}
