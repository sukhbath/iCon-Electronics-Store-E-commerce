import {
    removeFromCart
} from "./modules/cart.js"

var removeCartProduct = document.getElementById('cart-product-remove-btn')
if (removeCartProduct) {
    removeCartProduct.addEventListener('click', async function (param) {
        var id = document.getElementById('cart-product-remove-btn').dataset.cartProductId
        removeFromCart(id)
    })
}