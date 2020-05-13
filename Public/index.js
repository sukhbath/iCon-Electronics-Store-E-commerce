document.getElementsByTagName("form")[0].addEventListener('submit', e => {
    e.preventDefault()
})
var loginBtn = document.getElementById('login-form')
if (loginBtn) {
    loginBtn.addEventListener('click', async e => {
        var email = document.getElementById('email').value
        var password = document.getElementById('password').value

        try {
            var response = await axios.post('/api/v1/users/login', {
                email,
                password
            })
            alert("successfully logged in")
        } catch (error) {
            alert("error")

        } finally {
            console.log(response)

        }
    })

}



document.getElementsByTagName("form")[0].addEventListener('submit', e => {
    e.preventDefault()
})
var signUpBtn = document.getElementById('signUp-form')
if (signUpBtn) {
    signUpBtn.addEventListener('click', async e => {
        var email = document.getElementById('email').value
        var name = document.getElementById('name').value
        var password = document.getElementById('password').value
        var confirmPassword = document.getElementById('confirmPassword').value

        try {
            var response = await axios.post('/api/v1/users/signup', {
                email,
                name,
                password,
                confirmPassword
            })
            alert("successfully signedup in")
        } catch (error) {
            alert("error")

        } finally {
            console.log(response)

        }
    })

}