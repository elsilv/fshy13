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
    return res.status(400).json({ error })
  }
})

router.delete('/:id', async (req, res) => {
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

module.exports = router