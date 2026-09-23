const express = require("express");
const { rateLimit } = require("express-rate-limit");
const { register, login, refresh, logout, getMe } = require("../controllers/auth.controller");
const { registerValidator, loginValidator } = require("../validators/auth.validator");
const validate = require("../middleware/validation.middleware");
const protect = require("../middleware/auth.middleware");

const router = express.Router();
const sensitiveLimit = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: "draft-8", legacyHeaders: false, message: { success: false, message: "Too many attempts. Please try again later." } });

router.post("/register", sensitiveLimit, registerValidator, validate, register);
router.post("/login", sensitiveLimit, loginValidator, validate, login);
router.post("/refresh", sensitiveLimit, refresh);
router.post("/logout", logout);
router.get("/me", protect, getMe);

module.exports = router;
