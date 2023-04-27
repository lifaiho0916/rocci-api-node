const { customResourceResponse } = require("../utils/constants")

exports.getMeanByLemma = async (req, res) => {
  try {
    const { lemma } = req.params
  } catch (err) {
    return res
      .status(customResourceResponse.serverError.statusCode)
      .json({ message: customResourceResponse.serverError.message })
  }
}

exports.getSuggByLemma = async (req, res) => {
  try {
    const { lemma } = req.params
  } catch (err) {
    return res
      .status(customResourceResponse.serverError.statusCode)
      .json({ message: customResourceResponse.serverError.message })
  }
}