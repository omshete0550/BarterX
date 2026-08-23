const { body } = require("express-validator");

const createRatingValidator = [
    body("barterRequest")
        .notEmpty()
        .withMessage("Barter request is required")
        .isMongoId()
        .withMessage("Invalid barter request ID"),

    body("rating")
        .notEmpty()
        .withMessage("Rating is required")
        .isInt({ min: 1, max: 5 })
        .withMessage("Rating must be between 1 and 5"),

    body("review")
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage("Review cannot exceed 500 characters"),
];

module.exports = {
    createRatingValidator,
};
