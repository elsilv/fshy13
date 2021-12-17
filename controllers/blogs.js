const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')

const { Blog, User } = require('../models')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      console.log(authorization.substring(7))
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch (error) {
      console.log(error)
      return res.status(401).json({ error: 'token invalid'})
    }
  } else {
    return res.status(401).json({ error: 'token missing'})
  }
  next()
}

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    }
  })
  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({ ...req.body, userId: user.id })
    res.json(blog)
  } catch(error) {
    return res.status(400).json({ error: 'Something gone wrong' })
  }
})

router.delete('/:id', tokenExtractor, async (req, res) => {
  var id = req.params.id
  const blog = await Blog.findByPk(id)

  if(blog.userId === req.decodedToken.id) {
    await blog.destroy()
  } else {
    res.status(401).send({ error: 'Wrong token' })
  }
})

router.put('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  if (blog) {
    blog.likes = req.body.likes
    console.log(req.body.title)
    await blog.save()
      res.json(blog)
  } else {
    res.status(404).send({ error: 'not found blog with given id' })
  }
})

module.exports = router