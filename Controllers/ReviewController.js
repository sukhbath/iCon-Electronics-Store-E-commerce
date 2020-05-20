var ReviewModel = require('../Models/ReviewModel')
var ProductModel = require('../Models/ProductsModel')
var CatchError = require('../Utils/CatchError')
var CustomError = require('../Utils/CustomError')
var CommonController = require('./CommonController')

exports.getOneReview = CommonController.getOneDocument(ReviewModel)
exports.getAllReview = CommonController.getAllDocument(ReviewModel)
exports.createReview = CommonController.createDocument(ReviewModel)




exports.setFilterObj = CatchError(async (request, response, next) => {
    request.filter = {
        product: request.params.productId
    }
    next()
})



exports.setUserId = CatchError(async (request, response, next) => {
    request.body.user = request.user.id
    next()
})