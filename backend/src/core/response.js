export function ok(res, data={}) { res.status(200).json(data) }
export function created(res, data={}) { res.status(201).json(data) }
export function fail(res, status=400, message='Error', details) { res.status(status).json({ error: message, details }) }