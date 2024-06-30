export const GlobalErrorMiddleware = (err, req, res, next) => {
    err.message || (err.message = "Bad!");
    err.statusCode || (err.statusCode = 500);
    if (err.name === "CastError")
        err.message = "Invalid ID!";
    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};
export const AsyncErrorHandler = (func) => (req, res, next) => {
    return Promise.resolve(func(req, res, next)).catch(next);
};
