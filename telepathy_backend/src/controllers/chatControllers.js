import Chat from "../models/chatModels.js";

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
        const result = await newChat.save();
        console.log(result);
        res.status(201).json({ message: "Created chat successful!" });
    } catch (error) {
        console.error("Creating chat error!:", error);
        res.status(500).json({ message: "An error occurred while creating your chat." });
    }
};

export const getChat = async (req, res) => {
    try {
        const existingChat = await Chat.find({ participants: { $in: req.user._id }  });
        if (!existingChat) {
            return res.status(400).json({ message: "You haven't created chat yet." });
        }
        res.status(201).send(existingChat);
    } catch (error) {
        console.error("Creating chat error!:", error);
        res.status(500).json({ message: "An error occurred while getting your chats." });
    }
};

export const deleteChat = async (req, res) => {

};