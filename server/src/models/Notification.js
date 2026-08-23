const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
    {
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        type: {
            type: String,
            enum: [
                "barter_request",
                "barter_accepted",
                "barter_rejected",
                "barter_completed",
                "rating_received",
            ],
            required: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        message: {
            type: String,
            required: true,
            trim: true,
        },

        barterRequest: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "BarterRequest",
            default: null,
        },

        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            default: null,
        },

        rating: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Rating",
            default: null,
        },

        isRead: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
