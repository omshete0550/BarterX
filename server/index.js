const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require('bcrypt');
const request = require('request-promise');

const Port = process.env.PORT || 8800;
const User = require("./models/user.model.js");
const Product = require("./models/product.model.js");
const BarterModel = require("./models/Barter.model.js");
const Rating = require("./models/Rating.model.js");
const app = express();
app.use(cors());
app.use(express.json());
const jwt = require("jsonwebtoken");
dotenv.config();

mongoose.connect(process.env.mongodburl);

app.post('/api/register', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // 10 is the number of salt rounds
    try {
        await User.create({
            name: req.body.name,
            email: req.body.email,
            // password: req.body.password,
            password: hashedPassword,
            pincode: req.body.pincode,
        })
    } catch (err) {
        res.json({ status: 'error', error: 'Duplicate Email Found' });
    }
    res.json({ status: 'ok' });

})

app.post('/api/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
        // password: req.body.password
    })
    if (user) {
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (isPasswordValid) {
            const token = jwt.sign({
                name: user.name,
                email: user.email
            }, 'secret123')

            return res.json({ status: 'ok', user: user._id })
            // res.redirect(`http://localhost:3000/add-product?userid=${user._id}`);
        }

    }
    else {
        return res.json({ status: 'error', user: false })
    }
})

app.post('/api/publish', async (req, res) => {
    const savedProduct = new Product({
        postedBy: req.body.postedBy,
        prodname: req.body.prodname,
        desc: req.body.desc,
        categ: req.body.categ,
        condn: req.body.condn,
        desprodname: req.body.desprodname,
        datepurchase: req.body.datepurchase,
        sellerName: req.body.sellerName,
    });
    console.log('1');

    try {

        const imageUrl = req.body.imageURL;
        const flaskApiUrl = 'http://127.0.0.1:5000/calculate_embedding';

        const options = {
            method: 'POST',
            uri: flaskApiUrl,
            body: {
                image_url: imageUrl,
            },
            json: true,
        };

        const embeddingResponse = await request(options);
        console.log(embeddingResponse);
        console.log('2');
        const embedding = embeddingResponse.embedding;
        savedProduct.images.push({ url: imageUrl, embedding: embedding });
        await savedProduct.save();
        console.log('3');
        res.json({ status: 'success', message: 'Product Published' });
    } catch (err) {
        res.json({ status: 'error', error: 'Error in product publishing', details: err });
    }
});
//Find a user
app.get('/api/users/:userId', async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
});
//Get all products
app.get('/api/products', async (req, res, next) => {
    try {
        // Fetch all products from your database
        const allProducts = await Product.find();
        res.status(200).json(allProducts);
    } catch (err) {
        next(err);
    }
});

app.get('/api/products', async (req, res, next) => {
    try {
        const categProducts = await Product.find();

        if (!categProducts || categProducts.length === 0) {
            return res.status(404).json({ message: 'No products found in this category.' });
        }

        res.json(categProducts);

    } catch (error) {
        next(error);
    }
});
app.get('/api/products/:categname', async (req, res, next) => {
    try {
        const categname = req.params.categname;
        const categProducts = await Product.find({ category: categname });

        if (!categProducts || categProducts.length === 0) {
            return res.status(404).json({ message: 'No products found in this category.' });
        }

        res.json(categProducts);

    } catch (error) {
        next(error);
    }
});


app.post('/api/getproduct/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findOne({ _id: productId });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/getproductdetails/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;

        const product = await Product.findOne({ _id: productId });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
);
//Get a user's all product
app.get('/api/myproducts/:userId', async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const product = await Product.find({ postedBy: userId })
        res.status(200).json(product)
    } catch (error) {
        next(error)
    }
})
app.get('/api/num_barter/:userId', async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const products = await Product.find({ postedBy: userId });
        const numberOfProducts = products.length;
        res.status(200).json({ numberOfProducts });
    } catch (error) {
        next(error);
    }
});
//Create a Barter Request
app.post('/api/products/barter', async (req, res, next) => {
    const newBarter = new BarterModel(req.body)
    try {
        const savedBarter = await newBarter.save()
        res.status(201).json(savedBarter)
    } catch (error) {
        next(error)
    }
})
//Get a user's all barter requests
app.get('/api/products/barter/:userId', async (req, res, next) => {
    try {
        const userId = req.params.userId
        const barterRequests = await BarterModel.find({ requester: userId })
        res.status(200).json(barterRequests)
    } catch (error) {
        next(error)
    }
})
//Get length of user's all sucess barter requests
app.get('/api/sucessBarter/:userId', async (req, res, next) => {
    try {
        const userId = req.params.userId
        const barterRequests = await BarterModel.find({ requester: userId, status: "success" })
        const numberOfProducts = barterRequests.length;
        res.status(200).json({ numberOfProducts });
    } catch (error) {
        next(error)
    }
})
//Get a product's all barter requests
app.get('/api/productrequests/:productId', async (req, res, next) => {
    try {
        const productId = req.params.productId
        const product = await BarterModel.find({ desiredItem: productId })
        res.status(200).json(product)
    } catch (error) {
        next(error)
    }
})
//Get a product's all sucess barter requests
app.get('/api/productrequests/:productId', async (req, res, next) => {
    try {
        const productId = req.params.productId
        const product = await BarterModel.find({ desiredItem: productId, status: "success" })
        res.status(200).json(product)
    } catch (error) {
        next(error)
    }
})
//Update a barter request
app.put('/api/products/barter/:barterId', async (req, res, next) => {
    try {
        const barterId = req.params.barterId;
        const updatedBarter = await BarterModel.findByIdAndUpdate(
            barterId,
            { status: req.body.status },
        );
        res.status(200).json(updatedBarter);
    } catch (error) {
        next(error);
    }
});
//Create Rating
app.post('/api/ratings', async (req, res, next) => {
    const newRating = new Rating(req.body)

    try {
        const savedRating = await newRating.save()
        res.status(201).json(savedRating)
    } catch (error) {
        next(error)
    }
})
//Get a product's all ratings
app.get('/api/ratings/:productId', async (req, res, next) => {
    try {
        const productId = req.params.productId
        const ratings = await Rating.find({ product: productId })
        res.status(200).json(ratings)
    } catch (error) {
        next(error)
    }
})

app.listen(Port, () => {
    console.log("Server started on Port " + Port);
});
