import {
    showAlertBox
} from './modules/alert.js';

import {
    logOut
} from './modules/logout.js';


var logOutBtn = document.querySelector(".logout-btn")

if (logOutBtn) {
    logOutBtn.addEventListener('click', async function (e) {
        logOut()
    })

}