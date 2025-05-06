// without mongoose data send to db
const {MongoClient} = require("mongodb")

const uri = "mongodb+srv://<USERNAME>:<PASS>@<CLUSTERNAME>.ergw6sj.mongodb.net/?retryWrites=true&w=majority&appName=test-cluster"

const client = new MongoClient(uri)


async function run() {
    id = 0
    try{
        await client.connect()
        console.log("MongoDB Connected!")

        const database = client.db("Test-DB")
        const users = database.collection("Express")
        const result = await users.insertOne({
            name: "Ali",
            email: "ali@gmail.com"
        })

        console.log("Inserted" , result.insertedId)
    }catch(err){
        console.log(err)
    }finally{
        await client.close()
    }
}

run()