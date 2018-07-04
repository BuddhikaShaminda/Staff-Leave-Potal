const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },


  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  contact : {
    type : String,
    default: "not provide"
  }

});

module.exports = Profile = mongoose.model('profile', ProfileSchema);