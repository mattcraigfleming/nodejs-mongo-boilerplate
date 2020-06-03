import { Router } from 'express'
import User from '../models/User'

const router = Router()
router.get('/', (req, res) => {
  res.json({
    message: 'works',
  })
})

router.post('/register', async (req, res) => {
  console.log(req.body)
  const newUser = new User({
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
    admin: req.body.admin,
    location: req.body.location,
    meta: {
      age: 30,
      website: 'mcraigmedia.com',
    },
  })
  try {
    const user = await newUser.save()
    res.json(user)
  } catch (err) {
    res.status(400).json(err)
  }
})

router.post('/login', (req, res) => {})

export default router
