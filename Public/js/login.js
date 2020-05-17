document.querySelector('.form.login').addEventListener('submit', async function (e) {
    e.preventDefault()
    var email = document.querySelector('.form.login #email').value
    var password = document.querySelector('.form.login #password').value
    var response;
    try {
        response = await axios.post('/api/v1/users/login', {
            email,
            password
        })
        alert('Successfully logged in')
    } catch (error) {
        console.log(response)
    }
})