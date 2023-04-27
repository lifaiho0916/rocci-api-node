const Subscription = require("../models/Subscription")
const { customResourceResponse } = require("../utils/constants")

exports.addSubscription = async (req, res) => {
  try {
    const {
      user,
      payment_date,
      payment_name,
      payment_surname,
      duration,
      subscription_date,
      cost,
      discount,
      isActive,
      validTill
    } = req.body

    const subscription = await Subscription.create({
      user,
      payment_date,
      payment_name,
      payment_surname,
      duration,
      subscription_date,
      cost,
      discount,
      isActive,
      validTill
    })

    if (!subscription) {
      return res
        .status(customResourceResponse.recordNotFound.statusCode)
        .json({ message: customResourceResponse.recordNotFound.message })
    }

    return res
      .status(customResourceResponse.reqCreated.statusCode)
      .json({ message: customResourceResponse.reqCreated.message, data: subscription })
  } catch (err) {
    return res
      .status(customResourceResponse.serverError.statusCode)
      .json({ message: customResourceResponse.serverError.message })
  }
}

exports.getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find()
    if (!subscriptions) {
      return res
        .status(customResourceResponse.recordNotFound.statusCode)
        .json({ message: customResourceResponse.recordNotFound.message })
    }

    return res
      .status(customResourceResponse.success.statusCode)
      .json({ message: customResourceResponse.success.message, data: subscriptions })
  } catch (err) {
    return res
      .status(customResourceResponse.serverError.statusCode)
      .json({ message: customResourceResponse.serverError.message })
  }
}

exports.updateSubscriptionById = async (req, res) => {
  try {
    const { id } = req.params
    const {
      user,
      payment_date,
      payment_name,
      payment_surname,
      duration,
      subscription_date,
      cost,
      discount,
      isActive,
      validTill
    } = req.body

    const updatedSubscription = await Subscription.findByIdAndUpdate(id, {
      user,
      payment_date,
      payment_name,
      payment_surname,
      duration,
      subscription_date,
      cost,
      discount,
      isActive,
      validTill
    }, { new: true })
    if (!updatedSubscription) {
      return res
        .status(customResourceResponse.recordNotFound.statusCode)
        .json({ message: customResourceResponse.recordNotFound.message })
    }

    return res
      .status(customResourceResponse.success.statusCode)
      .json({ message: customResourceResponse.success.message, data: updatedSubscription })
  } catch (err) {
    return res
      .status(customResourceResponse.serverError.statusCode)
      .json({ message: customResourceResponse.serverError.message })
  }
}

exports.getSubscriptionById = async (req, res) => {
  try {
    const { id } = req.params
    const subscription = await Subscription.findById(id)
    if (!subscription) {
      return res
        .status(customResourceResponse.recordNotFound.statusCode)
        .json({ message: customResourceResponse.recordNotFound.message })
    }

    return res
      .status(customResourceResponse.success.statusCode)
      .json({ message: customResourceResponse.success.message, data: subscription })
  } catch (err) {
    return res
      .status(customResourceResponse.serverError.statusCode)
      .json({ message: customResourceResponse.serverError.message })
  }
}

exports.getSubscriptionByUserId = async (req, res) => {
  try {
    const { id } = req.params
    const subscription = await Subscription.findOne({ user: id })
    if (!subscription) {
      return res
        .status(customResourceResponse.recordNotFound.statusCode)
        .json({ message: customResourceResponse.recordNotFound.message })
    }

    return res
      .status(customResourceResponse.success.statusCode)
      .json({ message: customResourceResponse.success.message, data: subscription })
  } catch (err) {
    return res
      .status(customResourceResponse.serverError.statusCode)
      .json({ message: customResourceResponse.serverError.message })
  }
}