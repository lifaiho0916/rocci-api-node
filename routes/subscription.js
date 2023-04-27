const express = require("express")
const router = express.Router()
const subscriptionController = require("../controllers/subscriptionController")
const { verifyToken } = require("../middleware/verifyToken")

router.post("/subscription/add", verifyToken, subscriptionController.addSubscription)
router.get("/subscriptions", verifyToken, subscriptionController.getAllSubscriptions)
router.put("/subscription/:id", verifyToken, subscriptionController.updateSubscriptionById)
router.get("/subscription/:id", verifyToken, subscriptionController.getSubscriptionById)
router.get("/user-subscription/:id", verifyToken, subscriptionController.getSubscriptionByUserId)

module.exports = router