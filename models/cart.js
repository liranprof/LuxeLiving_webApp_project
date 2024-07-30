const mongoose = require('mongoose');
const {product} = require('./product');//in cart there is products

const Schema = mongoose.Schema;

const Cart_Schema = new Schema({
    Cart_id : {
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

module.exports = mongoose.model('carts', Cart_Schema);



