import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()

// db and authenticateUser
import connectDB from './db/connect.js'

// routers
import authRouter from './routes/authRoutes.js'

// middleware
import errorHandlerMiddleware from './middleware/error-handler.js'
import notFoundMiddleware from './middleware/not-found.js'

app.use(express.json())

app.get("/", (req, res) => {
    // the error handler middleware will get this error 
    // throw new Error('error')
    res.send("Let'sss go")
})

// auth route
app.use('/api/v1/auth', authRouter)

// looking for requests errors
app.use(notFoundMiddleware)

// looking for general errors
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()