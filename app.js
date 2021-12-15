const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const cors = require('cors')
require('dotenv').config()

const blogsRouter = require('./controllers/blogs')

const middleware = require('./utils/middleware')

const app = express()

app.use(cors())
app.use(express.json())
//app.use(express.static('build'))
app.use(middleware.tokenExtractor)
app.use('/api/blogs', blogsRouter)

app.use(middleware.errorHandler)

module.exports = app