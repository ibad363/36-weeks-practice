const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    age: Number
},
// {Collection: "Express"}
)

const User = mongoose.model("User", userSchema)

module.exports = {User}