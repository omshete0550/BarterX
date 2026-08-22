const mongoose = require("mongoose");

const barterRequestSchema = new mongoose.Schema(
    {
        requester: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        requestedProduct: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },

        offeredProduct: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },

        message: {
            type: String,
            trim: true,
            maxlength: [500, "Message cannot exceed 500 characters"],
            default: "",
        },

        status: {
            type: String,
            enum: [
                "pending",
                "accepted",
                "rejected",
                "cancelled",
                "completed",
            ],
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
);

const BarterRequest = mongoose.model(
    "BarterRequest",
    barterRequestSchema
);

module.exports = BarterRequest;