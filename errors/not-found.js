import CustomAPIError from "./custom-api.js";
import StatusCode from 'http-status-codes'

class NotFoundError extends CustomAPIError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCode.NOT_FOUND
    }
}

export default NotFoundError