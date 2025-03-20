import { StatusCodes } from 'http-status-codes';

export const errorHandlingMiddleware = (err, req, res, next) => {
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Something went wrong, try again later."
    };
    
    if (err.name === 'ValidationError') {
        customError.msg = Object.values(err.errors).map((item) => item.message);
        customError.statusCode = 400;
    }
    
    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value.`;
        customError.statusCode = 400;
    }
   
    if (err.name === 'CastError') {
        customError.msg = `Invalid ID format: ${err.value}`;
        customError.statusCode = 400;
    }
    
    console.error(`Error: ${customError.msg}`);
    console.error(`Stack Trace: ${err.stack}`);
    return res.status(customError.statusCode).json({ msg: customError.msg });
};
