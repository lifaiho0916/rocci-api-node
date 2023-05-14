const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const User = require("../models/User")
const Portal = require("../models/Portal")
const { customResourceResponse, expiresIn, resetPassword } = require("../utils/constants")

exports.portalSignIn = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res
        .status(customResourceResponse.reqValidationError.statusCode)
        .json({ message: customResourceResponse.reqValidationError.message })
    }

    const portal = await Portal.findOne({ email: email.trim().toLowerCase() })
    if (!portal) {
      return res
        .status(customResourceResponse.recordNotFound.statusCode)
        .json({ message: customResourceResponse.recordNotFound.message })
    }

    const match = await bcrypt.compare(password, portal.password)
    if (!match) return res.status(400).json({ message: "Wrong Password" })

    const payload = {
      id: portal._id,
      email: portal.email
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

        Portal.findByIdAndUpdate(portal._id, { last_login: new Date() })
          .then(() => {
            return res.status(200).json({ token: token, user: portal })
          }).catch((err) => {
            return res
              .status(customResourceResponse.serverError.statusCode)
              .json({ message: customResourceResponse.serverError.message })
          })
      }
    )
  } catch (err) {
    return res
      .status(customResourceResponse.serverError.statusCode)
      .json({ message: customResourceResponse.serverError.message })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    console.log(req.body)

    const user = await User.findOne({ email: email.trim().toLowerCase() })
    if (!user) return res.status(400).json({ message: `User doesn't exist` })

    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(400).json({ message: 'Wrong Password' })

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

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
      name,
      surname,
      email: email.trim().toLowerCase(),
      password: hashPassword,
      privacy,
      privacyNewsLetter,
      devices
    })

    if (!user) {
      return res
        .status(customResourceResponse.recordNotFound.statusCode)
        .json({ message: customResourceResponse.recordNotFound.message })
    }

    return res
      .status(customResourceResponse.reqCreated.statusCode)
      .json({ message: customResourceResponse.reqCreated.message, data: user })
  } catch (err) {
    return res
      .status(customResourceResponse.serverError.statusCode)
      .json({ message: customResourceResponse.serverError.message })
  }
}

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)

    if (!user) {
      return res
        .status(customResourceResponse.recordNotFound.statusCode)
        .json({ message: customResourceResponse.recordNotFound.message })

    }

    return res
      .status(customResourceResponse.success.statusCode)
      .json({ message: customResourceResponse.success.message, data: user })
  } catch (err) {
    return res
      .status(customResourceResponse.serverError.statusCode)
      .json({ message: customResourceResponse.serverError.message })
  }
}

exports.updateUserById = async (req, res) => {
  try {
    const { id } = req.params
    const { name, surname, email, privacy, privacyNewsLetter, devices } = req.body
    const updatedUser = await User.findByIdAndUpdate(id, { name, surname, email, privacy, privacyNewsLetter, devices }, { new: true })

    if (!updatedUser) {
      return res
        .status(customResourceResponse.recordNotFound.statusCode)
        .json({ message: customResourceResponse.recordNotFound.message })
    }

    return res
      .status(customResourceResponse.success.statusCode)
      .json({ message: customResourceResponse.success.message, data: updatedUser })
  } catch (err) {
    return res
      .status(customResourceResponse.serverError.statusCode)
      .json({ message: customResourceResponse.serverError.message })
  }
}

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()

    if (!users) {
      return res
        .status(customResourceResponse.recordNotFound.statusCode)
        .json({ message: customResourceResponse.recordNotFound.message })
    }

    return res
      .status(customResourceResponse.success.statusCode)
      .json({ message: customResourceResponse.success.message, data: users })
  } catch {
    return res
      .status(customResourceResponse.serverError.statusCode)
      .json({ message: customResourceResponse.serverError.message })
  }
}

exports.deleteUserById = async (req, res) => {
  try {
    const { id } = req.params
    const deletedUser = await User.findByIdAndDelete(id)

    if (!deletedUser) {
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

exports.changeUserPassword = async (req, res) => {
  try {
    const { id } = req.params
    const { old, newp } = req.body
    let user = await User.findById(id)

    if (!user) {
      return res
        .status(customResourceResponse.recordNotFound.statusCode)
        .json({ message: customResourceResponse.recordNotFound.message })
    }

    const match = await bcrypt.compare(old, user.password)

    if (!match) {
      return res
        .status(customResourceResponse.recordNotFound.statusCode)
        .json({ message: "Il passord usato non era il tuo" })
    }

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(newp, salt)
    await user.save()

    return res
      .status(customResourceResponse.success.statusCode)
      .json({ message: "Il password è stato cambiato", data: user })
  } catch (err) {
    return res
      .status(customResourceResponse.serverError.statusCode)
      .json({ message: customResourceResponse.serverError.message })
  }
}

exports.blockUser = async (req, res) => {
  try {
    const { id } = req.params

    const blockedUser = await User.findByIdAndUpdate(id, { isBlocked: true }, { new: true })
    if (!blockedUser) {
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

exports.unBlockUser = async (req, res) => {
  try {
    const { id } = req.params

    const blockedUser = await User.findByIdAndUpdate(id, { isBlocked: false }, { new: true })
    if (!blockedUser) {
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

exports.resetUserPasswordByEmail = async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email: email.trim().toLowerCase() })

  if (!user) {
    return res
      .status(customResourceResponse.recordNotFound.statusCode)
      .json({ message: customResourceResponse.recordNotFound.message })
  }

  const salt = await bcrypt.genSalt(10)
  const resetNewPassword = await bcrypt.hash(resetPassword, salt)
  const updatedUser = await User.findByIdAndUpdate(user._id, { password: resetNewPassword }, { new: true })

  if (!updatedUser) {
    return res
      .status(customResourceResponse.recordNotFound.statusCode)
      .json({ message: customResourceResponse.recordNotFound.message })
  }

  return res
    .status(customResourceResponse.success.statusCode)
    .json({ message: customResourceResponse.success.message })
}