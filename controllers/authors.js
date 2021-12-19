const router = require('express').Router()
const { Op } = require('sequelize')

const { Blog } = require('../models')
const { sequelize } = require('../models/blog')

router.get('/', async (req, res) => {

  const blogs = await Blog.findAll({ 
    group: ['author'],
    attributes: [
        'author', 
        [sequelize.fn('COUNT', sequelize.col('author')), 'blogs'],
        [sequelize.fn('SUM', sequelize.col('likes')), 'likes']
      ]
  })
  res.json(blogs)
})

module.exports = router