import express from 'express'
const app = express()

// middleware
import errorHandlerMiddleware from './middleware/error-handler.js'
import notFoundMiddleware from './middleware/not-found.js'

app.get("/", (req, res) => {
    // the error handler middleware will get this error 
    throw new Error('error')
    res.send("Let'sss go")
})

// looking for requests
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`)
})