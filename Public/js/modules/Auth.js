import {
    showAlertBox
} from './alert.js';

async function login() {
    var email = $('.form.login #email').val();
    var password = $('.form.login #password').val();

    try {
        var response = await axios.post('/api/v1/users/login', {
            email,
            password
        })
        showAlertBox('Successfully logged in')
        setTimeout(() => {
            window.location.replace('/shop')
        }, 2000);
    } catch (error) {
        showAlertBox(error.response.data.message, true)
    }
}

async function logOut() {
    try {
        var response = await axios.get('/api/v1/users/logout')
        console.log(response)
        showAlertBox('Logged Out')
        setTimeout(() => {
            window.location.replace('/')
        }, 2000);
    } catch (error) {
        console.log(error.response)
    }
}


async function signup() {
    var name = $('.form.signup #name').val()
    var email = $('.form.signup #email').val()
    var password = $('.form.signup #password').val()
    var confirmPassword = $('.form.signup #confirmPassword').val()
    var photo = $('.form.signup #image-input').prop('files')[0];
    // ('.form.signup #image-input').files[0]

    let form = new FormData()

    form.append("name", name)
    form.append("email", email)
    form.append("password", password)
    form.append("confirmPassword", confirmPassword)
    form.append("photo", photo)

    try {
        var response = await axios.post('/api/v1/users/signup', form)
        showAlertBox('Account created successfuly')
        setTimeout(v => {
            window.location.replace('/shop')
        }, 1500)
    } catch (error) {
        showAlertBox(error.response.data.message, true)
    }
}

async function updateMe() {
    var name = $('#updateMe-form #name').val()
    var email = $('#updateMe-form #email').val()
    var photo = $('#updateMe-form #image-input').prop('files')[0]

    let form = new FormData()

    form.append("name", name)
    form.append("email", email)
    form.append("photo", photo)

    try {
        var response = await axios.post('/api/v1/users/updateMe', form)
        showAlertBox(response.data.message)
        console.log(response)
        setTimeout(v => {
            window.location.replace('/me')
        }, 1500)
    } catch (error) {
        showAlertBox(error.response.data.message, true)
        console.log(error.response)
    }
}


async function updatePassword() {
    var oldPassword = $('#updatePassword-form #oldPassword').val()
    var password = $('#updatePassword-form #password').val()
    var confirmPassword = $('#updatePassword-form #confirmPassword').val()

    console.log({
        oldPassword,
        password,
        confirmPassword
    })

    try {
        var response = await axios.post('/api/v1/users/updatePassword', {
            oldPassword,
            password,
            confirmPassword
        })
        showAlertBox(response.data.message)
        console.log(response)
        setTimeout(v => {
            // window.location.replace('/me')
        }, 1500)
    } catch (error) {
        showAlertBox(error.response.data.message, true)
        console.log(error.response)
    }
}


export {
    updateMe,
    logOut,
    signup,
    login,
    updatePassword
}