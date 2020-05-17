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



export {
    removeFromCart
}