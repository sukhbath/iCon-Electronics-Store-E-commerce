var mongoose = require('mongoose')
var validator = require('validator')

var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Users must provide their name!"]
    },
    email: {
        type: String,
        validate: {
            validator: function (email) {
                return validator.isEmail(email);
            },
            message: email => `${email} is invalid email!`
        },
        required: [true, "Users must provide their email!"],
        unique: true,
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

})

var userModel = mongoose.model('users', UserSchema)

module.exports = userModel