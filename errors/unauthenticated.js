import { StatusCodes } from 'http-status-codes'
import CustomAPIError from './custom-api.js'

class Unauthenticated extends CustomAPIError {
  constructor (message) {
    super(message)
    this.statusCode = StatusCodes.UNAUTHORIZED
  }
}

export default Unauthenticated
