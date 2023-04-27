const express = require("express")
const router = express.Router()
const { verifyToken } = require("../middleware/verifyToken")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const { customResourceResponse } = require("../utils/constants")

router.post('/paymentIntents', async (req, res) => {
  try {
    const { amount } = req.body
    if (!amount) return res.status(403).json({ message: "Missing the amount!" })

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "eur"
    })

    const clientSecret = paymentIntent.client_secret
    if (!clientSecret) return res.status(302)
    return res.status(200).json(clientSecret)
  } catch (err) {
    return res
      .status(customResourceResponse.serverError.statusCode)
      .json({ message: customResourceResponse.serverError.message })
  }
})

module.exports = router