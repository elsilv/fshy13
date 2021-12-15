const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const cors = require('cors')
require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize')

const middleware = require('./utils/middleware')
/*
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const testRouter = require('./controllers/tests')
const mongoose = require('mongoose')
*/

const app = express()

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
})

class Blog extends Model {}
Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.TEXT,
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blog'
})

Blog.sync()

app.use(cors())
app.use(express.json())
//app.use(express.static('build'))
app.use(middleware.tokenExtractor)

/*
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/testing', testRouter)
*/

app.use(middleware.errorHandler)

app.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

app.post('/api/blogs', async (req, res) => {
  try {
    const blog = await Blog.create(req.body)
    return res.json(blog)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

app.delete('/api/blogs/:id', async (req, res) => {
  console.log(req.params.id)
  var id = req.params.id
  const blog = await Blog.findByPk(id)
  console.log(blog)
  
  if(blog === null ) {
    console.log('Blog not found')
  } else {
    await blog.destroy()
  }
})

module.exports = app