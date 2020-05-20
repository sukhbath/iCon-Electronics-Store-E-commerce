var express = require('express')
var CartController = require("../Controllers/CartController")
var AuthController = require("../Controllers/AuthController")

var router = express.Router({
    mergeParams: true
})

router.use(AuthController.protect)

router.route('/')
    .get(CartController.setFilterObj, CartController.getUserCart)
    .post(CartController.setUserId, CartController.addToUserCart)

router.get('/checkout', CartController.checkOut)

router.route('/:id')
    .get(CartController.getOneCartProduct)
    .delete(CartController.deleteFromCart)


module.exports = router