import {
    showAlertBox
}
from './modules/alert.js';
document.querySelector('.form#resetPassword-form').addEventListener('submit', async function (e) {
    e.preventDefault()
    var tempPassword = document.querySelector('.form#resetPassword-form #tempPassword').value
    var password = document.querySelector('.form#resetPassword-form #password').value
    var confirmPassword = document.querySelector('.form#resetPassword-form #confirmPassword').value
    console.log(tempPassword, password, confirmPassword)
    var response;
    try {
        response = await axios.patch(`/api/v1/users//resetPassword/${tempPassword}`, {
            password,
            confirmPassword
        })
        console.log(response)
        showAlertBox(response.data.message)
        window.location.reload('/me')
    } catch (error) {
        console.log(error.response)
        showAlertBox(error.response.data.message, true)
    }
})