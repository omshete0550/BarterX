const Rating = require("../models/Rating");
const BarterRequest = require("../models/BarterRequest");

const createRating = async (req, res, next) => {
    try {
        const reviewerId = req.user.userId;

        const { barterRequest: barterRequestId, rating, review } = req.body;

        // Find barter
        const barterRequest = await BarterRequest.findById(barterRequestId);

        if (!barterRequest) {
            const error = new Error("Barter request not found.");

            error.statusCode = 404;
            return next(error);
        }

        // Rating is only allowed after completion
        if (barterRequest.status !== "completed") {
            const error = new Error("You can only rate a completed barter.");

            error.statusCode = 400;
            return next(error);
        }

        // Check reviewer participated in barter
        const isRequester =
            barterRequest.requester.toString() === reviewerId.toString();

        const isReceiver =
            barterRequest.receiver.toString() === reviewerId.toString();

        if (!isRequester && !isReceiver) {
            const error = new Error("You did not participate in this barter.");

            error.statusCode = 403;
            return next(error);
        }

        // Determine who is being reviewed
        const reviewee = isRequester
            ? barterRequest.receiver
            : barterRequest.requester;

        // Prevent duplicate rating
        const existingRating = await Rating.findOne({
            reviewer: reviewerId,
            barterRequest: barterRequestId,
        });

        if (existingRating) {
            const error = new Error("You have already rated this barter.");

            error.statusCode = 409;
            return next(error);
        }

        // Determine the product received by reviewer
        const product = isRequester
            ? barterRequest.requestedProduct
            : barterRequest.offeredProduct;

        const newRating = await Rating.create({
            reviewer: reviewerId,
            reviewee,
            product,
            barterRequest: barterRequestId,
            rating,
            review: review || "",
        });

        return res.status(201).json({
            success: true,
            message: "Rating submitted successfully.",
            data: {
                rating: newRating,
            },
        });
    } catch (error) {
        next(error);
    }
};

const getProductRatings = async (req, res, next) => {
    try {
        const { productId } = req.params;

        const ratings = await Rating.find({
            product: productId,
        })
            .populate("reviewer", "name avatar")
            .sort({ createdAt: -1 });

        const totalRatings = ratings.length;

        const averageRating =
            totalRatings > 0
                ? ratings.reduce((sum, item) => sum + item.rating, 0) / totalRatings
                : 0;

        return res.status(200).json({
            success: true,
            data: {
                ratings,
                summary: {
                    averageRating: Number(averageRating.toFixed(1)),
                    totalRatings,
                },
            },
        });
    } catch (error) {
        next(error);
    }
};

const getUserRatings = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const ratings = await Rating.find({
            reviewee: userId,
        })
            .populate("reviewer", "name avatar")
            .populate("product", "title images")
            .sort({ createdAt: -1 });

        const totalRatings = ratings.length;

        const averageRating =
            totalRatings > 0
                ? ratings.reduce((sum, item) => sum + item.rating, 0) / totalRatings
                : 0;

        return res.status(200).json({
            success: true,
            data: {
                ratings,
                summary: {
                    averageRating: Number(averageRating.toFixed(1)),
                    totalRatings,
                },
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createRating,
    getProductRatings,
    getUserRatings
};
