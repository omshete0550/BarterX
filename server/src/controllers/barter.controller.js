const mongoose = require("mongoose");
const BarterRequest = require("../models/BarterRequest");
const Product = require("../models/Product");

const createBarterRequest = async (req, res, next) => {
    try {
        const requesterId = req.user.userId;

        const { requestedProduct, offeredProduct, message } = req.body;

        if (requestedProduct === offeredProduct) {
            const error = new Error(
                "Requested product and offered product cannot be the same.",
            );

            error.statusCode = 400;
            return next(error);
        }

        const [requestedProductDoc, offeredProductDoc] = await Promise.all([
            Product.findById(requestedProduct),
            Product.findById(offeredProduct),
        ]);

        if (!requestedProductDoc) {
            const error = new Error("Requested product not found.");

            error.statusCode = 404;
            return next(error);
        }

        if (!offeredProductDoc) {
            const error = new Error("Offered product not found.");

            error.statusCode = 404;
            return next(error);
        }

        if (requestedProductDoc.owner.toString() === requesterId.toString()) {
            const error = new Error(
                "You cannot create a barter request for your own product.",
            );

            error.statusCode = 400;
            return next(error);
        }

        if (offeredProductDoc.owner.toString() !== requesterId.toString()) {
            const error = new Error("You can only offer products that you own.");

            error.statusCode = 403;
            return next(error);
        }

        const receiverId = requestedProductDoc.owner;

        if (
            !requestedProductDoc.isActive ||
            requestedProductDoc.status !== "active"
        ) {
            const error = new Error(
                "The requested product is no longer available for barter.",
            );

            error.statusCode = 400;
            return next(error);
        }

        if (!offeredProductDoc.isActive || offeredProductDoc.status !== "active") {
            const error = new Error(
                "The offered product is no longer available for barter.",
            );

            error.statusCode = 400;
            return next(error);
        }

        const existingProductBarter = await BarterRequest.findOne({
            status: {
                $in: ["pending", "accepted"],
            },
            $or: [
                {
                    requestedProduct: requestedProductDoc._id,
                },
                {
                    offeredProduct: requestedProductDoc._id,
                },
                {
                    requestedProduct: offeredProductDoc._id,
                },
                {
                    offeredProduct: offeredProductDoc._id,
                },
            ],
        });

        if (existingProductBarter) {
            const error = new Error(
                "One of these products is already involved in an active barter request.",
            );

            error.statusCode = 409;
            return next(error);
        }

        const existingRequest = await BarterRequest.findOne({
            requester: requesterId,
            receiver: receiverId,
            requestedProduct: requestedProductDoc._id,
            offeredProduct: offeredProductDoc._id,
            status: {
                $in: ["pending", "accepted"],
            },
        });

        if (existingRequest) {
            const error = new Error(
                "You already have an active barter request for these products.",
            );

            error.statusCode = 409;
            return next(error);
        }

        const barterRequest = await BarterRequest.create({
            requester: requesterId,
            receiver: receiverId,
            requestedProduct: requestedProductDoc._id,
            offeredProduct: offeredProductDoc._id,
            message: message || "",
        });

        return res.status(201).json({
            success: true,
            message: "Barter request created successfully.",
            data: {
                barterRequest,
            },
        });
    } catch (error) {
        next(error);
    }
};

const getIncomingBarterRequests = async (req, res, next) => {
    try {
        const userId = req.user.userId;

        const requests = await BarterRequest.find({
            receiver: userId,
        })
            .populate("requester", "name email avatar location")
            .populate(
                "requestedProduct",
                "title description category condition images location",
            )
            .populate(
                "offeredProduct",
                "title description category condition images location",
            )
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: {
                requests,
            },
        });
    } catch (error) {
        next(error);
    }
};

const getOutgoingBarterRequests = async (req, res, next) => {
    try {
        const userId = req.user.userId;

        const requests = await BarterRequest.find({
            requester: userId,
        })
            .populate("receiver", "name email avatar location")
            .populate(
                "requestedProduct",
                "title description category condition images location",
            )
            .populate(
                "offeredProduct",
                "title description category condition images location",
            )
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: {
                requests,
            },
        });
    } catch (error) {
        next(error);
    }
};

const getPendingBarterRequests = async (req, res, next) => {
    try {
        const userId = req.user.userId;

        const requests = await BarterRequest.find({
            $or: [
                {
                    requester: userId,
                },
                {
                    receiver: userId,
                },
            ],
            status: "pending",
        })
            .populate("requester", "name email avatar location")
            .populate("receiver", "name email avatar location")
            .populate(
                "requestedProduct",
                "title description category condition images location",
            )
            .populate(
                "offeredProduct",
                "title description category condition images location",
            )
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: {
                requests,
            },
        });
    } catch (error) {
        next(error);
    }
};

