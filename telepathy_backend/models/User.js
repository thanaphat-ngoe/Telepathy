const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type : String,
        required : [true, "Please provide username"],
        minLength : 3,
        maxLength : 50
    },
    email: {
        type : String,
        required : [true, "Please provide email"],
        match : [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide valid email"
        ],
        unique : true
    },
    password : {
        type : String,
        required : [true, "Please provide password"],
        minLength : 6
    }
})

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.email = this.email.toLowerCase();
    next();
})

userSchema.methods.createJWT = function(){
    return jwt.sign({userId : this._id, name : this.username}, process.env.JWT_SECRET, {expiresIn : process.env.JWT_LIFETIME});
}

userSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}

module.exports = mongoose.model('User', userSchema);