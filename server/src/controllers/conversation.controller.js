const mongoose = require("mongoose");

const Conversation = require("../models/Conversation");
const User = require("../models/User");
const Message = require("../models/Message");

// Create or get conversation
const createConversation = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { participantId } = req.body;

        if (!mongoose.Types.ObjectId.isValid(participantId)) {
            const error = new Error("Invalid participant ID.");
            error.statusCode = 400;
            return next(error);
        }

        if (userId.toString() === participantId.toString()) {
            const error = new Error(
                "You cannot create a conversation with yourself.",
            );

            error.statusCode = 400;
            return next(error);
        }

        const participant = await User.findById(participantId);

        if (!participant) {
            const error = new Error("User not found.");
            error.statusCode = 404;
            return next(error);
        }

        // Check if conversation already exists
        let conversation = await Conversation.findOne({
            participants: {
                $all: [userId, participantId],
            },
        })
            .populate("participants", "name email avatar location")
            .populate("lastMessage");

        if (conversation) {
            return res.status(200).json({
                success: true,
                message: "Conversation already exists.",
                data: {
                    conversation,
                },
            });
        }

        // Create new conversation
        conversation = await Conversation.create({
            participants: [userId, participantId],
        });

        conversation = await Conversation.findById(conversation._id)
            .populate("participants", "name email avatar location")
            .populate("lastMessage");

        return res.status(201).json({
            success: true,
            message: "Conversation created successfully.",
            data: {
                conversation,
            },
        });
    } catch (error) {
        next(error);
    }
};

// Get all conversations of logged-in user
const getConversations = async (req, res, next) => {
    try {
        const userId = req.user.userId;

        const conversations = await Conversation.find({
            participants: userId,
        })
            .populate("participants", "name avatar location")
            .populate({
                path: "lastMessage",
                select: "sender receiver text isRead createdAt",
            })
            .sort({ updatedAt: -1 });

        return res.status(200).json({
            success: true,
            data: {
                conversations,
            },
        });
    } catch (error) {
        next(error);
    }
};

// Get one conversation
const getConversation = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { conversationId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(conversationId)) {
            const error = new Error("Invalid conversation ID.");

            error.statusCode = 400;
            return next(error);
        }

        const conversation = await Conversation.findOne({
            _id: conversationId,
            participants: userId,
        })
            .populate("participants", "name email avatar location")
            .populate("lastMessage");

        if (!conversation) {
            const error = new Error("Conversation not found.");

            error.statusCode = 404;
            return next(error);
        }

        return res.status(200).json({
            success: true,
            data: {
                conversation,
            },
        });
    } catch (error) {
        next(error);
    }
};

// Delete conversation
const deleteConversation = async (req, res, next) => {
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

        await Message.deleteMany({
            conversation: conversationId,
        });

        await Conversation.findByIdAndDelete(conversationId);

        return res.status(200).json({
            success: true,
            message: "Conversation deleted successfully.",
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createConversation,
    getConversations,
    getConversation,
    deleteConversation,
};
