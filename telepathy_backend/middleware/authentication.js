const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const auth = (req, res, next) => {
    const authheader = req.headers.authorization;
    if(!authheader || !authheader.startsWith('Bearer')) {
        throw new UnauthenticatedError('No token provided');
    }
    const token = authheader.split(' ')[1];
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