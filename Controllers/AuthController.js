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
    next()
})