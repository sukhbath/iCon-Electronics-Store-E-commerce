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
    var review = await ReviewModel.create(request.body)
    response.status(201).send({
        status: "success",
        data: {
            review
        }
    })

})



exports.updateReview = CatchError(async (request, response, next) => {
    var review = await ReviewModel.findByIdAndUpdate(request.params.id, request.body, {
        new: true
    })
    console.log('here')

    updateProduct(review.product.id)

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




// 

async function updateProduct(productId) {
    var result = await ReviewModel.aggregate([{
            $match: {
                "product": productId
            }
        },
        {
            $group: {
                _id: "$product",
                avgRating: {
                    $avg: '$rating'
                },
                totalRating: {
                    $sum: 1
                }

            }
        }
    ])

    var product = await ProductModel.findByIdAndUpdate(productId, {
        avgRating: result[0].avgRating,
        qtyRatings: result[0].totalRating
    })


    console.log("product")
    console.log(product)
}