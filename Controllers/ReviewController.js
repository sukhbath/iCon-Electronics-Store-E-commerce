var ReviewModel = require('../Models/ReviewModel')
var ProductModel = require('../Models/ProductsModel')
var CatchError = require('../Utils/CatchError')
var CustomError = require('../Utils/CustomError')


exports.getOneReview = CatchError(async (request, response, next) => {
    var review = await ReviewModel.findById(request.params.id)
    response.status(200).send({
        status: "success",
        data: {
            review
        }
    })

})



exports.getAllReview = CatchError(async (request, response, next) => {
    var reviews = await ReviewModel.find()
    response.status(200).send({
        status: "success",
        length: reviews.length,
        data: {
            reviews
        }
    })

})


exports.getAllReviewForTour = CatchError(async (request, response, next) => {
    var reviews = await ReviewModel.find({
        product: request.params.tourId
    })
    response.status(200).send({
        status: "success",
        length: reviews.length,
        data: {
            reviews
        }
    })

})


exports.createReview = CatchError(async (request, response, next) => {
    request.body.user = request.user.id
    var review = await ReviewModel.create(request.body)
    response.status(201).send({
        status: "success",
        data: {
            review
        }
    })

})



exports.updateReview = CatchError(async (request, response, next) => {

    console.log('here')
    var review = await ReviewModel.findByIdAndUpdate(request.params.id, request.body, {
        new: true
    })



    response.status(200).send({
        status: "success",
        data: {
            review
        }
    })

})




exports.deleteReview = CatchError(async (request, response, next) => {
    var review = await ReviewModel.findByIdAndDelete(request.params.id)
    if (!review) return next(new CustomError('No review found to deleted❌', 404))
    response.status(201).send({
        status: "success",
        data: {
            review
        }
    })

})