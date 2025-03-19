const axios = require('axios');
const { io } = require('socket.io-client');

// Sender Info
const senderId = "67d9663eb157c76f7c6793d8";  // Sender's ID
const receiverId = "67d9667eb157c76f7c6793db";  // Receiver's ID

const serverUrl = "http://localhost:3000";

// Session ID (SID) for Set-Cookie header
const sid1 = 's%3AfBBS5CVqH8Zskcf-PdykWBnwNcu21Fpb.%2FulnF3iKlsAQ6MGBxIrM9iTe1sdjW83gotw2c0iRIQg';
const sid2 = 's%3AGwxORXKWrsDMiMwDoPY1A46EapBF2IBG.i5VaLpN4lJj3NlSBRE06i7yVv6Tq9L4LZCShfKPu%2BlA';

// Create a socket connection for the sender
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
            const response = await axios.post(`${serverUrl}/api/message/${receiverId}`, messageData, {
                headers: {
                    'set-cookie' : 'connect.sid=s%3AfBBS5CVqH8Zskcf-PdykWBnwNcu21Fpb.%2FulnF3iKlsAQ6MGBxIrM9iTe1sdjW83gotw2c0iRIQg'
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
    socketReceiver.on("newMessage", (message) => {
        console.log("Receiver received new message:", message);

        // Simulate reply after receiving the message
        setTimeout(async () => {
            const replyData = {
                text: "Yes, I’m here! How about you?"
            };

            try {
                const response = await axios.post(`${serverUrl}/api/message/${senderId}`, replyData, {
                    headers: {
                        'set-cookie' : 'connect.sid=s%3AGwxORXKWrsDMiMwDoPY1A46EapBF2IBG.i5VaLpN4lJj3NlSBRE06i7yVv6Tq9L4LZCShfKPu%2BlA'  // Set the cookie with SID
                    }
                });

                console.log("Receiver replied:", response.data);
            } catch (error) {
                console.error("Error sending reply:", error.response ? error.response.data : error.message);
            }
        }, 3000); // Respond after 3 seconds
    });
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
