document.querySelector('.form.signup').addEventListener('submit', async function (e) {
    e.preventDefault()
    var name = document.querySelector('.form.signup #name').value
    var email = document.querySelector('.form.signup #email').value
    var password = document.querySelector('.form.signup #password').value
    var confirmPassword = document.querySelector('.form.signup #confirmPassword').value
    var response;
    try {
        response = await axios.post('/api/v1/users/signup', {
            name,
            email,
            password,
            confirmPassword
        })
        alert('Successfully logged in')
    } catch (error) {
        console.log(response)
    }
})