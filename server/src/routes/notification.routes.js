const express = require("express");

const {
    getNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
} = require("../controllers/notification.controller");

const protect = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", protect, getNotifications);

router.put("/read/:notificationId", protect, markNotificationAsRead);

router.put("/read-all", protect, markAllNotificationsAsRead);

router.delete("/:notificationId", protect, deleteNotification);

module.exports = router;
