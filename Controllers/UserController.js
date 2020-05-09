var UserModel = require('./../Models/UsersModel')
var CatchError = require('./../Utils/CatchError')
var CustomError = require('./../Utils/CustomError')


exports.createUser = CatchError(async function (request, response, next) {
    var newUser = await UserModel.create(request.body)
    response.status(201).send({
        status: "success",
        message: "User Created ✔",
        data: {
            newUser
        }
    })
})


exports.getOneUser = CatchError(async function (request, response, next) {
    var user = await UserModel.findById(request.params.id)
    if (!user) return next(new CustomError('No user found to', 404))
    response.status(200).send({
        status: "success",
        data: {
            user
        }
    })
})

exports.getAllUsers = CatchError(async function (request, response, next) {
    var users = await UserModel.find()
    response.status(200).send({
        status: "success",
        length: users.length,
        data: {
            users
        }
    })
})


exports.updateUser = CatchError(async function (request, response, next) {
    var updatedUser = await UserModel.findByIdAndUpdate(request.params.id, request.body, {
        new: true
    })
    if (!updatedUser) return next(new CustomError('No user found to updated❌', 404))
    response.status(200).send({
        status: "success",
        data: {
            updatedUser
        }
    })
})


exports.deleteUser = CatchError(async function (request, response, next) {
    var deletedUser = await UserModel.findByIdAndDelete(request.params.id)
    if (!deletedUser) return next(new CustomError('No user found to deleted❌', 404))
    response.status(204).send({
        status: "success",
        data: {
            deletedUser
        }
    })
})