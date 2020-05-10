var mongoose = require('mongoose')
var slugify = require('slugify')

var ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Must provide product name!"],
        unique: true
    },
    slug: String,
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
        default: "🌝 No summary",
    },
    avgRating: {
        type: Number,
        default: 2.5,
        min: [0, 'Rating must be more than 0,'],
        max: [5, 'Rating must be below 5,']
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


ProductSchema.pre('save', function (next) {
    this.slug = slugify(this.name, {
        lower: true
    })
    next()
})


var ProductModel = mongoose.model('products', ProductSchema)

module.exports = ProductModel