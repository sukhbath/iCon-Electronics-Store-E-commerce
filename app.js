var express = require('express')
var mongoose = require('mongoose')
var dotenv = require('dotenv')
var UserRouter = require('./Routes/UserRoutes')
var CatchError = require('./Utils/CatchError')
var UserModel = require('./Models/UsersModel')
var UserController = require('./Controllers/UserController')
var ErrorController = require('./Controllers/ErrorController')

dotenv.config({
    path: `${__dirname}/config.env`
})

var app = express()

app.use(express.json())


mongoose.connect(process.env.DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(v => {
    console.log('-------------------------------------')
    console.log(':::::::::::db connected::::::::::::::')
    console.log('-------------------------------------')

}).catch(error => {
    console.log(error)
})





app.use('/api/v1/users', UserRouter)





app.use(ErrorController)


app.listen(3000, v => {
    console.log('Server is running on port 3000')
})