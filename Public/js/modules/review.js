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
        console.log(response)
    } catch (error) {
        showAlertBox(error.response.data.message)

    }
}


export {
    addReview
}