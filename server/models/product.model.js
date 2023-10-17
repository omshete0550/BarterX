const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
    prodname: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    categ: {
        type: String,
        // required: true,
    },
    condn: {
        type: String,
        // enum: ['New', 'Used', 'Refurbished'],
        // required: true,
    },
    postedBy: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0
    },
    desprodname: {
        type: String,
        category: String
    },
    estvalue: {
        type: Number,
        // required: true
    },
    datepurchase: {
        type: Date,
    },
    images: [
        {
            embedding: {
                type: [Number],
                required: true,
            },
            url: {
                type: String,
                required: true,
            }
        }
    ],

    tags: [String],

},
    { timestamp: true }
);

// Create the Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
