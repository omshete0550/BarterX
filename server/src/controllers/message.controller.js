const mongoose = require("mongoose");

const Message = require("../models/Message");
const Conversation = require("../models/Conversation");
const User = require("../models/User");

// Send message
const sendMessage = async (req, res, next) => {
    try {
        const senderId = req.user.userId;

        const { receiver, text, conversationId } = req.body;

        // Validate receiver ID
        if (!mongoose.Types.ObjectId.isValid(receiver)) {
            const error = new Error("Invalid receiver ID.");

            error.statusCode = 400;
            return next(error);
        }

        // Cannot message yourself
        if (senderId.toString() === receiver.toString()) {
            const error = new Error("You cannot send a message to yourself.");

            error.statusCode = 400;
            return next(error);
        }

        // Check receiver exists
        const receiverUser = await User.findById(receiver);

        if (!receiverUser) {
            const error = new Error("Receiver not found.");

            error.statusCode = 404;
            return next(error);
        }

        let conversation;
        if (conversationId) {
            conversation = await Conversation.findOne({
                _id: conversationId,
                participants: senderId,
            });
            if (!conversation) {
                const error = new Error("Conversation not found.");
                error.statusCode = 404;
                return next(error);
            }
            const receiverIsParticipant = conversation.participants.some(
                (participant) => participant.toString() === receiver.toString(),
            );
            if (!receiverIsParticipant) {
                const error = new Error("Receiver is not part of this conversation.");
                error.statusCode = 403;
                return next(error);
            }
        } else {
            // General conversations intentionally exclude barter-linked threads.
            conversation = await Conversation.findOne({
                participants: {
                    $all: [senderId, receiver],
                },
                barterRequest: null,
            });
        }

        // Create conversation if it doesn't exist
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiver],
            });
        }

        // Create message
        const message = await Message.create({
            conversation: conversation._id,
            sender: senderId,
            receiver,
            text,
        });

        // Update last message
        conversation.lastMessage = message._id;

        await conversation.save();

        // Populate message
        const populatedMessage = await Message.findById(message._id)
            .populate("sender", "name avatar")
            .populate("receiver", "name avatar");

        const io = req.app.get("io");
        io?.to(`conversation:${conversation._id}`).emit("receive_message", {
            message: populatedMessage,
        });
        io?.to(`user:${receiver}`).emit("new_message", {
            message: populatedMessage,
        });

        return res.status(201).json({
            success: true,
            message: "Message sent successfully.",
            data: {
                message: populatedMessage,
            },
        });
    } catch (error) {
        next(error);
    }
};

// Get messages
const getMessages = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { conversationId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(conversationId)) {
            const error = new Error("Invalid conversation ID.");

            error.statusCode = 400;
            return next(error);
        }

        // Check user belongs to conversation
        const conversation = await Conversation.findOne({
            _id: conversationId,
            participants: userId,
        });

        if (!conversation) {
            const error = new Error("Conversation not found.");

            error.statusCode = 404;
            return next(error);
        }

        const messages = await Message.find({
            conversation: conversationId,
        })
            .populate("sender", "name avatar")
            .populate("receiver", "name avatar")
            .sort({ createdAt: 1 });

        // Mark received messages as read
        await Message.updateMany(
            {
                conversation: conversationId,
                receiver: userId,
                isRead: false,
            },
            {
                $set: {
                    isRead: true,
                },
            },
        );

        return res.status(200).json({
            success: true,
            data: {
                messages,
            },
        });
    } catch (error) {
        next(error);
    }
};

// Mark one message as read
const markMessageAsRead = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { messageId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(messageId)) {
            const error = new Error("Invalid message ID.");

            error.statusCode = 400;
            return next(error);
        }

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
            const error = new Error("Message not found.");

            error.statusCode = 404;
            return next(error);
        }

        return res.status(200).json({
            success: true,
            message: "Message marked as read.",
            data: {
                message,
            },
        });
    } catch (error) {
        next(error);
    }
};

// Mark all messages in conversation as read
const markConversationAsRead = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { conversationId } = req.params;

        const conversation = await Conversation.findOne({
            _id: conversationId,
            participants: userId,
        });

        if (!conversation) {
            const error = new Error("Conversation not found.");

            error.statusCode = 404;
            return next(error);
        }

        await Message.updateMany(
            {
                conversation: conversationId,
                receiver: userId,
                isRead: false,
            },
            {
                $set: {
                    isRead: true,
                },
            },
        );

        return res.status(200).json({
            success: true,
            message: "Conversation messages marked as read.",
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    sendMessage,
    getMessages,
    markMessageAsRead,
    markConversationAsRead,
};
