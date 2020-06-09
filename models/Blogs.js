var mongoose = require('mongoose')

const BlogSchema = mongoose.Schema({
  blogId: {
    type: String,
    required: true,
  },
  blogTitle: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  authorId: {
    type: String,
    required: true,
  },
  blogDescription: {
    type: String,
    required: false,
  },
  postIds: {
    type: Array,
    required: false,
  },
})
module.exports = Blog = mongoose.model('BlogSchema', BlogSchema)
