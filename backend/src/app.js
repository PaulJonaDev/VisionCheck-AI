import express from 'express'
import cors from 'cors'
import { logger } from './core/logger.js'
import healthRoutes from './api/routes/health.routes.js'
import analysisRoutes from './api/routes/analysis.routes.js'
import uploadRoutes from './api/routes/upload.routes.js'
import mlRoutes from './api/routes/ml.routes.js'
import { errorHandler } from './core/errorHandler.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use(logger)
app.use(healthRoutes)
app.use(analysisRoutes)
app.use(uploadRoutes)
app.use(mlRoutes)
app.use(errorHandler)

export default app
