import {
    showAlertBox
} from './modules/alert.js';

import {
    logOut,
    login,
    signup,
    updateMe,
    updatePassword
} from './modules/Auth.js';


import {
    removeFromCart,
    addToCart,
    checkOut
} from "./modules/cart.js"

import {
    addReview
} from "./modules/review.js"


// logout
var logOutBtn = document.querySelector(".logout-btn")
if (logOutBtn) {
    logOutBtn.addEventListener('click', async function (e) {
        logOut()
    })
}

// login
var loginForm = document.querySelector('.form.login')
if (loginForm) {
    document.querySelector('.form.login').addEventListener('submit', async function (e) {
        e.preventDefault()
        login()
    })
}

// remove from cart
var removeCartProduct = document.querySelectorAll('.cart-product-remove-btn')
if (removeCartProduct) {
    removeCartProduct.forEach(element => {
        element.addEventListener('click', async function (param) {
            var id = element.dataset.cartProductId
            removeFromCart(id)
        })
    });
}

// add to cart from product page
var addToCartDetaiPage = document.querySelector('#detail-wrap .add-to-cart')
if (addToCartDetaiPage) {
    addToCartDetaiPage.addEventListener('click', async function (param) {
        var id = document.querySelector('.add-to-cart').dataset.cartProductId
        addToCart(id)
    })
}


// add to cart from shop page
var addToCartAllProducts = document.querySelectorAll('#all-products .add-to-cart')
if (addToCartAllProducts) {
    addToCartAllProducts.forEach((element, i) => {
        element.addEventListener('click', async function (param) {
            var id = document.querySelectorAll('.add-to-cart')[i].dataset.cartProductId
            addToCart(id)
        })
    });
}
// add review
var addReviewForm = document.getElementById('add-review-form')
if (addReviewForm) {
    addReviewForm.addEventListener('submit', function (e) {
        e.preventDefault()
        var id = addReviewForm.dataset.cartProductId
        addReview(id)
    })
}



// signup user
var signupForm = document.querySelector('.form.signup')
if (signupForm) {
    signupForm.addEventListener('submit', async function (e) {
        e.preventDefault()
        signup()
    })
}

// show selected image
var ImageInput = document.getElementById('image-input')
if (ImageInput) {
    ImageInput.addEventListener('change', function (e) {
        if (e.target.files) {
            var reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById('selected-image').setAttribute('src', e.target.result)
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    })
}


// get token to reset password
var forgetPasswordForm = document.querySelector('.form#forgetPassword-form')
if (forgetPasswordForm) {
    forgetPasswordForm.addEventListener('submit', async function (e) {
        e.preventDefault()
        var email = document.querySelector('.form#forgetPassword-form #email').value
        var response;
        try {
            response = await axios.post('/api/v1/users/forgetPassword', {
                email
            })
            console.log(response)
            showAlertBox(response.data.message)
            setTimeout(() => {
                window.location.replace('/resetPassword')
            }, 3000);

        } catch (error) {
            console.log(error.response)
            showAlertBox(error.response.data.message, true)
        }
    })
}



// reset password using token
var resetPasswordForm = document.querySelector('.form#resetPassword-form')
if (resetPasswordForm) {
    resetPasswordForm.addEventListener('submit', async function (e) {
        e.preventDefault()
        var tempPassword = $('.form#resetPassword-form #tempPassword').val()
        var password = $('.form#resetPassword-form #password').val()
        var confirmPassword = $('.form#resetPassword-form #confirmPassword').val()
        try {
            var response = await axios.patch(`/api/v1/users/resetPassword`, {
                tempPassword,
                password,
                confirmPassword
            })
            console.log(response)
            showAlertBox(response.data.message)
            setTimeout(() => {
                window.location.replace('/me')
            }, 3000);
        } catch (error) {
            console.log(error.response)
            showAlertBox(error.response.data.message, true)
        }
    })
}



// update profile
var updateMeForm = document.querySelector('#updateMe-form')
if (updateMeForm) {
    updateMeForm.addEventListener('submit', async function (e) {
        e.preventDefault()
        updateMe()
    })
}


// update password
var updateMeForm = document.querySelector('#updatePassword-form')
if (updateMeForm) {
    updateMeForm.addEventListener('submit', async function (e) {
        e.preventDefault()
        updatePassword()
    })
}


var checkOutBtn = document.querySelector('#cart-total button')
console.log(checkOutBtn)
if (checkOutBtn) {
    checkOutBtn.addEventListener('click', e => {
        checkOut()
    })
}