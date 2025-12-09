import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { cfg } from './config.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

const captures = []

app.get('/health', (req, res) => {
  res.json({ ok: true })
})

app.post('/captures', (req, res) => {
  const { userId, imageUri, analysis } = req.body || {}
  const item = { id: String(Date.now()), userId, imageUri, analysis, at: new Date().toISOString() }
  captures.push(item)
  res.status(201).json(item)
})

app.get('/captures', (req, res) => {
  res.json(captures)
})

app.listen(cfg.port, () => {})