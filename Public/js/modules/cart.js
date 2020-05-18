import {
    showNotifyBox
}
from './notify.js'
async function removeFromCart(id) {
    try {
        var response = await axios.delete(`/api/v1/cart/${id}`);
        window.location.reload()
    } catch (error) {
        showNotifyBox(error.response)
    }
}

async function addToCart(id) {
    try {
        var response = await axios.post(`/api/v1/cart`, {
            product: id
        });
        console.log(response)

    } catch (error) {

        console.log(error.response)
    }
}


export {
    removeFromCart,
    addToCart
}