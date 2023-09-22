const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require('bcrypt');

const Port = process.env.PORT || 8800;
const User = require("./models/user.model.js");
const Product = require("./models/product.model.js");

const app = express();
app.use(cors());
app.use(express.json());
const jwt = require("jsonwebtoken");
const mongodburl = 'mongodb+srv://m0hibsayed1393:BarterX@cluster0.hyssrie.mongodb.net/BarterX?retryWrites=true&w=majority';
mongoose.connect(mongodburl);


app.post('/api/register', async (req,res) => {
    console.log(req.body);
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // 10 is the number of salt rounds
    try{
        await User.create({
            name: req.body.name,
            email: req.body.email,
            // password: req.body.password,
            password: hashedPassword,
            pincode: req.body.pincode,
        })
    }catch(err){
        res.json({status:'error', error:'Duplicate Email Found'});
    }
    res.json({status: 'ok'});

})

app.post('/api/login', async (req,res) => {
    // console.log("API has HIT");
    const user = await User.findOne({
            email: req.body.email,
            // password: req.body.password
    })
    if(user){
        console.log("User found")
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if(isPasswordValid){
            const token = jwt.sign({
                name: user.name,
                email: user.email
            }, 'secret123')
    
            return res.json({status: 'ok', user: user._id})
            // res.redirect(`http://localhost:3000/add-product?userid=${user._id}`);
        }
        
    }
    else{
        return res.json({status: 'error', user: false})
    }
})

app.post('/api/publish', async (req,res) => {
    console.log("API HIT");
    try{
        await Product.create({
            prodname: req.body.prodname,
            desc: req.body.desc,
            categ: req.body.categ,
            condn: req.body.condn,
            desprodname: req.body.desprodname,
            postedBy: req.body.userid,
            // estvalue: req.body.estvalue,
            datepurchase: req.body.datepurchase,
            images: req.body.imageURL,
        });
        res.json({status:'success', error:'Product Published'});
    }catch(err){
        res.json({status:'error', error:'Error in product'});
    }
})


app.get('/api/products', async (req, res, next) => {
    try {
      // Fetch all products from your database
      const allProducts = await Product.find();
      res.status(200).json(allProducts);
    } catch (err) {
      next(err);
    }
  });

app.get('/api/products/:categname', async (req, res, next) => {
    try{
        const categname = req.params.categname;
        const categProducts = await Product.find({ category: categname });

        if (!categProducts || categProducts.length === 0) {
            return res.status(404).json({ message: 'No products found in this category.' });
        }

        res.json(categProducts);

    } catch (error) {
        next(error);
    }
})


app.listen(Port, () => {
    // connect();
    console.log("Server started on Port " + Port);
});
