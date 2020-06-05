var mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
  authorName: {
    type: String,
    require: true,
  },
  blogId: {
    type: String,
    require: false,
  },
  postTitle: {
    type: String,
    require: true,
  },
  timestamp: {
    type: String,
    require: true,
  },
  keywords: {
    type: Array,
    require: false,
  },
  views: {
    type: Object,
    require: false,
  },
})
module.exports = mongoose.model('PostSchema', PostSchema)
