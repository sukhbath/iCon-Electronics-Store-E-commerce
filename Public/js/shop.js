import {
    addToCart
} from "./modules/cart.js"

// document.querySelector('.add-to-cart').addEventListener('click', async function (param) {
//     console.log('clicked')
//     var id = document.querySelector('.add-to-cart').dataset.cartProductId
//     console.log(id)
//     addToCart(id)
// })


document.querySelectorAll('.add-to-cart').forEach((element, inedx) => {
    element.addEventListener('click', async function (param) {
        console.log('clicked')
        var id = document.querySelectorAll('.add-to-cart')[inedx].dataset.cartProductId
        console.log(id)
        addToCart(id)
    })
});