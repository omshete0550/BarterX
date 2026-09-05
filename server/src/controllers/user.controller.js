const User = require("../models/User");
const Product = require("../models/Product");
const Rating = require("../models/Rating");
const uploadToCloudinary = require("../utils/uploadToCloudinary");
const { deleteFromCloudinary } = require("../utils/uploadToCloudinary");

const updateProfile = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { name, avatar, bio, location, phone } = req.body;
        const updates = {};

        if (name !== undefined) updates.name = name;
        if (avatar !== undefined) updates.avatar = avatar;
        if (bio !== undefined) updates.bio = bio;
        if (location !== undefined) updates.location = location;
        if (phone !== undefined) updates.phone = phone;
        if (req.file) updates.avatar = await uploadToCloudinary(req.file, "barterx/avatars");

        if (Object.keys(updates).length === 0) {
            const error = new Error("No profile fields provided for update.");
            error.statusCode = 400;
            return next(error);
        }

        const existingUser = await User.findById(userId).select("avatar");
        if (!existingUser) {
            const error = new Error("User not found.");
            error.statusCode = 404;
            return next(error);
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { $set: updates },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!user) {
            const error = new Error("User not found.");
            error.statusCode = 404;
            return next(error);
        }

        const userResponse = user.toObject();
        delete userResponse.password;

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            data: {
                user: userResponse,
            },
        });

    } catch (error) {
        next(error);
    }
};

const getPublicProfile = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const [user, products, ratings] = await Promise.all([
            User.findById(userId).select("name avatar bio location isVerified createdAt"),
            Product.find({ owner: userId, isActive: true, status: "active" }).sort({ createdAt: -1 }),
            Rating.find({ reviewee: userId }),
        ]);

        if (existingUser.avatar && updates.avatar && existingUser.avatar !== updates.avatar) await deleteFromCloudinary(existingUser.avatar);

        const averageRating = ratings.length
            ? Number((ratings.reduce((sum, item) => sum + item.rating, 0) / ratings.length).toFixed(1))
            : 0;

        return res.status(200).json({
            success: true,
            data: { user, products, summary: { averageRating, totalRatings: ratings.length } },
        });
    } catch (error) {
        next(error);
    }
};

const deleteAccount = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            const error = new Error("User not found.");
            error.statusCode = 404;
            return next(error);
        }

        await deleteFromCloudinary(user.avatar);
        const products = await Product.find({ owner: userId });
        await Promise.allSettled(products.flatMap((product) => product.images.map(deleteFromCloudinary)));
        await Product.deleteMany({ owner: userId });

        return res.status(200).json({
            success: true,
            message: "Account deleted successfully.",
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    updateProfile,
    getPublicProfile,
    deleteAccount,
};
