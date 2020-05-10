var ProductModel = require('../Models/ProductsModel')
var CatchError = require('../Utils/CatchError')

exports.createProduct = CatchError(async (request, response, next) => {
    var product = await ProductModel.create(request.body)
    response.status(201).send({
        status: "success",
        message: "Product Created ✔",
        data: {
            product
        }
    })
})



exports.getOneProduct = CatchError(async function (request, response, next) {
    var Product = await ProductModel.findById(request.params.id).populate("reviews")
    if (!Product) return next(new CustomError('No Product found to', 404))
    response.status(200).send({
        status: "success",
        data: {
            Product
        }
    })
})

exports.getAllProducts = CatchError(async function (request, response, next) {
    var Products = await ProductModel.find()
    response.status(200).send({
        status: "success",
        length: Products.length,
        data: {
            Products
        }
    })
})