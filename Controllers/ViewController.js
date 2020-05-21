var ProductModel = require('../Models/ProductsModel')
var UserModel = require('../Models/UsersModel')
var CartModel = require('../Models/CartModel')
var CommonController = require('../Controllers/CommonController')

exports.indexPage = async function (request, response, next) {
    var products = await ProductModel.find()
    response.render("./index", {
        products,
        title: "Welcome to iCon"
    })
}

exports.getAllProducts = async function (request, response, next) {
    var products = await ProductModel.find(request.query)
    response.render("shop", {
        products,
        title: "Shop Best Items"

    })
}

exports.getOneProduct = async function (request, response, next) {
    var product = await ProductModel.findOne({
        slug: request.params.slug
    }).populate('reviews')
    response.render("product", {
        product,
        title: product.name
    })
}



exports.login = async function (request, response, next) {
    response.render("login", {
        title: "Login to Your Account"
    })
}


exports.signup = async function (request, response, next) {
    response.render("signup", {
        title: "Sign in to iCon"
    })

}




exports.me = async function (request, response, next) {
    var me = await UserModel.findById(request.user.id)
    response.render('me', {
        me,
        title: me.name
    })
}


exports.getAllCartProducts = async function (request, response, next) {
    var cartProducts = await CartModel.find({
        user: request.user.id
    }).populate("product")

    response.render('mycart', {
        cartProducts,
        title: "My Products"
    })

}



exports.forgetPassword = async function (request, response, next) {
    sendView(response, "forgetPassword", "Forget Password")
}


exports.resetPassword = async function (request, response, next) {
    sendView(response, "resetPassword", "Reset Password")
}

exports.updatePassword = async function (request, response, next) {
    sendView(response, "updatePassword", "Update Password")
}


function sendView(response, view, title) {
    response.render(view, {
        title
    })
}