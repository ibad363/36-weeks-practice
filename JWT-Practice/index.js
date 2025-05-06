// Required libraries import kar rahe hain
const express = require("express")
const jwt = require("jsonwebtoken")

// Server ka port define kar rahe hain
const PORT = 3000
const app = express()

// JSON data ko read karne ke liye middleware
app.use(express.json())

// Sample users ka data - normally ye database mein hota hai
const USERS = [
    {id: 1, email: "ali@gmail.com", password: "1234"},
    {id: 2, email: "sana@gmail.com", password: "5678"},
]

// Login route - user ka email aur password check karta hai
app.post("/login",(req, res)=>{
    const {email, password} = req.body

    // USERS array mein user ko dhoond rahe hain
    const user = USERS.find(user => user.email === email && user.password === password)
    
    // Agar user nahi mila to error return karo
    if (!user) return res.status(401).json({success: false, message: "Invalid Crediantals"})

    // Agar user mil gaya to JWT token generate karo
    const token = jwt.sign(
        {id: user.id, email: user.email},   // Token ke andar user ka data
        "SecretKey",                        // Secret key - isay safe rakhna zaroori hai
        {expiresIn: "1h"}                   // Token 1 ghantay ke liye valid hoga
    )

    // Token response mein bhej rahe hain
    res.json({token: true, token})
})

// Middleware function - is se har request mein token check hoga
function authMiddleware (req, res, next) {
    // Authorization header check kar rahe hain
    const authHeader = req.headers.authorization
    if (!authHeader) return res.status(403).json({message: "No token provided"})

    // Token header se nikal rahe hain
    const token = authHeader.split(" ")[1]

    try {
        // Token verify kar rahe hain
        const decoded = jwt.verify(token, "SecretKey")

        // Agar token sahi hai to user data request mein daal rahe hain
        req.user = decoded

        // Next middleware ya route handler call kar rahe hain
        next()
    } catch (error) {
        // Agar token ghalat ho to error return karo
        return res.status(401).json({message: "Invalid Token"})
    }
}

// Profile route - sirf tab access hoga jab valid token ho
app.get("/profile", authMiddleware, (req, res)=>{
    // Token se milay user data ko return kar rahe hain
    res.json({
        message: "Welcome to your profile",
        user: req.user
    })
})

// Server ko run kar rahe hain
app.listen(PORT, ()=>{
    console.log(`server running on ${PORT}`)
})