const Product = require('../models/Product');

const publishProduct = async (req, res, next) => {
    try {
        const userId = req.user.userId;

        const { title, description, category, condition, location, desiredProduct, images } = req.body;

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
            success: true, message: 'Product published successfully', data: {
                product,
            }
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    publishProduct,
};