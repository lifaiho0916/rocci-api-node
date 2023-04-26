const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config({ path: __dirname + '/.env' });

const port = process.env.PORT || 5000

const app = express()
const server = require('http').createServer(app)

app.use(cors({ credentials: true, origin: "*" }))
app.use(express.json())

server.listen(() => {
    console.log(`Server is running on port ${port}`)
})