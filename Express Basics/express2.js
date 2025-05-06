const express = require("express")
const cors = require("cors")
const app = express()
const PORT = 3000

app.use(express.json())
app.use(cors()) // ✅ allow all origins

app.get("/api/message",(req,res)=>{
    res.json({message: "Hello from Backend!"})
})

app.post("/api/data",(req, res)=>{
    console.log(req.body)
    res.json({success: true, received: req.body})
})

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})