const { body } = require("express-validator");

const sendMessageValidator = [
    body("conversationId")
        .optional()
        .isMongoId()
        .withMessage("Invalid conversation ID"),

    body("receiver")
        .trim()
        .notEmpty()
        .withMessage("Receiver is required")
        .isMongoId()
        .withMessage("Invalid receiver ID"),

    body("text")
        .trim()
        .notEmpty()
        .withMessage("Message text is required")
        .isLength({ max: 2000 })
        .withMessage("Message cannot exceed 2000 characters"),
];

module.exports = {
    sendMessageValidator,
};
