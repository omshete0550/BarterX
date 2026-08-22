const express = require("express");

const {
    createBarterRequest,
} = require("../controllers/barter.controller");

const {
    createBarterValidator,
} = require("../validators/barter.validator");

const validate = require("../middleware/validation.middleware");
const protect = require("../middleware/auth.middleware");

const router = express.Router();

router.post(
    "/",
    protect,
    createBarterValidator,
    validate,
    createBarterRequest
);

module.exports = router;