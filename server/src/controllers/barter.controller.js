const BarterRequest = require("../models/BarterRequest");
const Product = require("../models/Product");

const createBarterRequest = async (req, res, next) => {
    try {
        const userId = req.user.userId;

        const {
            requestedProduct,
            offeredProduct,
            message,
        } = req.body;

        // Find the product the user wants
        const requestedProductData = await Product.findOne({
            _id: requestedProduct,
            isActive: true,
        });

        if (!requestedProductData) {
            const error = new Error(
                "Requested product not found."
            );

            error.statusCode = 404;
            return next(error);
        }

        // Find the product the user is offering
        const offeredProductData = await Product.findOne({
            _id: offeredProduct,
            isActive: true,
        });

        if (!offeredProductData) {
            const error = new Error(
                "Offered product not found."
            );

            error.statusCode = 404;
            return next(error);
        }

        // User cannot barter their own product
        if (
            requestedProductData.owner.toString() ===
            userId.toString()
        ) {
            const error = new Error(
                "You cannot send a barter request for your own product."
            );

            error.statusCode = 400;
            return next(error);
        }

        // User must own the product they are offering
        if (
            offeredProductData.owner.toString() !==
            userId.toString()
        ) {
            const error = new Error(
                "You can only offer your own product."
            );

            error.statusCode = 403;
            return next(error);
        }

        // Prevent offering the same product
        if (
            requestedProductData._id.toString() ===
            offeredProductData._id.toString()
        ) {
            const error = new Error(
                "Requested and offered products cannot be the same."
            );

            error.statusCode = 400;
            return next(error);
        }

        const receiver = requestedProductData.owner;

        // Prevent duplicate pending requests
        const existingRequest = await BarterRequest.findOne({
            requester: userId,
            receiver,
            requestedProduct,
            offeredProduct,
            status: "pending",
        });

        if (existingRequest) {
            const error = new Error(
                "You already have a pending barter request for these products."
            );

            error.statusCode = 409;
            return next(error);
        }

        const barterRequest = await BarterRequest.create({
            requester: userId,
            receiver,
            requestedProduct,
            offeredProduct,
            message,
        });

        return res.status(201).json({
            success: true,
            message: "Barter request sent successfully.",
            data: {
                barterRequest,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createBarterRequest,
};