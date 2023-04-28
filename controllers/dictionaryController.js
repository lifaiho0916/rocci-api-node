const { customResourceResponse } = require("../utils/constants")
const db = require("../db/mysqlDatabase")

exports.getMeanByLemma = async (req, res) => {
  try {
    const { lemma } = req.params
    let query = `SELECT definition_id FROM lemmas WHERE lemma ="${lemma}"`

    db.query(query, (err, result1) => {
      if (err || result1.length === 0) {
        return res
          .status(customResourceResponse.recordNotFound.statusCode)
          .json({ message: customResourceResponse.recordNotFound.message })
      }

      let definition_id = JSON.parse(JSON.stringify(result1))
      let secondQuery = `SELECT text FROM definitions WHERE id =${definition_id[0].definition_id}`

      db.query(secondQuery, (err, result2) => {
        if (err) {
          return res
            .status(customResourceResponse.recordNotFound.statusCode)
            .json({ message: customResourceResponse.recordNotFound.message })
        }
        let text = JSON.parse(JSON.stringify(result2))

        if (!text) {
          return res
            .status(customResourceResponse.recordNotFound.statusCode)
            .json({ message: customResourceResponse.recordNotFound.message })
        }

        return res
          .status(customResourceResponse.success.statusCode)
          .json({ message: customResourceResponse.success.message, data: text })
      });
    })
  } catch (err) {
    return res
      .status(customResourceResponse.serverError.statusCode)
      .json({ message: customResourceResponse.serverError.message })
  }
}

exports.getSuggByLemma = async (req, res) => {
  try {
    const { lemma } = req.params
    let query = `SELECT lemma, LEVENSHTEIN(lemma, '${lemma}') AS word FROM lemmas WHERE lemma LIKE "%${lemma}%" COLLATE utf8mb4_unicode_520_ci ORDER BY word DESC`
    db.query(query, (err, result) => {
      if (err) {
        return res
          .status(customResourceResponse.recordNotFound.statusCode)
          .json({ message: customResourceResponse.recordNotFound.message })
      }

      if (!res) {
        return res
          .status(customResourceResponse.recordNotFound.statusCode)
          .json({ message: customResourceResponse.recordNotFound.message })
      }

      return res
        .status(customResourceResponse.success.statusCode)
        .json({ message: customResourceResponse.success.message, data: JSON.parse(JSON.stringify(result)) })
    })
  } catch (err) {
    return res
      .status(customResourceResponse.serverError.statusCode)
      .json({ message: customResourceResponse.serverError.message })
  }
}