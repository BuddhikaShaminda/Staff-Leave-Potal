const mongoose = require('mongoose');
const Schema =mongoose.Schema;

const userSchema = new Schema({
    name :{
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    address :{
        type :String,
        requide :true
    },
    password :{
        type :String,
        requide :true
    }
});

module.exports = mongoose.model('user',userSchema);