import { Router } from 'express'
import Stream from '../models/Stream'

const router = Router()

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'handling streams GET/ request',
  })
})

router.post('/', async (req, res, next) => {
  // create a stream
  console.log(req.body)
  const newStream = new Stream({
    description: req.body.description,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
  })
  try {
    const data = await newStream.save()
    return data
  } catch (e) {
    console.log(e)
  }
  return res.json(data)
})

router.get('/:streamId', (req, res, next) => {
  const id = req.params.streamId
  res.status(200).json({
    message: 'handling streams GET/ request',
  })
})

router.patch('/:streamId', (req, res, next) => {
  const id = req.params.streamId
  res.status(200).json({
    message: 'handling streams GET/ request',
  })
})

router.delete('/:streamId', (req, res, next) => {
  const id = req.params.streamId
  res.status(200).json({
    message: 'handling streams GET/ request',
  })
})

export default router
