var express = require('express')
var CartController = require("../Controllers/CartController")
var AuthController = require("../Controllers/AuthController")

var router = express.Router({
    mergeParams: true
})

router.use(AuthController.protect)

router.route('/').get(CartController.getAllCartProducts).post(CartController.addToCart)
router.route('/:id').get(CartController.getOneCartProduct).delete(CartController.deleteCartProduct)




module.exports = router