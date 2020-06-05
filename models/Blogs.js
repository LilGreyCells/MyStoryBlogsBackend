var mongoose = require('mongoose')

const BlogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  
  },
  authorId:{
type:String,
required:true,
  },
  description: {
    type: String,
    required: false,
  },
  postIds:{
    type:Array,
    required:false,
  }
})
module.exports = Blog = mongoose.model('BlogSchema', BlogSchema)
