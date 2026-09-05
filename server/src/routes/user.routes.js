const express = require("express");
const { updateProfile, deleteAccount, getPublicProfile } = require("../controllers/user.controller");
const protect = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

const router = express.Router();

router.put(
    "/profile",
    protect,
    upload.single("avatar"),
    updateProfile
);

router.get("/:userId", getPublicProfile);

router.delete(
    "/account",
    protect,
    deleteAccount
);
module.exports = router;
