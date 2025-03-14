const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { UnauthenticatedError, BadRequestError} = require('../errors');

const register = async(req, res) => {
    const user = await User.create({...req.body}); 
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ user : {name : user.username}, token});
}

const login = async(req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        throw new BadRequestError("Please provide email and password");
    }
    const user = await User.findOne({email : email.toLowerCase()});
    if(!user){
        throw new UnauthenticatedError("Invalid credentials");
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect){
        throw new UnauthenticatedError("Invalid credentials");
    }
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user : {name : user.username}, token});
}

module.exports = {
    register,
    login
}