document.querySelector('.add-to-cart').addEventListener('click', async function (param) {
    var id = document.querySelector('.add-to-cart').dataset.cartProductId
    console.log(id)
    try {
        var response = await axios.post(`/api/v1/cart`, {
            product: id
        });
        console.log(response)

    } catch (error) {

        console.log(error.response)
    }
})