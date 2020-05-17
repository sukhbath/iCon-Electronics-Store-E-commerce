var express = require('express')
var ProductModel = require('../Models/ProductsModel')
var ViewController = require('../Controllers/ViewController')
var AuthController = require('../Controllers/AuthController')

var route = express.Router()

route.use(AuthController.isLoggedIn)


route.route('/').get(ViewController.indexPage)
route.route('/shop').get(ViewController.getAllProducts)
route.route('/product/:slug').get( /*AuthController.protect,*/ ViewController.getOneProduct)
route.route('/login').get(ViewController.login)
route.route('/logout').get(ViewController.logout)
route.route('/signup').get(ViewController.signup)
route.route('/updateMe').post(ViewController.updateMe)

route.route('/me').get(AuthController.protect, ViewController.me)




module.exports = route