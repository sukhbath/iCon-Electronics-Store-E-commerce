import {
    login
} from "./modules/login.js"



document.querySelector('.form.login').addEventListener('submit', async function (e) {
    e.preventDefault()
    login()
})