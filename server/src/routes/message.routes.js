const express = require("express");

const {
    sendMessage,
    getMessages,
    markMessageAsRead,
    markConversationAsRead,
} = require("../controllers/message.controller");

const { sendMessageValidator } = require("../validators/message.validator");

const validate = require("../middleware/validation.middleware");

const protect = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", protect, sendMessageValidator, validate, sendMessage);

router.get("/:conversationId", protect, getMessages);

router.put("/:messageId/read", protect, markMessageAsRead);

router.put(
    "/conversation/:conversationId/read",
    protect,
    markConversationAsRead,
);

module.exports = router;
