const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const cors = require('cors')
require('dotenv').config()

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const authorRouter = require('./controllers/authors')

const middleware = require('./utils/middleware')

const app = express()

app.use(cors())
app.use(express.json())
//app.use(express.static('build'))
app.use(middleware.tokenExtractor)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors', authorRouter)

app.use(middleware.errorHandler)

module.exports = app