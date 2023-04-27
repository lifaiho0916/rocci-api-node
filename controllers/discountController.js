const Discount = require("../models/Discount")
const { customResourceResponse } = require("../utils/constants")

exports.addDiscount = async (req, res) => {
  try {
    const {
      user,
      discount_code,
      valid_from,
      valid_to,
      value,
      isActive,
      isDeleted,
    } = req.body.discount

    if (!discount_code || !valid_from || !valid_to || !value || !isActive) {
      return res
        .status(customResourceResponse.reqValidationError.statusCode)
        .json({ message: customResourceResponse.reqValidationError.message })
    }

    const discount = await Discount.create({
      user,
      discount_code,
      valid_from,
      valid_to,
      value,
      isActive,
      isDeleted
    })

    if (!discount) {
      return res
        .status(customResourceResponse.serverError.statusCode)
        .json({ message: customResourceResponse.serverError.message })
    }

    return res
      .status(customResourceResponse.reqCreated.statusCode)
      .json({ message: customResourceResponse.reqCreated.message, data: discount })
  } catch (err) {
    return res
      .status(customResourceResponse.serverError.statusCode)
      .json({ message: customResourceResponse.serverError.message })
  }
}

exports.getAllDiscounts = async (req, res) => {
  try {
    const discounts = await Discount.find()
    if (!discounts) {
      return res
        .status(customResourceResponse.recordNotFound.statusCode)
        .json({ message: customResourceResponse.recordNotFound.message })
    }

    return res
      .status(customResourceResponse.success.statusCode)
      .json({ message: customResourceResponse.success.message, data: discounts })
  } catch (err) {
    return res
      .status(customResourceResponse.serverError.statusCode)
      .json({ message: customResourceResponse.serverError.message })
  }
}

exports.updateDiscountById = async (req, res) => {
  try {
    const {
      user,
      discount_code,
      valid_from,
      valid_to,
      value,
      isActive,
      isDeleted,
    } = req.body
    const { id } = req.params
    const updatedDiscount = await Discount.findByIdAndUpdate(id, {
      user,
      discount_code,
      valid_from,
      valid_to,
      value,
      isActive,
      isDeleted
    }, { new: true })

    if (!updatedDiscount) {
      return res
        .status(customResourceResponse.recordNotFound.statusCode)
        .json({ message: customResourceResponse.recordNotFound.message })
    }

    return res
      .status(customResourceResponse.success.statusCode)
      .json({ message: customResourceResponse.success.message, data: updatedDiscount })
  } catch (err) {
    return res
      .status(customResourceResponse.serverError.statusCode)
      .json({ message: customResourceResponse.serverError.message })
  }
}

exports.getDiscountById = async (req, res) => {
  try {
    const { id } = req.params
    const discount = await Discount.findById(id)
    if (!discount) {
      return res
        .status(customResourceResponse.recordNotFound.statusCode)
        .json({ message: customResourceResponse.recordNotFound.message })
    }

    return res
      .status(customResourceResponse.success.statusCode)
      .json({ messsage: customResourceResponse.success.message, data: discount })
  } catch (err) {
    return res
      .status(customResourceResponse.serverError.statusCode)
      .json({ message: customResourceResponse.serverError.message })
  }
}

exports.enableDiscount = async (req, res) => {
  try {
    const { id } = req.params

    const updatedDiscount = await Discount.findByIdAndUpdate(id, { isActive: true }, { new: true })
    if (!updatedDiscount) {
      return res
        .status(customResourceResponse.recordNotFound.statusCode)
        .json({ message: customResourceResponse.recordNotFound.message })
    }

    return res
      .status(customResourceResponse.success.statusCode)
      .json({ message: customResourceResponse.success.message })
  } catch (err) {
    return res
      .status(customResourceResponse.serverError.statusCode)
      .json({ message: customResourceResponse.serverError.message })
  }
}

exports.disableDiscount = async (req, res) => {
  try {
    const { id } = req.params

    const updatedDiscount = await Discount.findByIdAndUpdate(id, { isActive: false }, { new: true })
    if (!updatedDiscount) {
      return res
        .status(customResourceResponse.recordNotFound.statusCode)
        .json({ message: customResourceResponse.recordNotFound.message })
    }

    return res
      .status(customResourceResponse.success.statusCode)
      .json({ message: customResourceResponse.success.message })
  } catch (err) {
    return res
      .status(customResourceResponse.serverError.statusCode)
      .json({ message: customResourceResponse.serverError.message })
  }
}

exports.deleteDiscountById = async (req, res) => {
  try {
    const { id } = req.params
    const updatedDiscount = await Discount.findByIdAndUpdate(id, { isDeleted: true }, { new: true })

    if (!updatedDiscount) {
      return res
        .status(customResourceResponse.recordNotFound.statusCode)
        .json({ message: customResourceResponse.recordNotFound.message })
    }

    return res
      .status(customResourceResponse.success.statusCode)
      .json({ message: customResourceResponse.success.message, data: updatedDiscount })
  } catch (err) {
    return res
      .status(customResourceResponse.serverError.statusCode)
      .json({ message: customResourceResponse.serverError.message })
  }
}