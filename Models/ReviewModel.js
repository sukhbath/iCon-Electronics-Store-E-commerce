var mongoose = require('mongoose');
var ReviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, "Must provide review"]
    },
    rating: {
        type: Number,
        min: [0, 'rating can not be below 0'],
        max: [5, 'rating can not be above 5']
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