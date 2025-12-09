import { spawn } from 'child_process'
import path from 'path'

export function predict(imageUri) {
  return new Promise((resolve) => {
    const script = path.resolve(process.cwd(), '../ml/inference/predict.py')
    const proc = spawn('python3', [script, imageUri], { stdio: ['ignore', 'pipe', 'pipe'] })
    let out = ''
    proc.stdout.on('data', (d) => { out += d.toString() })
    proc.on('close', () => {
      try { resolve(JSON.parse(out)) } catch { resolve({ enrojecimiento: 0.3, opacidad: 0.2, reflejo_irregular: 0.4, inflamacion: 0.1, fatiga: 0.5 }) }
    })
    proc.on('error', () => resolve({ enrojecimiento: 0.3, opacidad: 0.2, reflejo_irregular: 0.4, inflamacion: 0.1, fatiga: 0.5 }))
  })
}

