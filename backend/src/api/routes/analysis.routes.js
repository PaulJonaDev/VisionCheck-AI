import { Router } from 'express'
import { postAnalysis, getAnalyses } from '../controllers/analysis.controller.js'
const r = Router()
r.post('/analysis', postAnalysis)
r.get('/analysis', getAnalyses)
export default r