var express = require('express')
var AuthController = require('../Controllers/AuthController')
var ReviewController = require('../Controllers/ReviewController')

var route = express.Router()

route.use(AuthController.protect)

route.route('/').get(ReviewController.getAllReviewForTour)
route.route('/').get(ReviewController.getAllReview).post(ReviewController.createReview)

route.route('/:id').get(ReviewController.getOneReview).patch(ReviewController.updateReview).delete(ReviewController.deleteReview)








module.exports = route