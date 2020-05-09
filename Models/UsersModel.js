var mongoose = require('mongoose')
var validator = require('validator')
var passwordHash = require("password-hash")
var generator = require('generate-password');
var crypto = require('crypto')

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
        default: true,
        select: false
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
    },
    tempPassword: {
        type: String,
        select: false
    },
    tempPasswordTime: {
        type: Date,
        select: false
    },
    passwordChangedAt: {
        type: Date,
        default: Date.now
    }


})

UserSchema.pre("save", function (next) {
    if (this.isModified('password')) {
        this.password = passwordHash.generate(this.password)
        this.confirmPassword = undefined
        this.passwordChangedAt = Date.now() - 1000
    }
    next()
})





UserSchema.methods.isCorrectPassword = function (userPasword, hashedPaswd) {
    return passwordHash.verify(userPasword, hashedPaswd)
}

UserSchema.methods.hasChangedPassword = function (iat) {
    return ((iat * 1) < this.passwordChangedAt.getTime() / 1000)
}

UserSchema.methods.createTempPassword = function (userPasword, hashedPaswd) {
    var password = generator.generate({
        length: 5,
        numbers: true
    });
    this.tempPassword = crypto.createHash("sha256").update(password).digest('hex')
    this.tempPasswordTime = Date.now() + 10 * 60 * 1000
    return password
}





var userModel = mongoose.model('users', UserSchema)

module.exports = userModel