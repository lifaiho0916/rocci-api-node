const express = require("express")
const router = express.Router()
const discountController = require("../controllers/discountController")
const { verifyToken } = require("../middleware/verifyToken")

router.post("/add", verifyToken, discountController.addDiscount)
router.put("/:id", verifyToken, discountController.updateDiscountById)
router.get("/:id", verifyToken, discountController.getDiscountById)
router.post("/enable/:id", verifyToken, discountController.enableDiscount)
router.post("/disable/:id", verifyToken, discountController.disableDiscount)
router.delete("/:id", verifyToken, discountController.deleteDiscountById)

module.exports = router