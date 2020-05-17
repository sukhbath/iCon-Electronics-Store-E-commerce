document.querySelector(".logout-btn").addEventListener('click', async function (e) {
    try {
        var response = await axios.get('/api/v1/users/logout')
        console.log(response)
        window.location.replace('/')
    } catch (error) {
        console.log(error.response)

    }
})