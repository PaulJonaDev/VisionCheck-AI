import dotenv from 'dotenv'
dotenv.config()

export const cfg = {
  port: process.env.PORT || 4000
}