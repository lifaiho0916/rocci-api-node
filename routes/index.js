const express = require('express')
const { verifyToken } = require("../middleware/verifyToken")
const router = express.Router()

const userRouter = require('./user')

router.use('/api/v1/user', userRouter)

// router.get('/api/v1/users', verifyToken, )

module.exports = router