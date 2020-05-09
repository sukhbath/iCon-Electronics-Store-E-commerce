var mongoose = require('mongoose')
var validator = require('validator')
var passwordHash = require("password-hash")

var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Users must provide their name!"],
    },
    email: {
        type: String,
        validate: {
            validator: function (email) {
                return validator.isEmail(email);
            },
            message: email => `${email} is invalid email!`
        },
        lowercase: true,
        required: [true, "Users must provide their email!"],
        unique: true,
    },
    photo: {
        type: String,
        default: "default.jpg"
    },
    age: {
        type: Number,
        required: [true, "Users must provide their age!"]
    },
    contact: {
        type: String,
        required: [true, "Users must provide their contact number."]
    },
    active: {
        type: Boolean,
        default: true
    },
    password: {
        type: String,
        required: [true, "Users must provide their password."],
        minlength: 5,
        select: false
    },
    confirmPassword: {
        type: String,
        required: [true, "Users must consfirm their password."],
        select: false,
        validate: {
            validator: function (comfirmPass) {
                return this.password == comfirmPass
            },
            message: "Password not matched."
        }
    }

})

UserSchema.pre("save", function (next) {
    this.password = passwordHash.generate(this.password)
    this.confirmPassword = undefined
    next()
})



UserSchema.methods.isCorrectPassword = function (userPasword, hashedPaswd) {
    return passwordHash.verify(userPasword, hashedPaswd)
}


var userModel = mongoose.model('users', UserSchema)

module.exports = userModel