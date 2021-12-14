const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const cors = require('cors')
require('dotenv').config()
const { Sequelize, QueryTypes } = require('sequelize')

const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const testRouter = require('./controllers/tests')
const mongoose = require('mongoose')

const app = express()

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
})

const main = async () => {
  try {
    await sequelize.authenticate()
    const blogs = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT })
    console.log(blogs)
    sequelize.close()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/testing', testRouter)

app.use(middleware.errorHandler)

// heroku health check
app.get('/health', (req, res) => {
  res.send('ok')
})

app.get('/version', (req, res) => {
  res.send('2')
})

main() 

module.exports = app