const mongoose = require('mongoose');//for passwords

const Schema = mongoose.Schema;

const Password_Schema = new Schema({
    Email: {//+admin
        type: String,
        require: true
    },
    Password : {
        type: String,
        require: true
    },
});

module.exports = mongoose.model('password', Password_Schema);