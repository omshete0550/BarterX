const { body } = require("express-validator");

const publishProductValidator = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Product title is required")
        .bail()
        .isLength({ min: 3, max: 100 })
        .withMessage(
            "Product title must be between 3 and 100 characters"
        ),

    body("description")
        .trim()
        .notEmpty()
        .withMessage("Product description is required")
        .bail()
        .isLength({ max: 2000 })
        .withMessage(
            "Product description cannot exceed 2000 characters"
        ),

    body("category")
        .trim()
        .notEmpty()
        .withMessage("Product category is required")
        .bail()
        .isIn([
            "electronics",
            "furniture",
            "clothing",
            "books",
            "vehicles",
            "sports",
            "home",
            "other",
        ])
        .withMessage("Invalid product category"),

    body("condition")
        .trim()
        .notEmpty()
        .withMessage("Product condition is required")
        .bail()
        .isIn([
            "new",
            "like-new",
            "good",
            "fair",
            "poor",
        ])
        .withMessage("Invalid product condition"),

    body("location")
        .trim()
        .notEmpty()
        .withMessage("Product location is required")
        .bail()
        .isLength({ max: 100 })
        .withMessage(
            "Location cannot exceed 100 characters"
        ),

    body("desiredProduct")
        .optional()
        .trim()
        .isLength({ max: 200 })
        .withMessage(
            "Desired product cannot exceed 200 characters"
        ),

    body("images")
        .optional()
        .isArray()
        .withMessage("Images must be an array"),

    body("images.*")
        .optional()
        .isURL()
        .withMessage("Each image must be a valid URL"),
];

module.exports = {
    publishProductValidator,
};