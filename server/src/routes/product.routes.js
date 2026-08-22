const express = require("express");

const {
    publishProduct, getProducts, getProductDetails, getMyProducts, updateProduct, deleteProduct
} = require("../controllers/product.controller");

const {
    publishProductValidator, updateProductValidator
} = require("../validators/product.validator");

const validate = require("../middleware/validation.middleware");

const protect = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", protect, publishProductValidator, validate, publishProduct);

router.get("/", getProducts);

router.get("/my", protect, getMyProducts);

router.get("/:productId", getProductDetails);

router.put("/:productId", protect, updateProductValidator, validate, updateProduct);

router.delete("/:productId", protect, deleteProduct);

module.exports = router;