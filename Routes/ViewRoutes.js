var express = require('express')
var ProductModel = require('../Models/ProductsModel')
var ViewController = require('../Controllers/ViewController')

var route = express.Router()

route.route('/').get(ViewController.getAllProducts)
route.route('/product/:slug').get(ViewController.getOneProduct)
route.route('/login').get(ViewController.login)
route.route('/logout').get(ViewController.logout)




module.exports = route