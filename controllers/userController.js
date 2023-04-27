const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { customResourceResponse, expiresIn } = require("../utils/constants")

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })
    if (user) {
      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        return res
          .status(customResourceResponse.recordNotFound.statusCode)
          .json({ message: customResourceResponse.recordNotFound.message })
      }

      const payload = {
        id: user._id,
        email: user.email
      }

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: expiresIn },
        (err, token) => {
          if (err) {
            return res
              .status(customResourceResponse.serverError.statusCode)
              .json({ message: customResourceResponse.serverError.message })
          }

          User.findByIdAndUpdate(user._id, { last_login: new Date() })
            .then(() => {
              return res.status(200).json({ token: token, user: user })
            }).catch((err) => {
              return res
                .status(customResourceResponse.serverError.statusCode)
                .json({ message: customResourceResponse.serverError.message })
            })
        }
      )
    } else {
      return res
        .status(customResourceResponse.recordNotFound.statusCode)
        .json({ message: customResourceResponse.recordNotFound.message })
    }

  } catch (err) {
    return res
      .status(customResourceResponse.serverError.statusCode)
      .json({ message: customResourceResponse.serverError.message })
  }
}

exports.addUser = async (req, res) => {
  try {
    const {
      name,
      surname,
      email,
      password,
      privacy,
      privacyNewsLetter,
      devices,
    } = req.body

    if (
      !name ||
      !surname ||
      !email ||
      !password ||
      !privacy ||
      !privacyNewsLetter ||
      !devices
    ) {
      return response
        .status(customResourceResponse.reqValidationError.statusCode)
        .json({ message: customResourceResponse.reqValidationError.message })
    }
  } catch (err) {
    return res
      .status(customResourceResponse.serverError.statusCode)
      .json({ message: customResourceResponse.serverError.message })
  }
}