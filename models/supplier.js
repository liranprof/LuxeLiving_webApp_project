const mongoose = require('mongoose');

const {product} = require('./product');//supplier-->product

const Schema = mongoose.Schema;

const Supplier_Schema = new Schema({
  Supplier_ID: {
    type: Number,
    require: true
  },
  Name: {
    type: String,
    required: true,
  },
  img_src:{
    type: String,
    required: false,
  },
  Products_mount: {
    type: Number,
    require: false,
  },
  Products: {
    type: [product],
    require: false,
  },
  Address: {
    type: String,
    require: true,
  },
  Phone: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model('suppliers', Supplier_Schema);