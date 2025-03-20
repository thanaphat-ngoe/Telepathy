import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
        required: [true, "No sender id provided"]
    },
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

const Message = mongoose.model("Message", messageSchema);

export default Message;