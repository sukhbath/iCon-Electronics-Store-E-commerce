var express = require('express')
var cookieparser = require('cookie-parser')
var UserRouter = require('./Routes/UserRoutes')
var ProductsRouter = require('./Routes/ProductsRoute')
var ErrorController = require('./Controllers/ErrorController')

var app = express()
app.use(express.json())
app.use(cookieparser())

app.use('/api/v1/users', UserRouter)
app.use('/api/v1/products', ProductsRouter)

app.use(ErrorController)


module.exports = app