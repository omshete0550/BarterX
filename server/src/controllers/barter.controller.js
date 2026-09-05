const mongoose = require("mongoose");
const BarterRequest = require("../models/BarterRequest");
const Product = require("../models/Product");
const Conversation = require("../models/Conversation");
const { createNotification } = require("../utils/notification");

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

        const conversation = await Conversation.create({
            participants: [requesterId, receiverId],
            barterRequest: barterRequest._id,
        });
        barterRequest.conversation = conversation._id;
        await barterRequest.save();

        await createNotification({
            recipient: receiverId,
            sender: requesterId,
            type: "barter_request",
            title: "New barter request",
            message: "You received a new barter request.",
            barterRequest: barterRequest._id,
            product: requestedProductDoc._id,
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

        if (barterRequest.status !== "pending") {
            const error = new Error(
                `This barter request is already ${barterRequest.status}.`,
            );

            error.statusCode = 400;
            return next(error);
        }

        if ((status === "accepted" || status === "rejected") && !isReceiver) {
            const error = new Error(
                "Only the product owner can accept or reject the barter request.",
            );

            error.statusCode = 403;
            return next(error);
        }

        if (status === "cancelled" && !isRequester) {
            const error = new Error(
                "Only the requester can cancel the barter request.",
            );

            error.statusCode = 403;
            return next(error);
        }

        barterRequest.status = status;

        await barterRequest.save();

        if (status === "accepted") {
            await createNotification({
                recipient: barterRequest.requester,
                sender: barterRequest.receiver,
                type: "barter_accepted",
                title: "Barter request accepted",
                message: "Your barter request has been accepted.",
                barterRequest: barterRequest._id,
                product: barterRequest.requestedProduct,
            });
        }

        if (status === "rejected") {
            await createNotification({
                recipient: barterRequest.requester,
                sender: barterRequest.receiver,
                type: "barter_rejected",
                title: "Barter request rejected",
                message: "Your barter request has been rejected.",
                barterRequest: barterRequest._id,
                product: barterRequest.requestedProduct,
            });
        }

        if (status === "cancelled") {
            await createNotification({
                recipient: barterRequest.receiver,
                sender: barterRequest.requester,
                type: "barter_rejected",
                title: "Barter request cancelled",
                message: "A barter request has been cancelled.",
                barterRequest: barterRequest._id,
                product: barterRequest.requestedProduct,
            });
        }

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

        if (!requestedProduct.isActive || !offeredProduct.isActive) {
            const error = new Error("One or both products are no longer available.");
            error.statusCode = 400;
            throw error;
        }

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

        requestedProduct.owner = barterRequest.requester;
        offeredProduct.owner = barterRequest.receiver;

        requestedProduct.status = "swapped";
        offeredProduct.status = "swapped";

        requestedProduct.isActive = false;
        offeredProduct.isActive = false;

        await requestedProduct.save({ session });
        await offeredProduct.save({ session });

        barterRequest.status = "completed";

        await barterRequest.save({ session });

        await session.commitTransaction();

        await createNotification({
            recipient: barterRequest.requester,
            sender: barterRequest.receiver,
            type: "barter_completed",
            title: "Barter completed",
            message: "Your barter has been completed successfully.",
            barterRequest: barterRequest._id,
            product: barterRequest.requestedProduct,
        });

        await createNotification({
            recipient: barterRequest.receiver,
            sender: barterRequest.requester,
            type: "barter_completed",
            title: "Barter completed",
            message: "Your barter has been completed successfully.",
            barterRequest: barterRequest._id,
            product: barterRequest.offeredProduct,
        });

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
