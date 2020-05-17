var ProductModel = require('../Models/ProductsModel')
var UserModel = require('../Models/UsersModel')
var CartModel = require('../Models/CartModel')

exports.indexPage = async function (request, response, next) {
    var products = await ProductModel.find()
    response.render("index", {
        products
    })
}



exports.getAllProducts = async function (request, response, next) {
    var products = await ProductModel.find()
    response.render("shop", {
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


exports.signup = async function (request, response, next) {
    response.render("signup")

}




exports.me = async function (request, response, next) {
    var me = await UserModel.findById(request.user.id)
    response.render('me', {
        me
    })
}

exports.forgetPassword = async function (request, response, next) {
    // var me = await UserModel.findById(request.user.id)
    // response.render('forgetPassword', {
    //     me
    // })
}

exports.updateMe = async function (request, response, next) {
    var me = await UserModel.findByIdAndUpdate(request.user.id, request.body)
    response.render('me', {
        me
    })
}




exports.getAllCartProducts = async function (request, response, next) {
    var cartProducts = await CartModel.find().populate({
        path: "product",
        select: "name coverImage slug",
    })
    response.render('mycart', {
        cartProducts
    })
}