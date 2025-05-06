const jwt = require("jsonwebtoken")

const token = jwt.sign({dataYeHe: "dataishere"}, "mySecretKey", {expiresIn: "2h"})
console.log(token)

jwt.verify(token, "mySecretKey", (error, decoded)=>{
    if (error){
        console.log("invalid token")
    }else{
        console.log("valid token")
    }
})