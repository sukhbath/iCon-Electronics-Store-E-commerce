var signinBtn = document.getElementById("signinBtn")
signinBtn.addEventListener('click', async e => {
    var email = document.querySelector("#login-form #email").value
    var password = document.querySelector("#login-form #password").value
    var response = await axios.post('/api/v1/users/login', {
        email,
        password
    })

    alert("logged in successfully".toUpperCase())

})