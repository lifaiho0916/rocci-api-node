const express = require('express')
const { verifyToken } = require("../middleware/verifyToken")
const router = express.Router()
const userController = require("../controllers/userController")
const discountController = require("../controllers/discountController")

const userRouter = require('./user')
const discountRouter = require('./discount')

router.use('/api/v1/user', userRouter)
router.use('/api/v1/discount', discountRouter)

router.post('/api/v1/portal/signIn', userController.portalSignIn)
router.get('/api/v1/users', verifyToken, userController.getAllUsers)
router.get("/api/v1/discounts", verifyToken, discountController.getAllDiscounts);

module.exports = router