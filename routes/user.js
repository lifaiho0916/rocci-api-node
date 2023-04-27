const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const { verifyToken } = require("../middleware/verifyToken")

router.post("/login", userController.login)
router.post("/add", userController.addUser)
router.get("/:id", verifyToken, userController.getUserById)
router.put("/:id", verifyToken, userController.updateUserById)
router.delete("/:id", verifyToken, userController.deleteUserById)
router.put("/change-password/:id", verifyToken, userController.changeUserPassword)
router.post("/block/:id", verifyToken, userController.blockUser)
router.post("/unblock/:id", verifyToken, userController.unBlockUser)
router.post("/reset-password", userController.resetUserPasswordByEmail)

module.exports = router