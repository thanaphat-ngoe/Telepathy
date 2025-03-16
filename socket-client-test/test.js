const axios = require('axios');
const { io } = require('socket.io-client');

// Sender Info
const senderId = "67d541746d69f6fc9d713077";  // Sender's ID
const receiverId = "67d3f05ff34d48596d4a0e13";  // Receiver's ID

const serverUrl = "http://localhost:5000";

// JWT Tokens
const senderJwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2Q1NDE3NDZkNjlmNmZjOWQ3MTMwNzciLCJuYW1lIjoiUGFydW5jaGFpMiIsImlhdCI6MTc0MjExNDgyNCwiZXhwIjoxNzQ0NzA2ODI0fQ.n0_Ji0-9dRk2g9y0llVDpVpdLfEo1ZMQFRbKUdgnZMY";
const receiverJwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2QzZjA1ZmYzNGQ0ODU5NmQ0YTBlMTMiLCJuYW1lIjoiVGhhbmFwaGF0IiwiaWF0IjoxNzQyMTE4MDA1LCJleHAiOjE3NDQ3MTAwMDV9.I1iRVHeZwmVtiZfCOmxGJFJs107OMDhYH-H1o4QEZOk";

// Sender connects to the server
const socketSender = io(serverUrl, {
    query: { userId: senderId }
});

socketSender.on("connect", () => {
    console.log("Sender connected to server with socket id:", socketSender.id);

    socketSender.on("getOnlineUsers", (onlineUsers) => {
        console.log("Online users:", onlineUsers);
    });

    // Send a message after 3 seconds (Sender to Receiver)
    setTimeout(async () => {
        const messageData = {
            text: "Hello, are you there?"
        };

        try {
            const response = await axios.post(`${serverUrl}/message/${receiverId}`, messageData, {
                headers: {
                    Cookie: `jwt=${senderJwtToken}`
                }
            });

            console.log("Sender sent message:", response.data);
        } catch (error) {
            console.error("Error sending message:", error.response ? error.response.data : error.message);
        }
    }, 3000);  // Send message after 3 seconds
});

// Receiver connects to the server
const socketReceiver = io(serverUrl, {
    query: { userId: receiverId }
});

socketReceiver.on("connect", () => {
    console.log("Receiver connected to server with socket id:", socketReceiver.id);

    socketReceiver.on("getOnlineUsers", (onlineUsers) => {
        console.log("Online users:", onlineUsers);
    });

    // Listen for incoming messages from Sender
    socketReceiver.on("newMessage", async (message) => {
        console.log("Receiver received new message:", message);

        // Simulate reply after receiving the message
        setTimeout(async () => {
            const replyData = {
                text: "Yes, I’m here! How about you?"
            };

            try {
                const response = await axios.post(`${serverUrl}/message/${senderId}`, replyData, {
                    headers: {
                        Cookie: `jwt=${receiverJwtToken}`  // Use the receiver's JWT token
                    }
                });

                console.log("Receiver replied:", response.data);
            } catch (error) {
                console.error("Error sending reply:", error.response ? error.response.data : error.message);
            }
        }, 3000); // Respond after 3 seconds
    });
});

// Listen for incoming messages on sender's side (optional, to confirm reply)
socketSender.on("newMessage", (message) => {
    console.log("Sender received new message:", message);
});

// Disconnect both after 20 seconds
setTimeout(() => {
    console.log("Disconnecting both...");
    socketSender.disconnect();
    socketReceiver.disconnect();
}, 20000);

socketSender.on("disconnect", () => {
    console.log("Sender disconnected from server");
});

socketReceiver.on("disconnect", () => {
    console.log("Receiver disconnected from server");
});
