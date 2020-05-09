var express = require('express')
var UserController = require('../Controllers/UserController')

var router = express.Router()

router.route("/").get(UserController.getAllUsers).post(UserController.createUser)
router.route("/:id").get(UserController.getOneUser).put(UserController.updateUser).delete(UserController.deleteUser)




module.exports = router