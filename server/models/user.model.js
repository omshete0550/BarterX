const mongoose = require('mongoose')
// const mongoURI = 'mongodb://localhost:8800/BarterX'; // Replace with your MongoDB URI

// mongoose.connect(mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// const db = mongoose.connection;

// db.on('error', (err) => {
//   console.error('MongoDB connection error:', err);
// });

// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// Now you can use the User model to interact with your MongoDB database

const User = new mongoose.Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        pincode: {type: Number, required: true},
        Liked:{
            type: [String]
        }
    },
    {
        collection: 'LoginInterface'
    }
)

const model = mongoose.model('UserData', User)

module.exports = model