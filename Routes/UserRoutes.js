var express = require('express')
var UserController = require('../Controllers/UserController')
var AuthController = require('../Controllers/AuthController')

var router = express.Router()

router.post('/signup', AuthController.signup)






router.route("/").get(UserController.getAllUsers).post(UserController.createUser)
router.route("/:id").get(UserController.getOneUser).put(UserController.updateUser).delete(UserController.deleteUser)




module.exports = router