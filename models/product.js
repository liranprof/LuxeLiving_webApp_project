const mongoose_S = require('mongoose');//for store//ODM (Object Data Modeling)
//uses Promises extensively(תדיר)//needs npm install mongoose

const {supplier} = require('./supplier');

const Schema = mongoose_S.Schema;

const Product = new Schema({
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

module.exports = mongoose_S.model('Product', Product);