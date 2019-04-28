import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import logger from 'morgan'
import cookieParser from 'cookie-parser'

import user from './route/user'
import task from './route/task'
import classes from './route/classes'

const app = express()

app.use('/public', express.static('public'))

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(logger('dev'))
app.use(cookieParser())

app.use('/user', user)
app.use('/task', task)
app.use('/classes', classes)

dotenv.config()
mongoose
  .connect(process.env.MONGODB_URL, { useNewUrlParser: true })
  .then(() => console.log('> database connect'))

app.get('/*', (req, res) => {
  res.status(200).json({ msg: 'hznu-tes api' })
})

app.listen(4000, () => console.log('> Running on localhost:4000'))
