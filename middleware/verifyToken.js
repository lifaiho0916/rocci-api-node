const jwt = require("jsonwebtoken")
const User = require("../models/User")
const { customResourceResponse } = require("../utils/constants")

const verifyToken = (req, res, next) => {
  console.log(req.url)
  let token=null;
  try{
    token = req.headers['authorization'].split(' ')[1]
  }catch(e){
    token=null;
  }
  if (token == null) {
    return res
      .status(customResourceResponse.reqValidationError.statusCode)
      .json({ message: customResourceResponse.reqValidationError.message })
  }
  
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res
        .status(customResourceResponse.reqValidationError.statusCode)
        .json({ message: customResourceResponse.reqValidationError.message })
    }
    const user = await User.findById(decoded.id)
    req.user = user
    next()
  })
}

module.exports = { verifyToken }