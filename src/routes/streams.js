import express, { Router } from 'express'

const router = Router()

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'handling streams GET/ request',
  })
})

router.post('/', (req, res, next) => {
  res.status(200).json({
    message: 'handling streams POST/ request',
  })
})

export default router
