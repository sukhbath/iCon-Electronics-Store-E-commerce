import {
    addToCart
} from "./modules/cart.js"


import {
    addReview
} from "./modules/review.js"

document.querySelector('.add-to-cart').addEventListener('click', async function (param) {
    var id = document.querySelector('.add-to-cart').dataset.cartProductId
    console.log(id)
    addToCart(id)
})


document.getElementById('add-review-form').addEventListener('submit', function (e) {
    e.preventDefault()
    var id = document.getElementById('add-review-form').dataset.cartProductId
    addReview(id)
})