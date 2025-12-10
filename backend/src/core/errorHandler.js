export function errorHandler(err, req, res, next) {
  const status = err.status || 500
  const payload = { error: err.code || 'InternalError', message: err.message || 'Internal Error' }
  if (err.details) payload.details = err.details
  res.status(status).json(payload)
}
