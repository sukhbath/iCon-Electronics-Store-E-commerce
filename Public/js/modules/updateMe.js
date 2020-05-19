import {
    showAlertBox
} from './alert.js';
async function updateMe() {
    var name = document.querySelector('#updateMe-form #name').value
    var email = document.querySelector('#updateMe-form #email').value
    var photo = document.querySelector('#updateMe-form #image-input').files[0]

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


export {
    updateMe
}