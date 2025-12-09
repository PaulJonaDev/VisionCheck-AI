import { Router } from 'express'
import { getHealth } from '../controllers/health.controller.js'
const r = Router()
r.get('/health', getHealth)
export default r