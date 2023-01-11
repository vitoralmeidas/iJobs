import { StatusCodes } from 'http-status-codes'

// receive the call of the last middlewere (requests)
const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err)

  const defaultError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong, try again later'
  }

  // missing error
  if (err.name == 'ValidationError') {
    defaultError.statusCode = StatusCodes.BAD_REQUEST
    // defaultError.msg = err.message
    defaultError.msg = Object.values(err.errors)
      .map(item => item.message)
      .join(', ')
  }

  // unique field error
  if (err.code && err.code == 11000) {
    defaultError.statusCode = StatusCodes.BAD_REQUEST
    defaultError.msg = `${Object.keys(err.keyValue)} field has to be unique`
  }

  // generic
  res.status(defaultError.statusCode).json({ msg: defaultError.msg })
}

export default errorHandlerMiddleware
