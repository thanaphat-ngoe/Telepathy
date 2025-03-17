const { StatusCodes } = require('http-status-codes');
const Message = require("../models/Message");
const User = require("../models/User");
const Chat = require('../models/Chat');
const { NotFoundError, UnauthenticatedError, ForbiddenError } = require('../errors')
const { getReceiverSocketId, io } = require('../utils/socket');


const getAllMessage = async (req, res) => {
    const { id : userToChat } = req.params;

    const VerifiedUserToChat = await User.findById(userToChat);
    if (!VerifiedUserToChat) {
        throw new NotFoundError(`User with id ${userToChat} does not exist`);
    }
    const myId = req.user.userId;

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

    let chat = await Chat.findOne({
        participants: { $all: [senderId, receiverId]}
    });

    if(!chat){
        chat = new Chat({
            participants: [senderId, receiverId]
        })
        await chat.save();
    }

    const newMessage = new Message({
        chatId: chat._id,
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

const deleteChat = async(req, res) => {
    const { id : chatId } = req.params;
    const userId = req.user.userId;
    const chat = await Chat.findById(chatId);

    if(!chat){
        throw new NotFoundError(`Chat with id ${chatId} does not exist`);
    }

    if(!chat.participants.includes(userId)){
        throw new ForbiddenError('You have no permission to delete this chat');
    }

    await Message.deleteMany({ chatId });
    await chat.deleteOne();

    res.status(StatusCodes.OK).json({messages : `message with chat id ${chatId} deleted successfully`});
    
}

module.exports = {
    getAllMessage,
    sendMessage,
    deleteChat
}