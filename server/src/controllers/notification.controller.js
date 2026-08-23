const Notification = require("../models/Notification");

const getNotifications = async (req, res, next) => {
    try {
        const userId = req.user.userId;

        const notifications = await Notification.find({
            recipient: userId,
        })
            .populate("sender", "name avatar")
            .populate("product", "title images")
            .populate("barterRequest", "status")
            .sort({ createdAt: -1 });

        const unreadCount = await Notification.countDocuments({
            recipient: userId,
            isRead: false,
        });

        return res.status(200).json({
            success: true,
            data: {
                notifications,
                unreadCount,
            },
        });
    } catch (error) {
        next(error);
    }
};

const markNotificationAsRead = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { notificationId } = req.params;

        const notification = await Notification.findOneAndUpdate(
            {
                _id: notificationId,
                recipient: userId,
            },
            {
                isRead: true,
            },
            {
                new: true,
            },
        );

        if (!notification) {
            const error = new Error("Notification not found.");

            error.statusCode = 404;
            return next(error);
        }

        return res.status(200).json({
            success: true,
            message: "Notification marked as read.",
            data: {
                notification,
            },
        });
    } catch (error) {
        next(error);
    }
};

const markAllNotificationsAsRead = async (req, res, next) => {
    try {
        const userId = req.user.userId;

        await Notification.updateMany(
            {
                recipient: userId,
                isRead: false,
            },
            {
                isRead: true,
            },
        );

        return res.status(200).json({
            success: true,
            message: "All notifications marked as read.",
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
};
