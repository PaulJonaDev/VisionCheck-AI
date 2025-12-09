import { Router } from 'express'
import { postUpload } from '../controllers/upload.controller.js'
const r = Router()
r.post('/upload', postUpload)
export default r