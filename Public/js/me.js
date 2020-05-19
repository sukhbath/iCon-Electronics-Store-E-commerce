import {
    updateMe
} from './modules/updateMe.js';
document.querySelector('#updateMe-form').addEventListener('submit', async function (e) {
    e.preventDefault()
    updateMe()
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