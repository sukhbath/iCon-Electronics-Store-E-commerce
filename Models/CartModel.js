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

CartSchema.post('find', function (docs, next) {
    var totalPrice = 0
    docs.forEach(element => {
        totalPrice += element.product.price
    });

    docs.totalPrice = totalPrice
    next()
})



CartSchema.pre(/^find/, function (next) {
    this.populate({
        path: "product",
        select: "name slug coverImage price"
    })
    next()
})


var CartModel = mongoose.model('Carts', CartSchema)

module.exports = CartModel