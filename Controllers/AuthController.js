var UserModel = require('../Models/UsersModel')
var CatchError = require('../Utils/CatchError')
var CustomError = require('../Utils/CustomError')
var jwt = require('jsonwebtoken')
var utils = require('util')

exports.signup = CatchError(async (request, response, next) => {
    var user = await UserModel.create(request.body)
    var token = jwt.sign({
        id: user.id
    }, process.env.SALT, {
        expiresIn: "30d"
    });
    user.password = undefined
    response.cookie('jwt', token)
    response.status(201).send({
        status: "success",
        message: "User Signed up",
        data: {
            user
        },
        token
    })
})


exports.checkLogedIn = CatchError(async (request, response, next) => {
    var token;
    if (request.headers.authorization && request.headers.authorization.startsWith("Bearer")) {
        token = request.headers.authorization.split(" ")[1]
    }

    if (!token) return next("Please login to get access🔑", 401)

    var varify = utils.promisify(jwt.verify)
    var data = await varify(token, process.env.SALT)

    var user = await UserModel.findById(data.id)
    if (!user) return next("This user does'nt exist now.🔑", 401)

    // change password


    next()
})



exports.updatePassword = CatchError(async (request, response, next) => {

})


exports.login = CatchError(async (request, response, next) => {
    var {
        email,
        password
    } = request.body


})