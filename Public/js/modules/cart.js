import {
    showAlertBox
}
from './alert.js'

async function removeFromCart(id) {
    try {
        var response = await axios.delete(`/api/v1/cart/${id}`);
        window.location.reload()
    } catch (error) {
        showAlertBox(error.response)
    }
}

async function addToCart(id) {
    try {
        var response = await axios.post(`/api/v1/cart`, {
            product: id
        });
        console.log(response)
        var cartQty = document.getElementById('cart-qty')
        cartQty.textContent = 1 * (cartQty.textContent) + 1
    } catch (error) {
        showAlertBox(error.response.data.message)
    }
}


export {
    removeFromCart,
    addToCart
}