const getBarterRequestById = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { barterId } = req.params;

        const request = await BarterRequest.findOne({
            _id: barterId,
            $or: [
                {
                    requester: userId,
                },
                {
                    receiver: userId,
                },
            ],
        })
            .populate("requester", "name email avatar location")
            .populate("receiver", "name email avatar location")
            .populate(
                "requestedProduct",
                "title description category condition images location",
            )
            .populate(
                "offeredProduct",
                "title description category condition images location",
            );

        if (!request) {
            const error = new Error("Barter request not found.");

            error.statusCode = 404;
            return next(error);
        }

        return res.status(200).json({
            success: true,
            data: {
                request,
            },
        });
    } catch (error) {
        next(error);
    }
};

const updateBarterStatus = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { barterId } = req.params;
        const { status } = req.body;

        const barterRequest = await BarterRequest.findById(barterId);

        if (!barterRequest) {
            const error = new Error("Barter request not found.");

            error.statusCode = 404;
            return next(error);
        }

        // Only the requester or receiver can modify the request
        const isRequester =
            barterRequest.requester.toString() === userId.toString();

        const isReceiver = barterRequest.receiver.toString() === userId.toString();

        if (!isRequester && !isReceiver) {
            const error = new Error(
                "You are not authorized to update this barter request.",
            );

            error.statusCode = 403;
            return next(error);
        }

        // Request must still be pending
        if (barterRequest.status !== "pending") {
            const error = new Error(
                `This barter request is already ${barterRequest.status}.`,
            );

            error.statusCode = 400;
            return next(error);
        }

        // Only receiver can accept or reject
        if ((status === "accepted" || status === "rejected") && !isReceiver) {
            const error = new Error(
                "Only the product owner can accept or reject the barter request.",
            );

            error.statusCode = 403;
            return next(error);
        }

        // Only requester can cancel
        if (status === "cancelled" && !isRequester) {
            const error = new Error(
                "Only the requester can cancel the barter request.",
            );

            error.statusCode = 403;
            return next(error);
        }

        barterRequest.status = status;

        await barterRequest.save();

        return res.status(200).json({
            success: true,
            message: `Barter request ${status} successfully.`,
            data: {
                barterRequest,
            },
        });
    } catch (error) {
        next(error);
    }
};

const completeBarter = async (req, res, next) => {
    const session = await mongoose.startSession();

    try {
        const userId = req.user.userId;
        const { barterId } = req.params;

        session.startTransaction();

        const barterRequest =
            await BarterRequest.findById(barterId).session(session);

        if (!barterRequest) {
            const error = new Error("Barter request not found.");
            error.statusCode = 404;
            throw error;
        }

        // Only requester or receiver can complete the barter
        const isRequester =
            barterRequest.requester.toString() === userId.toString();

        const isReceiver = barterRequest.receiver.toString() === userId.toString();

        if (!isRequester && !isReceiver) {
            const error = new Error(
                "You are not authorized to complete this barter.",
            );
            error.statusCode = 403;
            throw error;
        }

        // Barter must be accepted first
        if (barterRequest.status !== "accepted") {
            const error = new Error(
                "Only an accepted barter request can be completed.",
            );
            error.statusCode = 400;
            throw error;
        }

        const requestedProduct = await Product.findById(
            barterRequest.requestedProduct,
        ).session(session);

        const offeredProduct = await Product.findById(
            barterRequest.offeredProduct,
        ).session(session);

        if (!requestedProduct || !offeredProduct) {
            const error = new Error("One or both products no longer exist.");
            error.statusCode = 404;
            throw error;
        }

        // Both products must still be available
        if (!requestedProduct.isActive || !offeredProduct.isActive) {
            const error = new Error("One or both products are no longer available.");
            error.statusCode = 400;
            throw error;
        }

        // Verify ownership before exchanging
        if (
            requestedProduct.owner.toString() !== barterRequest.receiver.toString()
        ) {
            const error = new Error(
                "The requested product is no longer owned by the receiver.",
            );
            error.statusCode = 400;
            throw error;
        }

        if (
            offeredProduct.owner.toString() !== barterRequest.requester.toString()
        ) {
            const error = new Error(
                "The offered product is no longer owned by the requester.",
            );
            error.statusCode = 400;
            throw error;
        }

        // Exchange ownership
        requestedProduct.owner = barterRequest.requester;
        offeredProduct.owner = barterRequest.receiver;

        // Mark products as swapped
        requestedProduct.status = "swapped";
        offeredProduct.status = "swapped";

        // Remove products from marketplace
        requestedProduct.isActive = false;
        offeredProduct.isActive = false;

        // Save products
        await requestedProduct.save({ session });
        await offeredProduct.save({ session });

        // Complete barter
        barterRequest.status = "completed";

        await barterRequest.save({ session });

        await session.commitTransaction();

        return res.status(200).json({
            success: true,
            message: "Barter completed successfully.",
            data: {
                barterRequest,
                requestedProduct,
                offeredProduct,
            },
        });
    } catch (error) {
        await session.abortTransaction();
        next(error);
    } finally {
        session.endSession();
    }
};

module.exports = {
    createBarterRequest,
    getIncomingBarterRequests,
    getOutgoingBarterRequests,
    getPendingBarterRequests,
    getBarterRequestById,
    updateBarterStatus,
    completeBarter,
};
