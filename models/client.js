const mongoose_S = require('mongoose');//for store//ODM (Object Data Modeling)
//uses Promises extensively(תדיר)//needs npm install mongoose

const {cart} = require('./cart');

const Schema = mongoose_S.Schema;

const Client = new Schema({
  Name: {
    type: String,
    required: true 
  },
  Last_name: {
    type: String,
    require: true
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

module.exports = mongoose_S.model('Client', Client);




