var mongoose = require('mongoose')
var slugify = require('slugify')

var ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Must provide product name!"],
        unique: true
    },
    slug: String,
    coverImage: String,
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
        max: [5, 'Rating must be below 5,'],
        set: val => Math.round(val * 10) / 10
    },
    qtyRatings: {
        type: Number,
        default: 1
    },
    images: [String],
    discount: {
        type: Number,
        default: 0,
        validate: {
            validator: function (discount) {
                return (this.price > discount)
            },
        },
        message: 'discount can not be more than actual price'
    }

}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
})


ProductSchema.virtual("reviews", {
    ref: 'reviews',
    foreignField: 'product',
    localField: "_id"
})


ProductSchema.pre('save', function (next) {
    this.slug = slugify(this.name, {
        lower: true
    })
    this.coverImage = this.images[0]
    next()
})


var ProductModel = mongoose.model('products', ProductSchema)

module.exports = ProductModel