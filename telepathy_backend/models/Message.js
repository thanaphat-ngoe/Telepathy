const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "No sender id provided"]
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "No receiver id provided"]
    },
    text: {
        type: String
    }
}, {timestamps: true})

module.exports = mongoose.model("Message", messageSchema);