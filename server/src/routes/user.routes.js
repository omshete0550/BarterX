const express = require("express");
const { updateProfile, deleteAccount } = require("../controllers/user.controller");
const protect = require("../middleware/auth.middleware");

const router = express.Router();

router.put(
    "/profile",
    protect,
    updateProfile
);

router.delete(
    "/account",
    protect,
    deleteAccount
);
module.exports = router;