const express = require('express')
const { verifyToken } = require("../middleware/verifyToken")
const router = express.Router()
const userController = require("../controllers/userController")
const discountController = require("../controllers/discountController")
const dictionaryController = require("../controllers/dictionaryController")

const userRouter = require('./user')
const discountRouter = require('./discount')
const subscriptionRouter = require('./subscription')
const stripeRouter = require('./stripe')

router.use('/api/v1/user', userRouter)
router.use('/api/v1/discount', discountRouter)
router.use('/api/v1/subscription', subscriptionRouter)
router.use('/api/v1/stripe', stripeRouter)

router.post('/api/v1/portal/signIn', userController.portalSignIn)
router.get('/api/v1/users', verifyToken, userController.getAllUsers)
router.get("/api/v1/discounts", verifyToken, discountController.getAllDiscounts)
router.get("/api/v1/search/:lemma", verifyToken, dictionaryController.getMeanByLemma)
router.get("/api/v1/sugg/:lemma", verifyToken, dictionaryController.getSuggByLemma)

module.exports = router