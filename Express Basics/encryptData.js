const crypto = require("crypto");

// secret key and algorithm for encryption
// const secretKey = "mySecretKey12345" // Must be 16 bytes for AES-128
const secretKey = crypto.randomBytes(16) // Must be 16 bytes for AES-128
const algorithm = "aes-128-cbc" // AES algorithm type
const iv = crypto.randomBytes(16) // Initialization vector for AES (for randomness)

const text = "Secret message";

// function to encrypt data
function encrypt(text){
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv)
    let encrypted = cipher.update(text,"utf-8","hex")
    encrypted += cipher.final("hex")
    // return {
    //     encryptedData : encrypted,
    //     iv
    // }
    return {
        encryptedData : encrypted,
        iv: iv.toString("hex")
    }
}

function decrypt(text,ivHex){
    let ivBuffer = Buffer.from(ivHex,"hex")
    const decipher = crypto.createDecipheriv(algorithm, secretKey, ivBuffer)
    // const decipher = crypto.createDecipheriv(algorithm, secretKey, iv)
    let decrypted = decipher.update(text, "hex", "utf-8")
    decrypted += decipher.final("utf-8")
    return decrypted
}

// ▶️ Practice
const encrypted = encrypt(text);
console.log("🔐 Encrypted:", encrypted);
// console.log("🧩 IV:", encrypted.iv);

// const decrypted = decrypt(encrypted.encryptedData);
const decrypted = decrypt(encrypted.encryptedData,encrypted.iv);
console.log("🔓 Decrypted:", decrypted);