import { Platform, Image as RNImage } from 'react-native'
import type { EyeBox } from '../../types'
import * as ImageManipulator from 'expo-image-manipulator'

export async function detectEyes(imageUri: string): Promise<EyeBox[] | null> {
  if (Platform.OS !== 'web') return null
  try {
    const mod = await import('@mediapipe/face_mesh')
    const { FaceMesh } = mod as any
    const faceMesh = new FaceMesh({ locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}` })
    faceMesh.setOptions({ maxNumFaces: 1, refineLandmarks: true, minDetectionConfidence: 0.5, minTrackingConfidence: 0.5 })
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = imageUri
    await new Promise<void>((resolve, reject) => { img.onload = () => resolve(); img.onerror = reject })
    const results: any = await new Promise((resolve) => { faceMesh.onResults((res: any) => resolve(res)); faceMesh.send({ image: img }) })
    const landmarks = results?.multiFaceLandmarks?.[0]
    if (!landmarks) return null
    const leftIdx = [33, 133, 159, 145]
    const rightIdx = [263, 362, 386, 374]
    const toBox = (idxs: number[]): EyeBox => {
      const xs = idxs.map(i => landmarks[i].x)
      const ys = idxs.map(i => landmarks[i].y)
      const xMin = Math.max(Math.min(...xs) - 0.02, 0)
      const yMin = Math.max(Math.min(...ys) - 0.02, 0)
      const xMax = Math.min(Math.max(...xs) + 0.02, 1)
      const yMax = Math.min(Math.max(...ys) + 0.02, 1)
      return { x: xMin, y: yMin, w: xMax - xMin, h: yMax - yMin }
    }
    const left = toBox(leftIdx)
    const right = toBox(rightIdx)
    return [left, right]
  } catch { return null }
}

function clamp(n: number, min: number, max: number) { return Math.max(min, Math.min(max, n)) }

async function getImageSize(uri: string): Promise<{ width: number; height: number }> {
  if (Platform.OS === 'web') {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = uri
    await new Promise<void>((res) => { img.onload = () => res(); img.onerror = () => res() })
    return { width: img.naturalWidth || img.width, height: img.naturalHeight || img.height }
  }
  return await new Promise((res) => RNImage.getSize(uri, (w, h) => res({ width: w, height: h }), () => res({ width: 1080, height: 1080 })))
}

export async function cropToEyesRegion(uri: string, eyeBoxes?: EyeBox[] | null): Promise<string> {
  const { width, height } = await getImageSize(uri)
  let x = Math.round(width * 0.2)
  let y = Math.round(height * 0.25)
  let w = Math.round(width * 0.6)
  let h = Math.round(height * 0.35)
  if (eyeBoxes?.length === 2) {
    const xs = [eyeBoxes[0].x, eyeBoxes[1].x]
    const ys = [eyeBoxes[0].y, eyeBoxes[1].y]
    const xMaxs = [eyeBoxes[0].x + eyeBoxes[0].w, eyeBoxes[1].x + eyeBoxes[1].w]
    const yMaxs = [eyeBoxes[0].y + eyeBoxes[0].h, eyeBoxes[1].y + eyeBoxes[1].h]
    const xMinN = Math.min(xs[0], xs[1])
    const yMinN = Math.min(ys[0], ys[1])
    const xMaxN = Math.max(xMaxs[0], xMaxs[1])
    const yMaxN = Math.max(yMaxs[0], yMaxs[1])
    const padYTop = 0.12
    const padYBottom = 0.1
    const padX = 0.08
    x = Math.round(width * clamp(xMinN - padX, 0, 1))
    y = Math.round(height * clamp(yMinN - padYTop, 0, 1))
    const x2 = Math.round(width * clamp(xMaxN + padX, 0, 1))
    const y2 = Math.round(height * clamp(yMaxN + padYBottom, 0, 1))
    w = clamp(x2 - x, 1, width)
    h = clamp(y2 - y, 1, height)
  }
  const result = await ImageManipulator.manipulateAsync(uri, [{ crop: { originX: x, originY: y, width: w, height: h } }], { compress: 0.9, format: ImageManipulator.SaveFormat.JPEG })
  return result.uri
}

