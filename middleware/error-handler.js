import { StatusCodes } from "http-status-codes";

// receive the call of the last middlewere (requests)
const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err);

    const defaultError = {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        msg: "Something went wrong, try again later",
    }

    // missing error
    if (err.name == "ValidationError") {
        defaultError.statusCode = StatusCodes.BAD_REQUEST
        // defaultError.msg = err.message
        defaultError.msg = Object.values(err.errors).map((item) => item.message).join(", ")
    }

    // unique field error
    if (err.code && err.code == 11000) {
        defaultError.statusCode = StatusCodes.BAD_REQUEST
        defaultError.msg = `${Object.keys(err.keyValue)} field has to be unique`
    }

    // generic 
    res.status(defaultError.statusCode).json({ msg: err })

    // res.status(defaultError.statusCode).json({ msg: defaultError.msg })
}


export default errorHandlerMiddleware


/*
---- Missing Error ----
{
    "msg": {
        "errors": {
            "password": {
                "name": "ValidatorError",
                "message": "Please provide password",
                "properties": {
                    "message": "Please provide password",
                    "type": "required",
                    "path": "password"
                },
                "kind": "required",
                "path": "password"
            },
            "email": {
                "name": "ValidatorError",
                "message": "Please provide email",
                "properties": {
                    "message": "Please provide email",
                    "type": "required",
                    "path": "email"
                },
                "kind": "required",
                "path": "email"
            }
        },
        "_message": "User validation failed",
        "name": "ValidationError",
        "message": "User validation failed: password: Please provide password, email: Please provide email"
    }
}

---- Unique Error ----
{
    "msg": {
        "index": 0,
        "code": 11000,
        "keyPattern": {
            "email": 1
        },
        "keyValue": {
            "email": "vitor@vitor.com"
        }
    }
}

*/