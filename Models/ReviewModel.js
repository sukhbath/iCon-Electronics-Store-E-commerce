var mongoose = require('mongoose');
var ProductModel = require('../Models/ProductsModel')
var ReviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, "Must provide review"]
    },
    rating: {
        type: Number,
        min: [0, 'rating can not be below 0'],
        max: [5, 'rating can not be above 5'],
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'products',
        required: [true, "must provide tour for review"]
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'users',
        required: [true, "must provide user for review"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})


ReviewSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
        select: "name"
    }).populate({
        path: 'product',
        select: "name"
    })
    next()
})


ReviewSchema.post('save', async function () {

    var result = await ReviewModel.aggregate([{
            $match: {
                "product": this.product
            }
        },
        {
            $group: {
                _id: "$product",
                avgRating: {
                    $avg: '$rating'
                },
                totalRating: {
                    $sum: 1
                }

            }
        }
    ])

    var product = await ProductModel.findByIdAndUpdate(this.product, {
        avgRating: result[0].avgRating,
        qtyRatings: result[0].totalRating
    })

})



var ReviewModel = mongoose.model('reviews', ReviewSchema)

module.exports = ReviewModel