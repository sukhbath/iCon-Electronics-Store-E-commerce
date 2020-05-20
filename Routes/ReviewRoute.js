var express = require('express')
var AuthController = require('../Controllers/AuthController')
var ReviewController = require('../Controllers/ReviewController')


var route = express.Router({
    mergeParams: true
})

route.use(AuthController.protect)

route.route('/')
    .get(ReviewController.setFilterObj, ReviewController.getAllReview)
    .post(ReviewController.setUserId, ReviewController.createReview)

route
    .route('/:id').get(ReviewController.getOneReview)

module.exports = route