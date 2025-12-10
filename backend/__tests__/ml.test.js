import request from 'supertest'
import app from '../src/app.js'

test('POST /ml/predict con imageUri devuelve preds', async () => {
  const res = await request(app).post('/ml/predict').send({ imageUri: 'seed://image' }).set('Content-Type', 'application/json')
  expect(res.status).toBe(200)
  expect(res.body).toHaveProperty('preds')
  const p = res.body.preds
  expect(p).toHaveProperty('enrojecimiento')
  expect(p).toHaveProperty('opacidad')
})

test('POST /ml/predict con base64 devuelve preds', async () => {
  const png1x1 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII='
  const res = await request(app).post('/ml/predict').send({ base64: `data:image/png;base64,${png1x1}` }).set('Content-Type', 'application/json')
  expect(res.status).toBe(200)
  expect(res.body).toHaveProperty('preds')
})

test('POST /ml/predict sin imagen devuelve 400', async () => {
  const res = await request(app).post('/ml/predict').send({}).set('Content-Type', 'application/json')
  expect(res.status).toBe(400)
})

