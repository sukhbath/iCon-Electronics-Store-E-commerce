var express = require('express')
var CartRoute = require('../Routes/CartRoute')
var UserController = require('../Controllers/UserController')
var AuthController = require('../Controllers/AuthController')
var CartController = require('../Controllers/CartController')
var HandleFiles = require('../Utils/HandleFiles')
var SetUserId = require("../Utils/SetUserId")

var router = express.Router()

router.use(HandleFiles)

router.post('/signup', AuthController.signup)
router.post('/login', AuthController.login)
router.get('/logout', AuthController.logout)
router.post('/forgetPassword', AuthController.forgetPassword)
router.patch('/resetPassword/:tempPassword', AuthController.resetPassword)


router.route("/").get(UserController.getAllUsers).post(UserController.createUser)
router.route("/:id").get(UserController.getOneUser).patch(UserController.updateUser).delete(UserController.deleteUser)

router.use('/cart', CartRoute)

router.use(AuthController.protect)

router.post('/updatePassword', AuthController.updatePassword)
router.get('/me', SetUserId, UserController.getMe)
router.post('/updateMe', AuthController.updateMe)

module.exports = router