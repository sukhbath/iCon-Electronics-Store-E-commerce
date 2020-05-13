var express = require('express')
var ProductController = require("../Controllers/ProductsController")
var ReviewtController = require("../Controllers/ReviewController")
var AuthController = require("../Controllers/AuthController")
var ReviewRoute = require("../Routes/ReviewRoute")

var router = express.Router()

router.route('/').get(ProductController.getAllProducts).post(ProductController.createProduct)
router.route('/:id').get(AuthController.protect, ProductController.getOneProduct)


router.route('/:tourId/reviews').get(ReviewtController.getAllReviewForTour)


module.exports = router