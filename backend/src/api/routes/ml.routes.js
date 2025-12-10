import { Router } from 'express'
import { postPredict } from '../controllers/ml.controller.js'
import { validateImagePayload } from '../../middlewares/validation.js'

const r = Router()
r.post('/ml/predict', validateImagePayload, postPredict)

export default r
