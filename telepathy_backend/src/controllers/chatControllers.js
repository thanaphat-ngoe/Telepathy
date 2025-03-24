import Chat from "../models/chatModels.js";
import User from "../models/userModels.js";

export const createChat = async (req, res) => {
    try {
        const { participantId } = req.body;
        if (!participantId) {
            return res.status(400).json({ message: "User email is required." });
        }

        const existingChat = await Chat.findOne({ participants: { $all: [req.user._id, participantId]} });
        if (existingChat) {
            return res.status(400).json({ message: "You are already created a chat with this user." });
        }

        const newChat = new Chat({ participants: [req.user._id, participantId] });
        await newChat.save();
        res.status(201).json({ message: "Created chat successful!" });
    } catch (error) {
        console.error("Creating chat error!:", error);
        res.status(500).json({ message: "An error occurred while creating your chat." });
    }
};

export const getChat = async (req, res) => {
    try {
        const myId = req.user._id.toString();
        const chats = await Chat.find({ participants: myId });

        let userIds = [];
        chats.forEach(chat => {
            chat.participants.forEach(id => {
                if (id.toString() !== myId && !userIds.includes(id.toString())) {
                    userIds.push(id.toString());
                }
            });
        });

        const users = await User.find({ _id: { $in: userIds } }, "firstname lastname");

        const userMap = Object.fromEntries(users.map(user => [user._id.toString(), user]));

        const chatsWithUsers = chats.map(chat => {
            const otherUserId = chat.participants.find(id => id.toString() !== myId);
            const otherUser = otherUserId ? userMap[otherUserId.toString()] : null;
            return {
                _id: chat._id,
                participants: otherUser,
                createdAt: chat.createdAt,
                updatedAt: chat.updatedAt
            };
        });

        res.status(200).json(chatsWithUsers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteChat = async (req, res) => {

};