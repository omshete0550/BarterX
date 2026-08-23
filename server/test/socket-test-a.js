const { io } = require("socket.io-client");

const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTg5YTZmNTgwNWE2MGVjNWU0MDJkNTIiLCJpYXQiOjE3ODc1MDQ3NDEsImV4cCI6MTc4ODEwOTU0MX0.vS-wNw-pyWbMlMx693OvOCguDA3g7T_KfK7gR8Wvxjc";

const socket = io("http://localhost:5000", {
    auth: {
        token: TOKEN,
    },
});

socket.on("connect", () => {
    console.log("Connected!");
    console.log("Socket ID:", socket.id);

    socket.emit("join_conversation", "6a8b2bb4b809425f7cea6d97");
});

socket.on("conversation_joined", (data) => {
    console.log("Conversation joined:", data.conversationId);
});

socket.on("connect_error", (error) => {
    console.log("Connection error:", error.message);
});

socket.on("online_users", (data) => {
    console.log("Online users:", data.users);
});

socket.on("user_online", (data) => {
    console.log("User online:", data.userId);
});

socket.on("user_offline", (data) => {
    console.log("User offline:", data.userId);
});

socket.on("receive_message", (data) => {
    console.log("MESSAGE RECEIVED:", data.message);
});

socket.on("new_message", (data) => {
    console.log("NEW MESSAGE:", data.message);
});

socket.on("user_typing", (data) => {
    console.log("USER TYPING:", data.user);
});

socket.on("user_stopped_typing", (data) => {
    console.log("USER STOPPED TYPING:", data.userId);
});

socket.on("message_read", (data) => {
    console.log("MESSAGE READ:", data);
});

socket.on("socket_error", (data) => {
    console.log("Socket error:", data.message);
});
