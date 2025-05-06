require("dotenv").config()
const mongoose = require("mongoose")
const express = require("express")
const { User } = require("./userModel")

const app = express()
app.use(express.json())

app.post("/api/users", async (req,res)=>{
    const userData = req.body
    try {
        const newUser = await User.create(userData)
        console.log("User created")
        res.json({user: newUser})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

app.get("/api/users",(req,res)=>{
    res.send("Server Running")
})

mongoose.connect(process.env.connectionString)
    .then(()=>console.log("MongoDb COnnected"))
    .catch((err)=> console.log(err))

app.listen(3000,()=>{
    console.log("Server Running on 3000")
})