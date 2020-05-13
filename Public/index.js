var signinform = document.getElementById('signin-form')
if (signinform) {
    document.getElementById('signinBtn').addEventListener('click', async function (e) {
        alert("yes")
        var email = document.querySelector('#signin-form #email').value
        var password = document.querySelector('#signin-form #password').value
        try {
            var response = await axios.post('/api/v1/users/login', {
                email,
                password
            })
            alert("Successfully logged in".toUpperCase())

        } catch (error) {

            alert("error")
        }
    })
}