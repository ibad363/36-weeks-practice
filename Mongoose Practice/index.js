const User = require("./Models/user")
require("./db")

// create
async function createUser() {
    const user = await User.create({name: "Ibad", age: 20})
    console.log("User Created: ", user)
}

// createUser()

async function getAllUsers() {
    const users = await User.find()
    console.log("All Users", users)
}

// getAllUsers()

async function getOneUser() {
    const user = await User.findOne({name: "Ali"})
    console.log("One User", user)
}

// getOneUser()

async function getUserById(id) {
    const user = await User.findById(id)
    console.log("User by ID: ", user)
}
// getUserById("681a505d7699d9167ff2c210")

async function updateUser() {
    const updated = await User.updateOne({name: "Ibad"},{name: "Arsalan"})
    console.log("Updated User: " , updated)
}
// updateUser()

async function deleteUser() {
    const deleted = await User.deleteOne({name: "Arsalan"})
    console.log("Deleted: ", deleted)
}

deleteUser()