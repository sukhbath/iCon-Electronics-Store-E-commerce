var express = require('express')
var UserController = require('../Controllers/UserController')
var AuthController = require('../Controllers/AuthController')
var CartController = require('../Controllers/CartController')
var CartRoute = require('../Routes/CartRoute')
var HandleFiles = require('../Utils/HandleFiles')

var router = express.Router()

router.use(HandleFiles)

router.use('/cart', CartRoute)
router.post('/signup', AuthController.signup)
router.post('/login', AuthController.login)
router.get('/logout', AuthController.logout)
router.post('/forgetPassword', AuthController.forgetPassword)
router.patch('/resetPassword/:tempPassword', AuthController.resetPassword)

router.get('/me', AuthController.protect, UserController.getMe)
router.post('/updateMe', AuthController.protect, AuthController.updateMe)
router.route("/").get(UserController.getAllUsers).post(UserController.createUser)
router.route("/:id").get(UserController.getOneUser).patch(UserController.updateUser).delete(UserController.deleteUser)

module.exports = router