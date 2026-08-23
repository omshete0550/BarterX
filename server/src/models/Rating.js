const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
    {
        reviewer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        reviewee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },

        barterRequest: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "BarterRequest",
            required: true,
        },

        rating: {
            type: Number,
            required: [true, "Rating is required"],
            min: [1, "Rating must be at least 1"],
            max: [5, "Rating cannot exceed 5"],
        },

        review: {
            type: String,
            trim: true,
            maxlength: [500, "Review cannot exceed 500 characters"],
            default: "",
        },
    },
    {
        timestamps: true,
    },
);

ratingSchema.index(
    {
        reviewer: 1,
        barterRequest: 1,
    },
    {
        unique: true,
    },
);

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;
