require("dotenv").config()
const mongoose = require('mongoose');

mongoose.connect(process.env.mongoURI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB error:", err));