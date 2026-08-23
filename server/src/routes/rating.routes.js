const express = require("express");

const {
    createRating,
    getProductRatings,
    getUserRatings,
} = require("../controllers/rating.controller");

const { createRatingValidator } = require("../validators/rating.validator");

const validate = require("../middleware/validation.middleware");
const protect = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", protect, createRatingValidator, validate, createRating);

router.get("/product/:productId", getProductRatings);

router.get("/user/:userId", getUserRatings);

module.exports = router;
