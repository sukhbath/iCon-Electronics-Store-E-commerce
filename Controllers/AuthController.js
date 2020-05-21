var UserModel = require('../Models/UsersModel')
var CatchError = require('../Utils/CatchError')
var CustomError = require('../Utils/CustomError')
var jwt = require('jsonwebtoken')
var passordHash = require('password-hash')
var crypto = require('crypto')
var utils = require('util')
var SendEmail = require('../Utils/Email')
var generator = require('generate-password');
var Email = require('../Utils/Email')
var email = new Email()
var {
    promisify
} = require('util')

function sendToken(user, statusCode, message, response) {
    var token = jwt.sign({
        id: user.id
    }, process.env.SALT, {
        expiresIn: process.env.JWT_TOKEN_EXPIRE
    });
    user.password = undefined
    response.cookie('jwt', token)
    response.status(statusCode).send({
        status: "success",
        message,
        data: {
            user
        },
        token
    })
}

exports.signup = CatchError(async (request, response, next) => {
    request.body.photo = request.file ? request.file.filename : "default-user.png"
    var user = await UserModel.create(request.body)
    email.sendWelcome(user)
    sendToken(user, 201, "User Signed up", response)
})

exports.login = CatchError(async (request, response, next) => {
    var {
        email,
        password
    } = request.body

    if (!email || !password) return next(new CustomError("Must provide email and password", 400))
    var user = await UserModel.findOne({
        email
    }).select("+password")


    if (!user || !user.isCorrectPassword(password, user.password)) return next(new CustomError("Invalid email or password", 404))

    sendToken(user, 200, "User Logged in", response)
})




exports.logout = CatchError(async (request, response, next) => {
    response.cookie("jwt", 'logged out', {
        expires: new Date(Date.now() + 900000)
    })
    response.send({
        status: "success",
        message: "User Logged Out",
    })
})



exports.protect = CatchError(async (request, response, next) => {
    var token;
    if (request.headers.authorization && request.headers.authorization.startsWith("Bearer")) {
        token = request.headers.authorization.split(" ")[1]
    } else if (request.cookies.jwt) {
        token = request.cookies.jwt
    }

    if (!token) return next(new CustomError("Please login to get access🔑", 401))

    var varify = utils.promisify(jwt.verify)
    var data = await varify(token, process.env.SALT)
    var user = await UserModel.findById(data.id)
    if (!user) return next(new CustomError("This user does'nt exist now.🔑", 401))

    if (user.hasChangedPassword(data.iat)) return next(new CustomError("Password changed, Login again➰", 401))

    request.user = user

    next()
})


exports.isLoggedIn = CatchError(async (request, response, next) => {
    if (request.cookies.jwt) {
        try {
            token = request.cookies.jwt

            var varify = utils.promisify(jwt.verify)
            var data = await varify(token, process.env.SALT)

            var user = await UserModel.findById(data.id)
            if (!user) {
                response.locals.user = null
                return next()
            }

            if (user.hasChangedPassword(data.iat)) {
                response.locals.user = null
                return next()
            }


            response.locals.user = user
            request.user = user
            return next()
        } catch (error) {
            return next()
        }
    }
    next()
})



exports.updatePassword = CatchError(async (request, response, next) => {
    var {
        oldPassword,
        password,
        confirmPassword
    } = request.body

    var user = await UserModel.findById(request.user.id).select('+password')

    if (!user.isCorrectPassword(oldPassword, user.password)) return next(new CustomError("Old password does not match", 400))

    user.password = password;
    user.confirmPassword = confirmPassword
    var user = await user.save()

    email.sendUpdatePassword(user)

    sendToken(user, 201, 'Password has been successfully updated', response)


})


exports.forgetPassword = CatchError(async (request, response, next) => {
    var user = await UserModel.findOne({
        email: request.body.email
    })

    if (!user) return next(new CustomError("No user found", 404))

    var tempPassword = user.createTempPassword()
    await user.save({
        validateBeforeSave: false
    })

    email.sendToken(user, tempPassword)



    response.send({
        status: "success",
        message: "The temperoray password has been sent to your email.",
    })
})



exports.resetPassword = CatchError(async (request, response, next) => {
    var tempPassword = request.body.tempPassword
    var hashedtempPassword = crypto.createHash("sha256")
        .update(tempPassword)
        .digest("hex");


    var user = await UserModel.findOne({
        tempPassword: hashedtempPassword,
        tempPasswordTime: {
            $gt: Date.now()
        }
    })

    if (!user) return next(new CustomError("Token invalid or exprired", 404))
    user.password = request.body.password
    user.confirmPassword = request.body.confirmPassword
    user.tempPassword = undefined
    user.tempPasswordTime = undefined

    var user = await user.save()

    email.sendUpdatePassword(user)

    sendToken(user, 200, "Password has been reset", response)


})


exports.updateMe = CatchError(async (request, response, next) => {

    request.body.photo = request.file ? request.file.filename : request.user.photo

    var user = await UserModel.findByIdAndUpdate(request.user.id, request.body, {
        validateBeforeSave: true,
        new: true
    })

    email.sendUpdateProfile(user)
    response.send({
        status: "success",
        message: "Information updated",
        user
    })
})