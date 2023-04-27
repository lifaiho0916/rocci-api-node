const express = require('express')
const { verifyToken } = require("../middleware/verifyToken")
const router = express.Router()
const userController = require("../controllers/userController")

const userRouter = require('./user')

router.use('/api/v1/user', userRouter)

router.get('/api/v1/users', verifyToken, userController.getAllUsers)
router.post('/api/v1/portal/signIn', userController.portalSignIn)

module.exports = router