var express = require('express')
var path = require('path')
var cookieparser = require('cookie-parser')
var ViewRouter = require('./Routes/ViewRoutes')
var UserRouter = require('./Routes/UserRoutes')
var ReviewRouter = require('./Routes/ReviewRoute')
var ProductsRouter = require('./Routes/ProductsRoute')
var ErrorController = require('./Controllers/ErrorController')

var app = express()
app.use(express.json())
app.use(cookieparser())

app.use(express.static(`${__dirname}/public/`))
app.set('views', `${__dirname}/Public/views`)
app.set('view engine', 'ejs')

app.use('/', ViewRouter)

app.use('/api/v1/users', UserRouter)
app.use('/api/v1/products', ProductsRouter)
app.use('/api/v1/reviews', ReviewRouter)

app.use(ErrorController)












var livereload = require('livereload').createServer({
    exts: ['js', 'css', 'ejs']
});
livereload.watch(`${__dirname}/public/views`);
livereload.watch(`${__dirname}/public`);





module.exports = app