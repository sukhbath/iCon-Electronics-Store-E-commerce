console.log('sukh')
document.getElementsByTagName("form")[0].addEventListener('submit', e => {
    e.preventDefault()
})
var loginBtn = document.getElementById('login-form')
if (loginBtn) {
    loginBtn.addEventListener('click', async e => {
        var email = document.getElementById('email').value
        var password = document.getElementById('password').value

        try {
            var response = await axios.post('/api/v1/users/login', {
                email,
                password
            })
            alert("successfully logged in")
        } catch (error) {
            alert("error")

        } finally {
            console.log(response)

        }
    })

}



document.getElementsByTagName("form")[0].addEventListener('submit', e => {
    e.preventDefault()
})
var signUpBtn = document.getElementById('signUp-form')
if (signUpBtn) {
    signUpBtn.addEventListener('click', async e => {
        var email = document.getElementById('email').value
        var name = document.getElementById('name').value
        var password = document.getElementById('password').value
        var confirmPassword = document.getElementById('confirmPassword').value

        try {
            var response = await axios.post('/api/v1/users/signup', {
                email,
                name,
                password,
                confirmPassword
            })
            alert("successfully signedup in")
        } catch (error) {
            alert("error")

        } finally {
            console.log(response)

        }
    })

}




document.getElementsByTagName("form")[0].addEventListener('submit', e => {
    e.preventDefault()
})
var addReviewBtn = document.getElementById('addReviewBtn')
if (addReviewBtn) {
    addReviewBtn.addEventListener('click', async e => {
        var review = document.getElementById('reviewInput').value
        var rating = document.getElementById('ratingInput').value
        const productElm = document.querySelector('#getProductId');
        var product = productElm.dataset.pid // "3"
        console.log({
            review,
            rating,
            product
        })

        var response;
        try {
            response = await axios.post('/api/v1/reviews', {
                review,
                rating,
                product
            })
            alert("successfully signedup in")
        } catch (error) {
            alert("error")

        } finally {
            console.log(response)

        }
    })

}