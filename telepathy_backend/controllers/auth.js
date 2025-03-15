const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { UnauthenticatedError, BadRequestError} = require('../errors');
const cookieLifetimeDays = parseInt(process.env.COOKIE_LIFETIME_DAYS);
const maxAge = cookieLifetimeDays * 24 * 60 * 60 * 1000;


const register = async(req, res) => {
    const user = await User.create({...req.body}); 
    //const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ user : {name : user.username}});
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
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'Strict',
        maxAge: maxAge
    });
    res.status(StatusCodes.OK).json({ user : {name : user.username, id: user._id}});
}

const logout = async(req, res) => {
    res.cookie("jwt", "", {maxAge : 0});
    res.status(StatusCodes.OK).json({msg : "Logged out successfully"});
}

module.exports = {
    register,
    login,
    logout
}