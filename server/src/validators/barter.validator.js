const { body, param } = require("express-validator");

const createBarterValidator = [
    body("requestedProduct")
        .trim()
        .notEmpty()
        .withMessage("Requested product is required")
        .isMongoId()
        .withMessage("Invalid requested product ID"),

    body("offeredProduct")
        .trim()
        .notEmpty()
        .withMessage("Offered product is required")
        .isMongoId()
        .withMessage("Invalid offered product ID"),

    body("message")
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage("Message cannot exceed 500 characters"),
];

const updateBarterStatusValidator = [
    body("status")
        .trim()
        .notEmpty()
        .withMessage("Status is required")
        .isIn(["accepted", "rejected", "cancelled"])
        .withMessage("Status must be accepted, rejected, or cancelled"),
];

module.exports = {
    createBarterValidator,
    updateBarterStatusValidator
};
