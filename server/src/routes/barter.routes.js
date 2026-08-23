const express = require("express");

const {
    createBarterRequest,
    getIncomingBarterRequests,
    getOutgoingBarterRequests,
    getPendingBarterRequests,
    getBarterRequestById,
    updateBarterStatus,
    completeBarter
} = require("../controllers/barter.controller");

const {
    createBarterValidator,
    updateBarterStatusValidator,
} = require("../validators/barter.validator");

const validate = require("../middleware/validation.middleware");
const protect = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", protect, createBarterValidator, validate, createBarterRequest);

router.get("/incoming", protect, getIncomingBarterRequests);

router.get("/outgoing", protect, getOutgoingBarterRequests);

router.get("/pending", protect, getPendingBarterRequests);

router.put("/:barterId/complete", protect, completeBarter);

router.get("/:barterId", protect, getBarterRequestById);

router.put(
    "/:barterId",
    protect,
    updateBarterStatusValidator,
    validate,
    updateBarterStatus,
);

module.exports = router;
