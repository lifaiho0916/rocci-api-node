const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const http = require("http")
const dotenv = require("dotenv")
const router = require("./routes/index")

dotenv.config({ path: __dirname + "/.env" })

const port = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI

const app = express()
const server = http.createServer(app)

app.use(cors({ credentials: true, origin: "*" }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(router)

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('db connected')
  }).catch(err => console.log(err))

server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})