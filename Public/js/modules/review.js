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
        console.log(error.response)

    }
}


export {
    addReview
}