const { StatusCodes } = require('http-status-codes');
const Message = require("../models/Message");
const User = require("../models/User");
const { NotFoundError } = require('../errors')
const { getReceiverSocketId, io } = require('../utils/socket');


const getAllMessage = async (req, res) => {
    const { id : userToChat } = req.params;

    const VerifiedUserToChat = await User.findById(userToChat);
    if (!VerifiedUserToChat) {
        throw new NotFoundError(`User with id ${userToChat} does not exist`);
    }
    const myId = req.user.userId;
    if (!myId) {
        return res.status(401).json({ error: "User is not authenticated" });
    }

    const messages = await Message.find({
        $or: [
            { senderId: myId, receiverId: VerifiedUserToChat._id },
            { senderId: VerifiedUserToChat._id, receiverId: myId }
        ]
    });

    res.status(StatusCodes.OK).json(messages);
};

const sendMessage = async(req, res) => {
    const { text } = req.body;
    const {id : receiverId} = req.params;
    const senderId = req.user.userId;

    const verifiedReceiverId = await User.findById(receiverId);
    
    if(!verifiedReceiverId){
        throw new NotFoundError(`User with id ${receiverId} does not exist`);
    }

    const newMessage = new Message({
        senderId,
        receiverId,
        text
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    console.log(receiverSocketId);
    if(receiverSocketId){
        io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(StatusCodes.CREATED).json(newMessage);
}

module.exports = {
    getAllMessage,
    sendMessage
}