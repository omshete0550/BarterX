const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require('bcrypt');

const Port = process.env.PORT || 8800;
const User = require("./models/user.model.js");

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
    
    const user = await User.findOne({
            email: req.body.email,
            // password: req.body.password
    })
    if(user){
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if(isPasswordValid){
            const token = jwt.sign({
                name: user.name,
                email: user.email
            }, 'secret123')
    
            return res.json({status: 'ok', user: token})
        }
        
    }
    else{
        return res.json({status: 'error', user: false})
    }
    
   

})


// dotenv.config();

// mongoose.set('strictQuery', true);
// const connect = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URL)
//         console.log("Database Connected")
//     } catch (err) {
//         throw err
//     }
// }
// mongoose.connection.on("disconnected", () => {
//     console.log("Database disconnected")
// })

app.listen(Port, () => {
    // connect();
    console.log("Server started on Port " + Port);
});
