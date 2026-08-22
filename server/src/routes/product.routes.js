const express = require("express");

const {
    publishProduct,
} = require("../controllers/product.controller");

const {
    publishProductValidator,
} = require("../validators/product.validator");

const validate = require("../middleware/validation.middleware");

const protect = require("../middleware/auth.middleware");

const router = express.Router();

router.post(
    "/",
    protect,
    publishProductValidator,
    validate,
    publishProduct
);

module.exports = router;