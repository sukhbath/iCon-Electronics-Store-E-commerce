import {
    showAlertBox
}
from './alert.js'

async function removeFromCart(id) {
    try {
        var response = await axios.delete(`/api/v1/cart/${id}`);
        window.location.reload()
    } catch (error) {
        showAlertBox(error.response.message, true)
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
        showAlertBox(error.response.data.message, true)
    }
}


async function checkOut() {
    try {
        var response = await axios.get(`/api/v1/cart/checkout`);
        showAlertBox('Successfully Checked Out')
        setTimeout(() => {
            window.location.replace('/mycart')
        }, 3000);
    } catch (error) {
        showAlertBox(error.response.message, true)
    }
}


export {
    removeFromCart,
    addToCart,
    checkOut
}