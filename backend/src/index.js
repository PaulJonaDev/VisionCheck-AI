import app from './app.js'
import { env } from './config/env.js'
const PORT = process.env.PORT || env.port
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`))