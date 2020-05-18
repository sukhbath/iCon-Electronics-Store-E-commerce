import {
    showAlertBox
} from './alert.js';

async function login() {
    var email = document.querySelector('.form.login #email').value
    var password = document.querySelector('.form.login #password').value
    var response;
    try {
        response = await axios.post('/api/v1/users/login', {
            email,
            password
        })
        showAlertBox('Successfully logged in', false)
        setTimeout(() => {
            window.location.replace('/')
        }, 2000);
    } catch (error) {
        showAlertBox(error.response.data.message)
    }
}

export {
    login
}