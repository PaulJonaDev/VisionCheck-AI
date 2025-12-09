import request from 'supertest'
import app from '../src/app.js'

test('POST /upload devuelve análisis y guarda captura', async () => {
  const res = await request(app).post('/upload').send({ imageUri: 'seed://image' }).set('Content-Type', 'application/json')
  expect(res.status).toBe(201)
  expect(res.body).toHaveProperty('id')
  expect(res.body).toHaveProperty('analysis')
  expect(res.body.analysis).toHaveProperty('preds')
})

test('GET /analysis lista capturas', async () => {
  const res = await request(app).get('/analysis')
  expect(res.status).toBe(200)
  expect(Array.isArray(res.body)).toBe(true)
})

test('POST /analysis compone explicación desde predicciones', async () => {
  const res = await request(app).post('/analysis').send({ enrojecimiento: 0.4, opacidad: 0.2, reflejo_irregular: 0.3, inflamacion: 0.1, fatiga: 0.5 }).set('Content-Type', 'application/json')
  expect(res.status).toBe(201)
  expect(res.body).toHaveProperty('hypotheses')
  expect(res.body.hypotheses.length).toBeGreaterThan(0)
})
