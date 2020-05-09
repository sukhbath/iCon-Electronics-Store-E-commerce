var express = require('express')
var ProductController = require("../Controllers/ProductsController")
var AuthController = require("../Controllers/AuthController")

var router = express.Router()

router.route('/').get(ProductController.getAllProducts).post(ProductController.createProduct)
router.route('/:id').get(AuthController.checkLogedIn /*means protect*/ , ProductController.getOneProduct)




module.exports = router