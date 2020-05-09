var UserModel = require('../Models/UsersModel')
var CatchError = require('../Utils/CatchError')
var CustomError = require('../Utils/CustomError')
var jwt = require('jsonwebtoken')
var passordHash = require('password-hash')
var crypto = require('crypto')
var generator = require('generate-password');

function sendToken(user, statusCode, response) {
    var token = jwt.sign({
        id: user.id
    }, process.env.SALT, {
        expiresIn: "30d"
    });
    user.password = undefined
    response.cookie('jwt', token)
    response.status(statusCode).send({
        status: "success",
        message: "User Signed up",
        data: {
            user
        },
        token
    })
}



exports.signup = CatchError(async (request, response, next) => {
    var user = await UserModel.create(request.body)
    sendToken(user, 201, response)
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

    if (!email || !password) return next(new CustomError("Must provide email and password🔐", 400))


    var user = await UserModel.findOne({
        email
    }).select("+password")


    if (!user || !user.isCorrectPassword(password, user.password)) return next(new CustomError("Invalid email & password", 400))

    sendToken(user, 201, response)


})



exports.logout = CatchError(async (request, response, next) => {
    response.cookie("jwt", 'logged out')
    response.send({
        status: "success",
        message: "User Logged Out",
    })
})



exports.forgetPassword = CatchError(async (request, response, next) => {
    var user = await UserModel.findOne({
        email: request.body.email
    })

    if (!user) return next(new CustomError("No assocciate user found❌", 404))

    var tempPassword = user.createTempPassword()
    await user.save({
        validateBeforeSave: false
    })

    response.send({
        status: "success",
        message: "The temperoray password expires in 10 minutes.",
        tempPassword
    })
})



exports.resetPassword = CatchError(async (request, response, next) => {
    var tempPassword = request.params.tempPassword
    var hashedtempPassword = crypto
        .createHash("sha256")
        .update(tempPassword)
        .digest("hex");

    var user = await UserModel.findOne({
        tempPassword: hashedtempPassword,
        tempPasswordTime: {
            $gt: Date.now()
        }
    })

    if (!user) return next(new CustomError("Token invalid or exprired⏰", 404))
    user.password = request.body.password
    user.confirmPassword = request.body.confirmPassword
    user.tempPassword = undefined
    user.tempPasswordTime = undefined

    await user.save()

    sendToken(user, 200, response)


})