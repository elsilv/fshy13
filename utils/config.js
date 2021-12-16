require('dotenv').config()

let PORT = process.env.PORT || 3001
//let MONGODB_URI = process.env.MONGODB_URI

let DATABASE_URL = process.env.DATABASE_URL

let SECRET = process.env.SECRET

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = {
  DATABASE_URL,
  PORT,
  SECRET
} 