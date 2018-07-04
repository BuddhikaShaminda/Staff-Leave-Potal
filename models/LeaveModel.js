const mongoose = require('mongoose');
const Schema =mongoose.Schema;

const leaveSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    user_id :{
        type: String,
        required : true
    },
    name :{
        type : String,
        require : true
    },
    reason : {
        type : String,
        require : true
    },

    from :{
        type :Date,
        requide :true
    },
    to :{
        type :Date,
        default : ''
    },
    status :{
        type :String,
        default :"pending"
    },
    leaveType : {
        type : String,
        required : true,
    }
});

module.exports = LeaveModel = mongoose.model("Leave",leaveSchema);