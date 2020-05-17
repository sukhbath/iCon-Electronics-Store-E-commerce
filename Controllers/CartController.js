var CartModel = require('../Models/CartModel')
var CatchError = require('../Utils/CatchError')

exports.getAllCartProducts = CatchError(async (request, response, next) => {
    var cartProducts = await CartModel.find()
    response.status(201).send({
        status: "success",
        length: cartProducts.length,
        data: {
            cartProducts
        }
    })
})

exports.addToCart = CatchError(async (request, response, next) => {
    var cartProduct = await CartModel.create(request.body)
    response.status(201).send({
        status: "success",
        message: "Product Added",
        data: {
            cartProduct
        }
    })
})


exports.getOneCartProduct = CatchError(async (request, response, next) => {
    var cartProduct = await CartModel.findById(request.params.id)
    response.status(201).send({
        status: "success",
        data: {
            cartProduct
        }
    })
})


exports.deleteCartProduct = CatchError(async (request, response, next) => {
    var cartProduct = await CartModel.findByIdAndDelete(request.params.id)
    response.status(204).send({
        status: "success",
        data: {
            cartProduct
        }
    })
})