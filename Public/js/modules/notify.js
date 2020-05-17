function showNotifyBox(message) {
    var alertBox = document.getElementById('notify-dialog')
    alertBox.textContent = message
    alertBox.style.bottom = "5%"
    setTimeout(() => {
        alertBox.textContent = ''
        alertBox.style.bottom = "-110%"
    }, 2500);
}

export {
    showNotifyBox
}