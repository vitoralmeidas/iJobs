import 'express-async-errors'
import express from 'express'
const app = express()
import 'colors'
import morgan from 'morgan'
import dotenv from 'dotenv'
dotenv.config()

// db and authenticateUser
import connectDB from './db/connect.js'

// routers
import authRouter from './routes/authRoutes.js'
import jobRouter from './routes/jobsRoutes.js'

// middleware
import errorHandlerMiddleware from './middleware/error-handler.js'
import notFoundMiddleware from './middleware/not-found.js'
import authenticateUser from './middleware/auth.js'

import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

// security
import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'

import cookieParser from 'cookie-parser'

/////////////////////////////////////////////////////////////////////

if (process.env.NODE_NEV !== 'production') {
  app.use(morgan('dev'))
}

const __dirname = dirname(fileURLToPath(import.meta.url))
// deploy
app.use(express.static(path.resolve(__dirname, './client/build')))

// body json
app.use(express.json())
app.use(cookieParser())
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobRouter)

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})

const port = process.env.PORT || 5000

// looking for requests errors
app.use(notFoundMiddleware)

// looking for general errors
app.use(errorHandlerMiddleware)

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
