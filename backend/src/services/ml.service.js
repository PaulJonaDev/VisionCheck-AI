import { spawn } from 'child_process'
import { env } from '../config/env.js'

/**
 * ML Service Contract
 * Input: { imageUri: string, modelPath?: string }
 * Output: { enrojecimiento:number, opacidad:number, reflejo_irregular:number, inflamacion:number, fatiga:number, image?:string, model?:string }
 * Errors: ML_SCRIPT_NOT_FOUND, ML_PROCESS_ERROR, ML_TIMEOUT, ML_OUTPUT_PARSE_ERROR
 */

export const FALLBACK_PREDS = { enrojecimiento: 0.3, opacidad: 0.2, reflejo_irregular: 0.4, inflamacion: 0.1, fatiga: 0.5 }

export function predict(imageUri, options = {}) {
  const script = options.scriptPath || env.ml.script
  const modelPath = options.modelPath || env.ml.model
  const timeoutMs = options.timeoutMs || env.ml.timeoutMs
  return new Promise((resolve, reject) => {
    if (!script) return reject({ code: 'ML_SCRIPT_NOT_FOUND', message: 'ML script path missing' })
    const args = [script, imageUri, modelPath]
    const proc = spawn('python3', args, { stdio: ['ignore', 'pipe', 'pipe'] })
    let out = ''
    let timedOut = false
    const timer = setTimeout(() => { timedOut = true; try { proc.kill('SIGKILL') } catch {} ; reject({ code: 'ML_TIMEOUT', message: 'ML process timed out' }) }, timeoutMs)
    proc.stdout.on('data', (d) => { out += d.toString() })
    proc.on('error', (err) => { clearTimeout(timer); if (!timedOut) reject({ code: 'ML_PROCESS_ERROR', message: String(err && err.message || 'process error') }) })
    proc.on('close', (code) => {
      clearTimeout(timer)
      if (timedOut) return
      if (code !== 0 && code !== null) return reject({ code: 'ML_PROCESS_ERROR', message: `exit code ${code}` })
      try { resolve(JSON.parse(out)) } catch { reject({ code: 'ML_OUTPUT_PARSE_ERROR', message: 'Invalid ML output' }) }
    })
  })
}
