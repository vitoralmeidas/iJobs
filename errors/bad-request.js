import CustomAPIError from "./custom-api.js";
import StatusCode from 'http-status-codes'

class BadRequestError extends CustomAPIError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCode.BAD_REQUEST
    }
}

export default BadRequestError