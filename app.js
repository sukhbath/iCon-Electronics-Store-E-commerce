var express = require('express')
var mongoose = require('mongoose')
var dotenv = require('dotenv')
var UserModel = require('./Models/Users')

dotenv.config({
    path: `${__dirname}/config.env`
})

var app = express()

app.use(express.json())


mongoose.connect(process.env.DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(v => {
    console.log('db connected')
}).catch(error => {
    console.log(error)
})


app.post('/api/v1/users', async function (request, response, next) {

    try {
        var newUser = await UserModel.create(request.body)
        response.send(newUser)
    } catch (error) {
        next(error)
    }

})

app.use((error, request, response, next) => {
    if (error.code == 11000) {
        response.send(error)
    }
    response.send(error)

})


app.listen(3000, v => {
    console.log('Server is running on port 3000')
})