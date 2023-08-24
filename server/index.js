const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const cookieParser = require("cookie-parser");
const cors = require("cors");
const Port = process.env.PORT || 8800;

const app = express();
dotenv.config();

app.listen(Port, () => {
    // connect();
    console.log("Server started on Port " + Port);
});
