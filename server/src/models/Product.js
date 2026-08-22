const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Product title is required"],
            trim: true,
            minlength: [3, "Product title must be at least 3 characters"],
            maxlength: [100, "Product title cannot exceed 100 characters"],
        },

        description: {
            type: String,
            required: [true, "Product description is required"],
            trim: true,
            maxlength: [
                2000,
                "Product description cannot exceed 2000 characters",
            ],
        },

        category: {
            type: String,
            required: [true, "Product category is required"],
            trim: true,
            enum: [
                "electronics",
                "furniture",
                "clothing",
                "books",
                "vehicles",
                "sports",
                "home",
                "other",
            ],
        },

        condition: {
            type: String,
            required: [true, "Product condition is required"],
            enum: [
                "new",
                "like-new",
                "good",
                "fair",
                "poor",
            ],
        },

        location: {
            type: String,
            required: [true, "Product location is required"],
            trim: true,
        },

        desiredProduct: {
            type: String,
            trim: true,
            maxlength: [
                200,
                "Desired product cannot exceed 200 characters",
            ],
            default: "",
        },

        images: {
            type: [String],
            default: [],
        },

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Product owner is required"],
        },

        status: {
            type: String,
            enum: ["active", "sold", "swapped"],
            default: "active",
        },

        views: {
            type: Number,
            default: 0,
            min: [0, "Views cannot be negative"],
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;