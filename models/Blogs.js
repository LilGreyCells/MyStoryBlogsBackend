var mongoose = require('mongoose')

const BlogSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  authorName: {
    type: String,
    require: true,
  
  },
  authorId:{
type:Number,
require:true,
  },
  description: {
    type: String,
    require: false,
  },
  postIds:{
    type:Array,
    require:false,
  }
})
module.exports = Blog = mongoose.model('BlogSchema', BlogSchema)
