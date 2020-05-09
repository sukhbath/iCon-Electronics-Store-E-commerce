var mongoose = require('mongoose')

var ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Must provide product name!"],
        unique: true
    },
    coverImage: {
        type: String,
        required: [true, "Must provide cover image of product !"],
    },
    price: {
        type: Number,
        required: [true, "Please provide product price"],
    },
    summary: {
        type: String,
    },
    images: [String],
    discount: {
        type: Number,
        validate: {
            validator: function (discount) {
                return (this.price > discount)
            },
        },
        message: 'discount can not be more than actual price'
    }

})

var ProductModel = mongoose.model('products', ProductSchema)

module.exports = ProductModel