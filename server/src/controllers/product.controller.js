const Product = require("../models/Product");

const publishProduct = async (req, res, next) => {
    try {
        const userId = req.user.userId;

        const {
            title,
            description,
            category,
            condition,
            location,
            desiredProduct,
            images,
        } = req.body;

        const product = await Product.create({
            title,
            description,
            category,
            condition,
            location,
            desiredProduct,
            images,
            owner: userId,
        });

        return res.status(201).json({
            success: true,
            message: "Product published successfully",
            data: {
                product,
            },
        });
    } catch (error) {
        next(error);
    }
};

const getProducts = async (req, res, next) => {
    try {
        const {
            search,
            category,
            condition,
            location,
            sort = "newest",
            page = 1,
            limit = 12,
        } = req.query;

        const filter = {
            isActive: true,
        };

        // Search by title or description
        if (search?.trim()) {
            const searchTerm = search.trim();

            filter.$or = [
                {
                    title: {
                        $regex: searchTerm,
                        $options: "i",
                    },
                },
                {
                    description: {
                        $regex: searchTerm,
                        $options: "i",
                    },
                },
            ];
        }

        // Filter by category
        if (category) {
            filter.category = category.toLowerCase();
        }

        // Filter by condition
        if (condition) {
            filter.condition = condition.toLowerCase();
        }

        // Filter by location
        if (location?.trim()) {
            filter.location = {
                $regex: location.trim(),
                $options: "i",
            };
        }

        // Pagination
        const pageNumber = Math.max(
            parseInt(page) || 1,
            1
        );

        const limitNumber = Math.min(
            Math.max(parseInt(limit) || 12, 1),
            50
        );

        const skip = (pageNumber - 1) * limitNumber;

        // Sorting
        let sortOption = {};

        switch (sort) {
            case "oldest":
                sortOption = { createdAt: 1 };
                break;

            case "popular":
                sortOption = { views: -1 };
                break;

            case "newest":
            default:
                sortOption = { createdAt: -1 };
                break;
        }

        const [products, totalProducts] = await Promise.all([
            Product.find(filter)
                .populate("owner", "name avatar location")
                .sort(sortOption)
                .skip(skip)
                .limit(limitNumber),

            Product.countDocuments(filter),
        ]);

        const totalPages = Math.ceil(
            totalProducts / limitNumber
        );

        return res.status(200).json({
            success: true,
            data: {
                products,
                pagination: {
                    page: pageNumber,
                    limit: limitNumber,
                    totalProducts,
                    totalPages,
                },
            },
        });
    } catch (error) {
        next(error);
    }
};

const getProductDetails = async (req, res, next) => {
    try {
        const { productId } = req.params;

        const product = await Product.findOneAndUpdate(
            {
                _id: productId,
                isActive: true,
            },
            {
                $inc: { views: 1 },
            },
            {
                new: true,
            },
        ).populate("owner", "name avatar location bio");

        if (!product) {
            const error = new Error("Product not found.");
            error.statusCode = 404;
            return next(error);
        }

        return res.status(200).json({
            success: true,
            data: {
                product,
            },
        });
    } catch (error) {
        next(error);
    }
};

const getMyProducts = async (req, res, next) => {
    try {
        const userId = req.user.userId;

        const products = await Product.find({
            owner: userId,
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: {
                products,
            },
        });
    } catch (error) {
        next(error);
    }
};

const updateProduct = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const userId = req.user.userId;

        const {
            title,
            description,
            category,
            condition,
            location,
            desiredProduct,
            images,
        } = req.body;

        const product = await Product.findOne({
            _id: productId,
            owner: userId,
            isActive: true,
        });

        if (!product) {
            const error = new Error(
                "Product not found or you are not authorized to update it."
            );

            error.statusCode = 404;
            return next(error);
        }

        if (title !== undefined) {
            product.title = title;
        }

        if (description !== undefined) {
            product.description = description;
        }

        if (category !== undefined) {
            product.category = category;
        }

        if (condition !== undefined) {
            product.condition = condition;
        }

        if (location !== undefined) {
            product.location = location;
        }

        if (desiredProduct !== undefined) {
            product.desiredProduct = desiredProduct;
        }

        if (images !== undefined) {
            product.images = images;
        }

        await product.save();

        return res.status(200).json({
            success: true,
            message: "Product updated successfully.",
            data: {
                product,
            },
        });
    } catch (error) {
        next(error);
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const userId = req.user.userId;

        const product = await Product.findOne({
            _id: productId,
            owner: userId,
            isActive: true,
        });

        if (!product) {
            const error = new Error(
                "Product not found or you are not authorized to delete it."
            );

            error.statusCode = 404;
            return next(error);
        }

        product.isActive = false;

        await product.save();

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully.",
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    publishProduct,
    getProducts,
    getProductDetails,
    getMyProducts,
    updateProduct,
    deleteProduct
};
