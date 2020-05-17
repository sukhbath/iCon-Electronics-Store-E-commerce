import {
    showAlertBox
} from './alert.js';

async function logOut() {
    try {
        var response = await axios.get('/api/v1/users/logout')
        console.log(response)
        showAlertBox('Logged Out')
        setTimeout(() => {
            window.location.replace('/')
        }, 2000);
    } catch (error) {
        console.log(error.response)
    }
}

export {
    logOut
}