var express = require('express')
var ProductModel = require('../Models/ProductsModel')

var route = express.Router()

route.route('/').get(
    async function (request, response, next) {
        var Products = await ProductModel.find()
        response.render("index", {
            Products
        })
    })




module.exports = route