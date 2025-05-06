const bcrypt = require("bcryptjs");
const password = "mysecretpassword";

async function hashPassword() {
    const hash = await bcrypt.hash(password, 10); // Hash the password with a cost factor of 10
const match = await bcrypt.compare("password", hash); // Compare the password with the hash

console.log("hash:", hash); // Log the hashed password
console.log("match:", match); // Log whether the password matches the hash
}
hashPassword()