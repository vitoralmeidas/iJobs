import 'express-async-errors'
import express from 'express'
const app = express()
import 'colors'
import dotenv from 'dotenv'
dotenv.config()

import morgan from 'morgan'

// db and authenticateUser
import connectDB from './db/connect.js'

// routers
import authRouter from './routes/authRoutes.js'
import jobRouter from './routes/jobsRoutes.js'

// middleware
import errorHandlerMiddleware from './middleware/error-handler.js'
import notFoundMiddleware from './middleware/not-found.js'

if (process.env.NODE_NEV !== 'production') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.get('/', (req, res) => {
  // the error handler middleware will get this error
  // throw new Error('error')
  res.json({ msg: 'HI THERE' })
})

app.get('/api/v1', (req, res) => {
  // the error handler middleware will get this error
  // throw new Error('error')
  res.json({ msg: 'API' })
})

// auth route
app.use('/api/v1/auth', authRouter)

// jobs route
app.use('/api/v1/jobs', jobRouter)

// looking for requests errors
app.use(notFoundMiddleware)

// looking for general errors
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`.blue.bold)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
