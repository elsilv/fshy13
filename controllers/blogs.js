const router = require('express').Router()

const { Blog } = require('../models')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.post('/', async (req, res) => {
  try {
    const blog = await Blog.create(req.body)
    return res.json(blog)
  } catch(error) {
    return res.status(400).json({ error: 'Something gone wrong' })
  }
})

router.delete('/:id', async (req, res) => {
  console.log(req.params.id)
  var id = req.params.id
  const blog = await Blog.findByPk(id)
  
  if(blog !== null ) {
    await blog.destroy()
  } else {
    res.status(404).end()
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