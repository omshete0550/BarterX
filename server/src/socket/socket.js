const jwt = require("jsonwebtoken");

const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const User = require("../models/User");

const onlineUsers = new Map();

const initializeSocket = (io) => {
    // Socket authentication
    io.use(async (socket, next) => {
        try {
            const token =
                socket.handshake.auth?.token ||
                socket.handshake.headers?.authorization?.replace("Bearer ", "");

            if (!token) {
                return next(new Error("Authentication token is required."));
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const user = await User.findById(decoded.userId);

            if (!user) {
                return next(new Error("User not found."));
            }

            socket.user = {
                userId: user._id.toString(),
                name: user.name,
                avatar: user.avatar,
            };

            next();
        } catch (error) {
            next(new Error("Invalid or expired token."));
        }
    });

    io.on("connection", (socket) => {
        const userId = socket.user.userId;

        console.log(`User connected: ${socket.user.name} (${userId})`);

        // -----------------------------------------
        // ONLINE USER
        // -----------------------------------------

        if (!onlineUsers.has(userId)) {
            onlineUsers.set(userId, new Set());
        }

        onlineUsers.get(userId).add(socket.id);

        socket.join(`user:${userId}`);

        io.emit("user_online", {
            userId,
        });

        // -----------------------------------------
        // GET ONLINE USERS
        // -----------------------------------------

        socket.emit("online_users", {
            users: Array.from(onlineUsers.keys()),
        });

        // -----------------------------------------
        // JOIN CONVERSATION
        // -----------------------------------------

        socket.on("join_conversation", async (conversationId) => {
            try {
                const conversation = await Conversation.findOne({
                    _id: conversationId,
                    participants: userId,
                });

                if (!conversation) {
                    return socket.emit("socket_error", {
                        message: "Conversation not found.",
                    });
                }

                socket.join(`conversation:${conversationId}`);

                socket.emit("conversation_joined", {
                    conversationId,
                });

                console.log(
                    `${socket.user.name} joined conversation ${conversationId}`,
                );
            } catch (error) {
                socket.emit("socket_error", {
                    message: "Unable to join conversation.",
                });
            }
        });

        // -----------------------------------------
        // SEND MESSAGE
        // -----------------------------------------

        socket.on("send_message", async (data) => {
            try {
                const { conversationId, receiver, text } = data;

                if (!conversationId || !receiver || !text?.trim()) {
                    return socket.emit("socket_error", {
                        message: "Conversation, receiver and message text are required.",
                    });
                }

                // Verify conversation
                const conversation = await Conversation.findOne({
                    _id: conversationId,
                    participants: userId,
                });

                if (!conversation) {
                    return socket.emit("socket_error", {
                        message: "Conversation not found.",
                    });
                }

                // Verify receiver belongs to conversation
                const receiverExists = conversation.participants.some(
                    (participant) => participant.toString() === receiver.toString(),
                );

                if (!receiverExists) {
                    return socket.emit("socket_error", {
                        message: "Receiver is not part of this conversation.",
                    });
                }

                // Cannot send to yourself
                if (userId.toString() === receiver.toString()) {
                    return socket.emit("socket_error", {
                        message: "You cannot send a message to yourself.",
                    });
                }

                // Verify receiver exists
                const receiverUser = await User.findById(receiver);

                if (!receiverUser) {
                    return socket.emit("socket_error", {
                        message: "Receiver not found.",
                    });
                }

                // Create message
                const message = await Message.create({
                    conversation: conversationId,
                    sender: userId,
                    receiver,
                    text: text.trim(),
                });

                // Update last message
                conversation.lastMessage = message._id;

                await conversation.save();

                // Populate message
                const populatedMessage = await Message.findById(message._id)
                    .populate("sender", "name avatar")
                    .populate("receiver", "name avatar");

                // Send to everyone in conversation
                io.to(`conversation:${conversationId}`).emit("receive_message", {
                    message: populatedMessage,
                });

                // Also notify receiver if
                // they haven't joined the room
                io.to(`user:${receiver}`).emit("new_message", {
                    message: populatedMessage,
                });
            } catch (error) {
                console.error("Socket message error:", error);

                socket.emit("socket_error", {
                    message: "Failed to send message.",
                });
            }
        });

        // -----------------------------------------
        // TYPING
        // -----------------------------------------

        socket.on("typing", async ({ conversationId }) => {
            try {
                const conversation = await Conversation.findOne({
                    _id: conversationId,
                    participants: userId,
                });

                if (!conversation) return;

                socket.to(`conversation:${conversationId}`).emit("user_typing", {
                    conversationId,
                    userId,
                    user: {
                        name: socket.user.name,
                        avatar: socket.user.avatar,
                    },
                });
            } catch (error) {
                console.error("Typing error:", error);
            }
        });

        // -----------------------------------------
        // STOP TYPING
        // -----------------------------------------

        socket.on("stop_typing", ({ conversationId }) => {
            socket.to(`conversation:${conversationId}`).emit("user_stopped_typing", {
                conversationId,
                userId,
            });
        });

        // -----------------------------------------
        // MARK MESSAGE AS READ
        // -----------------------------------------

        socket.on("mark_read", async ({ messageId, conversationId }) => {
            try {
                const message = await Message.findOneAndUpdate(
                    {
                        _id: messageId,
                        receiver: userId,
                    },
                    {
                        $set: {
                            isRead: true,
                        },
                    },
                    {
                        new: true,
                    },
                );

                if (!message) {
                    return;
                }

                io.to(`conversation:${conversationId}`).emit("message_read", {
                    messageId,
                    readBy: userId,
                });
            } catch (error) {
                console.error("Read message error:", error);
            }
        });

        // -----------------------------------------
        // DISCONNECT
        // -----------------------------------------

        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.user.name}`);

            const userSockets = onlineUsers.get(userId);

            if (userSockets) {
                userSockets.delete(socket.id);

                // User has no more connections
                if (userSockets.size === 0) {
                    onlineUsers.delete(userId);

                    io.emit("user_offline", {
                        userId,
                    });
                }
            }
        });
    });
};

module.exports = initializeSocket;
