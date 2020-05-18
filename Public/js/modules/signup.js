import {
    showAlertBox
} from './alert.js';
async function signup() {
    var name = document.querySelector('.form.signup #name').value
    var email = document.querySelector('.form.signup #email').value
    var password = document.querySelector('.form.signup #password').value
    var confirmPassword = document.querySelector('.form.signup #confirmPassword').value
    var photo = document.querySelector('.form.signup #image-input').files[0]

    let form = new FormData()

    form.append("name", name)
    form.append("email", email)
    form.append("password", password)
    form.append("confirmPassword", confirmPassword)
    form.append("photo", photo)

    try {
        var response = await axios.post('/api/v1/users/signup', form
            // {
            //     name,
            //     email,
            //     password,
            //     confirmPassword
            // }
        )
        showAlertBox('Account created successfuly')
        setTimeout(v => {
            window.location.replace('/shop')
        }, 1500)
    } catch (error) {
        showAlertBox(error.response.data.message, true)
    }
}


export {
    signup
}