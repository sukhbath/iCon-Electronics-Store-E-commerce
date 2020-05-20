var ProductModel = require('../Models/ProductsModel')
var CatchError = require('../Utils/CatchError')
var CommonController = require('./CommonController')

exports.createProduct = CommonController.createDocument(ProductModel)
exports.getOneProduct = CommonController.getOneDocument(ProductModel)
exports.getAllProducts = CommonController.getAllDocument(ProductModel)