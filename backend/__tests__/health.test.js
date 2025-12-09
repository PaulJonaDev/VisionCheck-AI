import request from 'supertest'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

function buildApp() {
  const app = express()
  app.use(cors())
  app.use(express.json())
  app.use(morgan('dev'))
  app.get('/health', (req, res) => res.json({ ok: true }))
  return app
}

test('GET /health responde ok', async () => {
  const app = buildApp()
  const res = await request(app).get('/health')
  expect(res.status).toBe(200)
  expect(res.body.ok).toBe(true)
})