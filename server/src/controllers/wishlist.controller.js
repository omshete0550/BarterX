const User = require("../models/User");
const Product = require("../models/Product");

const addToWishlist = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { productId } = req.params;

        const product = await Product.findById(productId);

        if (!product) {
            const error = new Error("Product not found.");
            error.statusCode = 404;
            return next(error);
        }

        if (!product.isActive || product.status !== "active") {
            const error = new Error("This product is no longer available.");
            error.statusCode = 400;
            return next(error);
        }

        const user = await User.findById(userId);

        if (!user) {
            const error = new Error("User not found.");
            error.statusCode = 404;
            return next(error);
        }

        if (user.wishlist.includes(productId)) {
            const error = new Error("Product is already in your wishlist.");
            error.statusCode = 409;
            return next(error);
        }

        user.wishlist.push(productId);

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Product added to wishlist.",
            data: {
                wishlist: user.wishlist,
            },
        });
    } catch (error) {
        next(error);
    }
};

const removeFromWishlist = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { productId } = req.params;

        const user = await User.findById(userId);

        if (!user) {
            const error = new Error("User not found.");
            error.statusCode = 404;
            return next(error);
        }

        const productIndex = user.wishlist.findIndex(
            (id) => id.toString() === productId,
        );

        if (productIndex === -1) {
            const error = new Error("Product is not in your wishlist.");
            error.statusCode = 404;
            return next(error);
        }

        user.wishlist.splice(productIndex, 1);

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Product removed from wishlist.",
            data: {
                wishlist: user.wishlist,
            },
        });
    } catch (error) {
        next(error);
    }
};

const getWishlist = async (req, res, next) => {
    try {
        const userId = req.user.userId;

        const user = await User.findById(userId).populate({
            path: "wishlist",
            populate: {
                path: "owner",
                select: "name avatar location",
            },
        });

        if (!user) {
            const error = new Error("User not found.");
            error.statusCode = 404;
            return next(error);
        }

        return res.status(200).json({
            success: true,
            data: {
                wishlist: user.wishlist,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addToWishlist,
    removeFromWishlist,
    getWishlist,
};
