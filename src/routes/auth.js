import bcrypt from 'bcryptjs'
import { Router } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import { registrationSchema, loginSchema } from '../validation/validationSchema'

const router = Router()

router.post('/login', async (req, res) => {
  try {
    await loginSchema.validate(req.body, { abortEarly: false })
  } catch (err) {
    res.status(400).json(err)
  }
  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).json({ message: 'Invalid Credentials' })
  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword)
    return res.status(400).json({
      message: 'Invalid credentials',
    })
  const token = jwt.sign({ id: user._id }, 'tokenSecret', {
    expiresIn: '48h',
  })
  res.header('auth-token', token).send(token)
})

router.post('/register', async (req, res) => {
  try {
    await registrationSchema.validate(req.body, { abortEarly: false })
  } catch (err) {
    res.status(400).json(err)
  }
  const emailExists = await User.findOne({ email: req.body.email })
  if (emailExists) {
    res.status(400).json({ message: 'email already exists' })
  }
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)
  const newUser = new User({
    email: req.body.email,
    password: hashedPassword,
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

export default router
