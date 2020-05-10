var express = require('express')
var AuthController = require('../Controllers/AuthController')
var route = express.Router()

route.use(AuthController.checkLogedIn)

route.route('/').post()








module.exports = route