const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err);
    // receive the call of the last middlewere (requests)
    res.status(500).json({ msg: err })
}


export default errorHandlerMiddleware