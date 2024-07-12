const mongoose_P = require('mongoose');//for passwords

const Schema = mongoose_P.Schema;

const Password = new Schema({
    Email: {//+admin
        type: String,
        require: true
    },
    Password : {
        type: String,
        require: true
    },
    // hidden from user
});

module.exports = mongoose_P.model('Password', Password);