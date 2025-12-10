import { cfg } from '../../config/env'

export async function request(path: string, init?: RequestInit) {
  const res = await fetch(`${cfg.backendUrl}${path}`, init)
  return res.json()
}

