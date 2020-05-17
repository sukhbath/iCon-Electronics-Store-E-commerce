import {
    signup
} from './modules/signup.js';
document.querySelector('.form.signup').addEventListener('submit', async function (e) {
    e.preventDefault()
    signup()
})