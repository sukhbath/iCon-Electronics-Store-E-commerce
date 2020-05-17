 function showAlertBox(message, error = false) {
     var alertBox = document.getElementById('alert-dialog')
     if (error) {
         alertBox.style.background = '#ec483f'
     }
     alertBox.textContent = message
     alertBox.style.top = "0%"
     setTimeout(() => {
         alertBox.textContent = ''
         alertBox.style.top = "-100%"
     }, 2500);
 }

 export {
     showAlertBox
 }