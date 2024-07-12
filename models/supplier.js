const mongoose_S = require('mongoose');//for store//ODM (Object Data Modeling)
//uses Promises extensively(תדיר)//needs npm install mongoose

const {product} = require('./product');//supplier-->product

const Schema = mongoose_S.Schema;

const Supplier = new Schema({
  Supplier_ID: {
    type: Number,
    require: true
  },
  Name: {
    type: String,
    required: true,
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

module.exports = mongoose_S.model('Supplier', Supplier);