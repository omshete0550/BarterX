const User = require("../models/User");

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

        if (Object.keys(updates).length === 0) {
            const error = new Error("No profile fields provided for update.");
            error.statusCode = 400;
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

const deleteAccount = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            const error = new Error("User not found.");
            error.statusCode = 404;
            return next(error);
        }

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
    deleteAccount,
};