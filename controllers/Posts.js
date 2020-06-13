var Post = require('../models/Post')
var Blog = require('../models/Blogs')
const { ErrorHandler } = require('../helpers/errorHandler')
var routerhelper = require('../helpers/routerhelper')

const postmethods = {
  get: (req) => {
    return Post.findOne({ postId: req.postId })
  },

  post: (req, res, next) => {
    var newPost = new Post({
      title: req.body.postTitle,
      authorName: req.body.authorName,
      blogId: req.body.blogId,
      postTitle: req.body.postTitle,
      postText: req.body.postText,
      // timestamp: req.body.timestamp,
      keywords: req.body.keywords,
      views: req.body.views,
    })
    newPost['postId'] = newPost._id
    return newPost.save()
  },

  update: async (req, res, next) => {
    await Post.updateOne({ postId: req.body.postId }, req.body)
    return Post.findOne({ postId: req.body.postId })
  },

  delete: async (req) => {
    return Post.findOneAndDelete({ postId: req.body.postId })
  },
}
module.exports = postmethods
