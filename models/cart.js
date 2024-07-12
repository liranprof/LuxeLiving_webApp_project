const mongoose_S = require('mongoose');//ODM (Object Data Modeling)//uses Promises extensively(תדיר)//needs npm install mongoose

const {product} = require('./product');//in cart there is products

const Schema = mongoose_S.Schema;

const Cart_Schema = new Schema({
    Cart_id : {
      type: Number,
      require: true
  },
    Size : {
        type: Number,
        require: true
    },
    Products_num: {
      type: Number,
      require: true,
  },
    Products: {
        type: [product],
        require:false,
    },
    TotalPrice: {
        type: Number,
        require: true,
    },
    Purchased_date: {
        type: Date,
        require:false,
    },
    ClientEmail: { 
        type: String,
        require: true,
    },
    Purchased_valid: {
        type: Boolean,
        require:true,
    },
});

module.exports = mongoose_S.model('Cart', Cart_Schema);



