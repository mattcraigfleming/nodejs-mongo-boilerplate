import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import authRoutes from './routes/auth'
import streamRoutes from './routes/streams'

const uri = 'mongodb://test:test123@ds125574.mlab.com:25574/nodejs-boilerplate'

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })

const connection = mongoose.connection

connection.once('open', function () {
  console.log('MongoDB database connection established successfully')
})
const app = express()
const port = 3000

app.use(morgan('dev'))

app.use(bodyParser.json())

app.use('/api/streams', streamRoutes)
app.use('/api/user', authRoutes)

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
)
