import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import rateLimit from 'express-rate-limit'
import morgan from 'morgan'
import apiRoutes from './routes/api'

const uri = 'mongodb://test:test123@ds125574.mlab.com:25574/nodejs-boilerplate'
mongoose.set('useCreateIndex', true)

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })

const connection = mongoose.connection

connection.once('open', () =>
  console.log('MongoDB database connection established successfully')
)
const app = express()
const port = 3000

app.use(morgan('dev'))

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
})

app.use(limiter)

app.use(bodyParser.json())

app.use('/api/', apiRoutes)

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
)
