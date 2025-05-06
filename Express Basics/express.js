const express = require("express")
const app = express()
const PORT = 3000

app.use(express.json())

// Global Middleware
app.use((req,res,next)=>{
    console.log("Request Received at: ",new Date())
    next()
    // res.end("Ibad")
})


app.use("/about",(req,res,next)=>{
    console.log("Request Received at: ",new Date())
    next()
    // res.end("Ibad")
})

app.get("/", (req, res)=>{
    res.send([{
        "name":"Ibad"
    },
"Welcome to Home Page!"])
})
app.get("/error",(req,res, next)=>{
    next(new Error("This is an custom error"))
    // throw new Error("This is an custom error")
})

// Global Error Middleware in Express
app.use((error, req,res, next)=>{
    console.error(error.stack)
    res.status(500).json(
        {
            success :false,
            message : error.message
        }
    )
})


// About Route
app.get('/about', (req, res) => {
    res.send('This is the About Page');
});

  
app.get("/contact",((req, res)=>{
    const {name, message} = req.query
    res.send(`Thank you ${name}, we got your ${message} `)
}))

app.post('/submit', (req, res) => {
    const { name, age } = req.body;
    res.send(`Received data: Name - ${name}, Age - ${age}`);
});

// Uncaught Exception Catch
process.on("uncaughtException",(error)=>{
    console.error("uncaughtException",error.message)
    process.exit(1)
})
// nonExistentFunction(); // Uncaught Exception test

// Unhandled Rejection Catch
process.on("unhandledRejection",(error)=>{
    console.error("unhandledRejection",error.message)
    process.exit(1)
})

async function someAsyncFunction () {
    Promise.reject(new Error("Promise rejected but not caught!"))
}
someAsyncFunction()

app.listen(PORT,()=>{
    console.log("Server running on http://localhost:3000")
})