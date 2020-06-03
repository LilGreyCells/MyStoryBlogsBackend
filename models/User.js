var mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  userName: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  bio: {
    type: String,
    require: false,
  },
  postIds:{
    type:Array,
    require:false,
  }
})
module.exports = User = mongoose.model('UserSchema', UserSchema)
