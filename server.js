const express = require('express')
const redis = require('redis')

const util = require('util')
const redisUrl = "redis://127.0.0.1:6379"
const client = redis.createClient(redisUrl)

const app = express()
app.use(express.json()) //middleware that parses the req.body 

client.set = util.promisify(client.set)
client.get = util.promisify(client.get)


app.post("/", async (req, res) => {
    const { key, value } = req.body;
    // await client.connect()
    const response = await client.set(key, value)
    res.json(response)
})

// once post executes we should have this obj : assuming this as database 
// {
//     post: "the course is cool"
// }

app.get('/', async (req, res) => {
    const { key } = req.body;
    const value = await client.get(key)
    res.json(value);
});
app.listen(8080, (req, res) => {
    console.log('listening on port 8080')
})

