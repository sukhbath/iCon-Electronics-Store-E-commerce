var express = require('express')
var UserController = require('../Controllers/UserController')
var AuthController = require('../Controllers/AuthController')

var router = express.Router()

router.post('/signup', AuthController.signup)
router.post('/login', AuthController.login)
router.get('/logout', AuthController.logout)
router.post('/updatePassword', AuthController.updatePassword)
router.post('/forgetPassword', AuthController.forgetPassword)
router.post('/resetPassword/:tempPassword', AuthController.resetPassword)
// {

// // UserRouter.post('/forgotPassword', AuthController.forgotPassword)
// // UserRouter.patch('/resetPassword/:token', AuthController.resetPassword)


// }


router.route("/").get(UserController.getAllUsers).post(UserController.createUser)
router.route("/:id").get(UserController.getOneUser).patch(UserController.updateUser).delete(UserController.deleteUser)




module.exports = router