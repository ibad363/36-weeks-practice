// import { z } from "zod";
const z = require("zod");
const express = require("express");

const app = express()
const PORT = 3000

// Use express.json() middleware to parse incoming JSON
app.use(express.json())

const userSchema = z.object({
    name: z.string().min(2,"Name must be at least 2 characters long"),
    age: z.number().int().min(18, "Age must be at least 18"),
    email: z.string().email()
})

// example of using Zod for validation
// const data = {
//     name: "Ali",
//     age: 18
// }

// try {
//     userSchema.parse(data)
//     console.log("Data is valid", data)
// }catch (error) {
//     if (error instanceof z.ZodError){
//         console.log("Validation Error: ", error.errors)
//     }else{
//         console.log("Unexpected Error: ", error)
//     }
// }

app.get("/",(req,res)=>{
    res.status(200).send("Zod Practice")
})

// use zod in express
app.post("/register",(req, res)=>{
    try{
        userSchema.parse(req.body)
        // res.status(200).send("User data is valid!")
        res.status(200).json({message: "User Registered Successfully!", success:true})
    }catch (error){
        res.status(500).json({
            success: false,
            message: "Validation Failed",
            errors: error.errors // zod errors
        })
    }
})


app.listen(PORT,()=>{
    console.log("Server is running on port", PORT) 
})


// query schema
const querySchema = z.object({
    limit: z.number().min(1).max(100),
    page: z.number().min(1)
})

app.get("/users",(req,res)=>{

  // Convert query parameters to numbers
  const parsedQuery = {
    limit: parseInt(req.query.limit),
    page: parseInt(req.query.page)
  }
    try {
        querySchema.parse(parsedQuery)
        res.send('Valid query params');
    } catch (error) {
        res.status(500).json({ success: false, errors: error.errors });
    }
})