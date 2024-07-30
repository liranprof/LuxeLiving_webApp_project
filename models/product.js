const mongoose = require('mongoose');

const {supplier} = require('./supplier');

const Schema = mongoose.Schema;

const Product_Schema = new Schema({
    Product_id: {
        type: Number,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        require: true,
    },
    img_src: {
        type: String,
        require: false,
    },
    Suppliers: {
        type: [supplier],
        require: true,
    },
    Suppliers_amount: {
        type: Number,
        require: false
    },
    Type: {
        type: String,
        require: false,
    },
    Brand: {
        type: String,
        require: false,
    },
    Description: {
        type: String,
        require: false,
    },
    Discount: {
        type: Number,
        require: false,
    },
    Rank: {
        type: Number,
        require: false,
    },
});

module.exports = mongoose.model('products', Product_Schema);