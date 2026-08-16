const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Product title is required"],
            trim: true,
            minlength: [2, "Title must be at least 2 characters"],
            maxlength: [100, "Title cannot exceed 100 characters"],
        },

        description: {
            type: String,
            required: [true, "Product description is required"],
            trim: true,
            maxlength: [2000, "Description cannot exceed 2000 characters"],
        },

        category: {
            type: String,
            required: [true, "Category is required"],
            enum: [
                "Electronics",
                "Books",
                "Furniture",
                "Sports",
                "Music",
                "Fashion",
                "Other",
            ],
        },

        condition: {
            type: String,
            required: [true, "Product condition is required"],
            enum: [
                "Like New",
                "Good",
                "Fair",
            ],
        },

        location: {
            type: String,
            required: [true, "Location is required"],
            trim: true,
        },

        images: [
            {
                type: String,
                required: true,
            },
        ],

        desiredProduct: {
            type: String,
            required: [true, "Desired product is required"],
            trim: true,
            maxlength: [200, "Desired product cannot exceed 200 characters"],
        },

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        isAvailable: {
            type: Boolean,
            default: true,
        },

        isSwapped: {
            type: Boolean,
            default: false,
        },

        views: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;