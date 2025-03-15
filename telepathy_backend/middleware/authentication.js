const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const auth = (req, res, next) => {
    
    const token = req.cookies.jwt;
    if(!token){
        throw new UnauthenticatedError("No token provided");
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {userId : decoded.userId, name : decoded.name};
        next();
    }
    catch(error){
        throw new UnauthenticatedError('Not authorized to access this route.');
    }
}

module.exports = auth;