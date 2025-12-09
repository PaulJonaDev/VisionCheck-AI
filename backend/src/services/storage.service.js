const store = { captures: [] }
export function saveCapture(item) { store.captures.push(item); return item }
export function listCaptures() { return store.captures }