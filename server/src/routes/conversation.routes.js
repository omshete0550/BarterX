const express = require("express");

const {
    createConversation,
    getConversations,
    getConversation,
    deleteConversation,
} = require("../controllers/conversation.controller");

const protect = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", protect, createConversation);

router.get("/", protect, getConversations);

router.get("/:conversationId", protect, getConversation);

router.delete("/:conversationId", protect, deleteConversation);

module.exports = router;
