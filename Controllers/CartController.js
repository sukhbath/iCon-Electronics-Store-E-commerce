var CartModel = require('../Models/CartModel')
var CatchError = require('../Utils/CatchError')
var CommonController = require('./CommonController')

exports.getOneCartProduct = CommonController.getOneDocument(CartModel)
exports.deleteFromCart = CommonController.deleteDocument(CartModel)
exports.getUserCart = CommonController.getAllDocument(CartModel)
exports.addToUserCart = CommonController.createDocument(CartModel)








exports.setUserId = CatchError(async (request, response, next) => {
    request.body.user = request.user.id
    next()
})


exports.setFilterObj = CatchError(async (request, response, next) => {
    request.filter = {
        user: request.user.id
    }
    next()
})




// CatchError(async (request, response, next) => {
//     var cartProduct = await CartModel.create({
//         user: request.user.id,
//         product: request.body.product
//     })
//     response.status(201).send({
//         status: "success",
//         message: "Product Added",
//         data: {
//             cartProduct
//         }
//     })
// })