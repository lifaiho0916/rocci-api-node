const jwt = require("jsonwebtoken")
const User = require("../models/User")
const { customResourceResponse } = require("../utils/constants")

const verifyToken = (req, res, next) => {
  const token = req.headers['Authorization']
  if (token == null) {
    response.message = customResourceResponse.reqValidationError.message
    response.statusCode = customResourceResponse.reqValidationError.statusCode
    return response
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      response.message = customResourceResponse.reqValidationError.message
      response.statusCode = customResourceResponse.reqValidationError.statusCode
      return response
    }
    const user = await User.findOne({ _id: decoded._id })
    req.user = user
    next()
  })
}

module.exports = { verifyToken }