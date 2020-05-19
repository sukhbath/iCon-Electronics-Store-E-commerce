import {
    showAlertBox
} from './alert.js';


async function addReview(id) {
    var review = document.getElementById('review').value
    var rating = document.getElementById('rating').value

    try {
        var response = await axios.post('/api/v1/reviews', {
            review,
            rating,
            product: id,
        })
        window.location.reload()
    } catch (error) {
        showAlertBox(error.response.data.message, true)

    }
}


export {
    addReview
}