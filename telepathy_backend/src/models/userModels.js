import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    lastname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024,
    },
    isVerified: {
        type: Boolean,
        require: true,
        default: false
    },
    isMfaActive: {
        type: Boolean,
        required: true,
        default: false
        
    },
    twoFactorSecret: {
        type: String
    },
    // expiresAt: {  
    //     type: Date,
    //     default: new Date(Date.now() + 60 * 60 * 1000),  // 60 minutes from creation
    //     index: { expires: 0 } // TTL Index: Document will auto-delete
    // }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;