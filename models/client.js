const mongoose = require('mongoose');

const {cart} = require('./cart');

const Schema = mongoose.Schema;

const Client_Schema = new Schema({
  Name: {
    type: String,
    required: true 
  },
  Last_name: {
    type: String,
    require: true
  },
  img_src: {
    type: String,
    require: false
  },
  Deploy_Address: {
    type: String,
    require: true
  },
  Carts_num: {
    type: Number,
    require: false,
  },
  Carts: {
    type: [cart],
    require: false,
  },
  Phone: {
    type: String,
    require: false
  },
  Email: {//+admin
    type: String,
    require: true
  },
  Address: {
    type: String,
    require: false
  },
});

module.exports = mongoose.model('clients', Client_Schema);




