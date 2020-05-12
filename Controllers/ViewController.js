var ProductModel = require('../Models/ProductsModel')

exports.getAllProducts = async function (request, response, next) {
    var products = await ProductModel.find()
    response.render("index", {
        products
    })
}


exports.getOneProduct = async function (request, response, next) {
    var product = await ProductModel.findOne({
        slug: request.params.slug
    }).populate('reviews')
    console.log(product)
    response.render("product", {
        product
    })
}



exports.login = async function (request, response, next) {
    response.render("login")
}


exports.logout = async function (request, response, next) {
    response.render("login")
}