import {
    showAlertBox
} from './modules/alert.js';
document.querySelector('.form#forgetPassword-form').addEventListener('submit', async function (e) {
    e.preventDefault()
    var email = document.querySelector('.form#forgetPassword-form #email').value
    var response;
    try {
        response = await axios.post('/api/v1/users/forgetPassword', {
            email
        })
        console.log(response)
    } catch (error) {
        console.log(error.response)
        showAlertBox(error.response.data.message, true)
    }
})