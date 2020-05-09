var express = require('express')
var UserController = require('../Controllers/UserController')
var AuthController = require('../Controllers/AuthController')

var router = express.Router()

router.post('/signup', AuthController.signup)
router.post('/login', AuthController.login)
router.post('/updatePassword', AuthController.updatePassword)






router.route("/").get(UserController.getAllUsers).post(UserController.createUser)
router.route("/:id").get(UserController.getOneUser).patch(UserController.updateUser).delete(UserController.deleteUser)




module.exports = router