import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
const app = express()

import connectDB from './db/connect.js'

import errorHandlerMiddleware from './middleware/error-handler.js'
import notFoundMiddleware from './middleware/not-found.js'

app.get("/", (req, res) => {
    // the error handler middleware will get this error 
    // throw new Error('error')

    res.send("Let'sss go")
})

// looking for requests
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