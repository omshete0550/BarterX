const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
    {
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
        ],

        lastMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            default: null,
        },
    },
    {
        timestamps: true,
    },
);

conversationSchema.path("participants").validate(function (value) {
    return value.length === 2;
}, "A conversation must have exactly two participants.");

conversationSchema.index(
    {
        participants: 1,
    },
    {
        unique: false,
    },
);

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
