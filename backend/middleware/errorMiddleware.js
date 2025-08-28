const endPointNotFound = (req, res, next) => {
    const error = new Error(`API Endpoint ${req.originalUrl} Not Found`);
    res.status(404);
    next(error);
};

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500: res.statusCode;
    let message = err.message;

    res.status(statusCode).json({
        success: false,
        message
    });
};

export {
    endPointNotFound,
    errorHandler
}
