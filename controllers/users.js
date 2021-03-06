const bcrypt = require('bcrypt')
const router = require('express').Router()
const { User, Blog } = require('../models')

router.get('/', async (request, response) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId']}
    }
  })
  response.json(users)
})

router.post('/', async (request, response) => {
  try {
    const user = await User.create(request.body)
    response.json(user)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

router.delete('/:id', async (req, res) => {
  console.log(req.params.id)
  var id = req.params.id
  const user = await User.findByPk(id)
  
  if(user !== null ) {
    await user.destroy()
  } else {
    res.status(404).end()
  }
})

router.put('/:username', async (req, res) => {
  const user = await User.findOne({ where: { username: req.params.username } })
  if (user) {
    user.username = req.body.username
    console.log(req.body.username)
    await user.save()
      res.json(user)
  } else {
    res.status(404).send({ error: 'not found user with given username' })
  }
})

module.exports = router