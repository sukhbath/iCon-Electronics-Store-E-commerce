var mongoose = require('mongoose')
var validator = require('validator')

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

    }

})

var userModel = mongoose.model('users', UserSchema)

module.exports = userModel