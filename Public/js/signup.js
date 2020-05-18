import {
    signup
} from './modules/signup.js';
document.querySelector('.form.signup').addEventListener('submit', async function (e) {
    e.preventDefault()
    signup()
})


document.getElementById('image-input').addEventListener('change', function (e) {
    if (e.target.files) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('selected-image').setAttribute('src', e.target.result)
        };

        reader.readAsDataURL(e.target.files[0]);
    }
})