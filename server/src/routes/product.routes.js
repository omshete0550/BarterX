const express = require("express");

const {
    publishProduct, getProducts, getProductDetails, getMyProducts, updateProduct, deleteProduct
} = require("../controllers/product.controller");

const {
    publishProductValidator, updateProductValidator
} = require("../validators/product.validator");

const validate = require("../middleware/validation.middleware");

const protect = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

const router = express.Router();

router.post(
    "/",
    protect,
    upload.array("images", 5),
    publishProductValidator,
    validate,
    publishProduct,
);

router.get("/", getProducts);

router.get("/my", protect, getMyProducts);

router.get("/:productId", getProductDetails);

router.put(
    "/:productId",
    protect,
    upload.array("images", 5),
    updateProductValidator,
    validate,
    updateProduct,
);

router.delete("/:productId", protect, deleteProduct);

module.exports = router;
