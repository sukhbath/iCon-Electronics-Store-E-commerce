var mongoose = require('mongoose')
var slugify = require('slugify')

var CartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "users"
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'products'
    },
    quantity: {
        type: Number,
        default: 1
    },
    // price: {
    //     type: Date,
    //     default: Date.now()
    // },
    addedAt: {
        type: Date,
        default: Date.now()
    },

}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
})

CartSchema.index({
    user: 1,
    product: 1
}, {
    unique: true
})


var CartModel = mongoose.model('Carts', CartSchema)

module.exports = CartModel