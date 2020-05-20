var dotenv = require('dotenv')
var app = require('./app')
var mongoose = require('mongoose')

dotenv.config({
    path: `${__dirname}/config.env`
})


mongoose.connect(process.env.DB_URL, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(v => {
    console.log('-------------------------------------')
    console.log(':::::::::::db connected::::::::::::::')
    console.log('-------------------------------------')

}).catch(error => {
    console.log(error)
})


app.listen(process.env.PORT || 3000, v => {
    console.log('Server is running on port 3000')

})