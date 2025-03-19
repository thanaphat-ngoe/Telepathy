import express from 'express';
import { Server } from 'socket.io';
import http from 'http';

export const app = express();
export const server = http.createServer(app);

export const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3001"], 
        credentials: true
    }
});

// Store online users
const userSocketMap = {};

export function getReceiverSocketId(userId) {
    return userSocketMap[userId]; 
}

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    
    // Retrieve the userId from the handshake query parameter
    const userId = socket.handshake.query.userId;
    
    if (!userId) {
        console.error("No userId provided in the connection request.");
        socket.disconnect(); // Disconnect the socket if userId is missing
        return;
    }

    console.log("User ID on connection:", userId);

    // Store the socket ID for the connected user
    userSocketMap[userId] = socket.id;

    // Emit updated online users list to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // Handle disconnection
    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

