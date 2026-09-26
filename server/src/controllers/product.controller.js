const Product = require("../models/Product");
const uploadToCloudinary = require("../utils/uploadToCloudinary");
const { deleteFromCloudinary } = require("../utils/uploadToCloudinary");
const { getImageEmbedding, classifyFashionImage, isMlServiceConfigured } = require("../utils/mlService");

const cosineSimilarity = (firstVector, secondVector) => {
    if (!Array.isArray(firstVector) || !Array.isArray(secondVector) || firstVector.length !== secondVector.length) {
        return null;
    }

    const { dotProduct, firstMagnitude, secondMagnitude } = firstVector.reduce(
        (totals, value, index) => {
            const comparisonValue = secondVector[index];
            totals.dotProduct += value * comparisonValue;
            totals.firstMagnitude += value * value;
            totals.secondMagnitude += comparisonValue * comparisonValue;
            return totals;
        },
        { dotProduct: 0, firstMagnitude: 0, secondMagnitude: 0 },
    );

    if (!firstMagnitude || !secondMagnitude) return null;
    return dotProduct / (Math.sqrt(firstMagnitude) * Math.sqrt(secondMagnitude));
};

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
        } = req.body;

        const imageVectors = req.files?.length && isMlServiceConfigured()
            ? await Promise.all(req.files.map(getImageEmbedding))
            : [];

        const images = req.files?.length
            ? await Promise.all(req.files.map((file) => uploadToCloudinary(file, process.env.CLOUDINARY_UPLOAD_FOLDER || "barterx/products")))
            : [];

        const imageEmbeddings = images.map((imageUrl, index) => ({
            imageUrl,
            vector: imageVectors[index],
        })).filter((embedding) => Array.isArray(embedding.vector));

        const product = await Product.create({
            title,
            description,
            category,
            condition,
            location,
            desiredProduct,
            images,
            imageEmbeddings,
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
        const pageNumber = Math.max(parseInt(page) || 1, 1);

        const limitNumber = Math.min(Math.max(parseInt(limit) || 12, 1), 50);

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

            case "title-asc":
                sortOption = { title: 1 };
                break;

            case "title-desc":
                sortOption = { title: -1 };
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

        const totalPages = Math.ceil(totalProducts / limitNumber);

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

        const product = await Product.findById(productId).populate(
            "owner",
            "name avatar location bio",
        );

        if (!product) {
            const error = new Error("Product not found.");
            error.statusCode = 404;
            return next(error);
        }

        // Only count views for active products
        if (product.isActive) {
            product.views += 1;
            await product.save();
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

const classifyProductImage = async (req, res, next) => {
    try {
        if (!req.file) {
            const error = new Error("An image is required for classification.");
            error.statusCode = 400;
            return next(error);
        }

        const classification = await classifyFashionImage(req.file);

        return res.status(200).json({
            success: true,
            data: classification,
        });
    } catch (error) {
        next(error);
    }
};

const visualSearchProducts = async (req, res, next) => {
    try {
        if (!req.file) {
            const error = new Error("A search image is required.");
            error.statusCode = 400;
            return next(error);
        }

        const queryVector = await getImageEmbedding(req.file);
        const limitNumber = Math.min(Math.max(parseInt(req.query.limit) || 12, 1), 50);

        const products = await Product.find({
            isActive: true,
            "imageEmbeddings.0": { $exists: true },
        })
            .select("+imageEmbeddings")
            .populate("owner", "name avatar location");

        const matches = products.map((product) => {
            const scores = product.imageEmbeddings
                .map((embedding) => cosineSimilarity(queryVector, embedding.vector))
                .filter((score) => score !== null);

            if (!scores.length) return null;

            const productData = product.toObject();
            delete productData.imageEmbeddings;

            return {
                product: productData,
                similarity: Math.max(...scores),
            };
        })
            .filter(Boolean)
            .sort((first, second) => second.similarity - first.similarity)
            .slice(0, limitNumber);

        return res.status(200).json({
            success: true,
            data: {
                products: matches.map((match) => ({
                    ...match.product,
                    similarity: match.similarity,
                })),
                pagination: {
                    page: 1,
                    limit: limitNumber,
                    totalProducts: matches.length,
                    totalPages: 1,
                },
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
        } = req.body;

        const product = await Product.findOne({
            _id: productId,
            owner: userId,
            isActive: true,
        });

        if (!product) {
            const error = new Error(
                "Product not found or you are not authorized to update it.",
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

        const previousImages = req.files?.length ? [...product.images] : [];
        if (req.files?.length) {
            const imageVectors = isMlServiceConfigured()
                ? await Promise.all(req.files.map(getImageEmbedding))
                : [];
            const images = await Promise.all(req.files.map((file) => uploadToCloudinary(file, process.env.CLOUDINARY_UPLOAD_FOLDER || "barterx/products")));

            product.images = images;
            product.imageEmbeddings = images.map((imageUrl, index) => ({
                imageUrl,
                vector: imageVectors[index],
            })).filter((embedding) => Array.isArray(embedding.vector));
        }

        await product.save();
        await Promise.allSettled(previousImages.map(deleteFromCloudinary));

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
                "Product not found or you are not authorized to delete it.",
            );

            error.statusCode = 404;
            return next(error);
        }

        product.isActive = false;

        await product.save();
        await Promise.allSettled(product.images.map(deleteFromCloudinary));

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
    classifyProductImage,
    visualSearchProducts,
    updateProduct,
    deleteProduct,
};
