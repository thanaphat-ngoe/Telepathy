import { StatusCodes } from "http-status-codes";
import Message from "../models/messageModels.js";
import User from "../models/userModels.js";
import Chat from "../models/chatModels.js";
import NotFoundError from "../errors/not-found.js";
import ForbiddenError from "../errors/forbidden.js";
import UnauthenticatedError from "../errors/unauthenticated.js";
import { io, getReceiverSocketId } from "../utils/socket.js";


export const getAllMessage = async (req, res) => {
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

export const sendMessage = async(req, res) => {
    const { text } = req.body;
    const {id : receiverId} = req.params;
    const senderId = req.user._id;
    const verifiedReceiverId = await User.findById(receiverId);
    console.log(verifiedReceiverId)
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

export const deleteChat = async(req, res) => {
    const { id : targetUserId } = req.params;
    const userId = req.user._id;
    console.log(userId);
    console.log(targetUserId);
    const chat = await Chat.findOne({
        participants: { $all: [userId, targetUserId] }
    })

    if(!chat){
        throw new NotFoundError(`Chat does not exist`);
    }

    if(!chat.participants.includes(userId)){
        throw new ForbiddenError('You have no permission to delete this chat');
    }

    await Message.deleteMany({ chatId : chat._id });
    await chat.deleteOne();

    res.status(StatusCodes.OK).json({messages : `chat deleted successfully`});
    
}

