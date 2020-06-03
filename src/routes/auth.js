import { Router } from 'express'
import * as yup from 'yup'
import User from '../models/User'

const schema = yup.object().shape({
  email: yup.string().min(3).max(255),
  password: yup.string().min(3).max(255),
  username: yup.string().min(3).max(255),
  admin: yup.bool(),
  location: yup.string().min(3).max(255),
})

const router = Router()
router.get('/', (req, res) => {
  res.json({
    message: 'works',
  })
})

router.post('/register', async (req, res) => {
  try {
    await schema.validate(req.body, { abortEarly: false })
  } catch (err) {
    res.status(400).json(err)
  }

  const emailExists = await User.findOne({ email: req.body.email })

  if (emailExists) {
    res.status(400).json({ message: 'email already exists' })
  }

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
