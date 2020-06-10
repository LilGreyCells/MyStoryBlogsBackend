var Post = require('../models/Post')
var Blog = require('../models/Blogs')
const { ErrorHandler } = require('../helpers/errorHandler')
var routerhelper = require('../helpers/routerhelper')

const postmethods = {
  get: (req) => {
    return Post.findOne({ postId: req.postId })
  },

  post: (req, res, next) => {
    try {
      var newPost = new Post({
        title: req.body.postTitle,
        authorName: req.body.authorName,
        blogId: req.body.blogId,
        postTitle: req.body.postTitle,
        // timestamp: req.body.timestamp,
        keywords: req.body.keywords,
        views: req.body.views,
      })
      newPost['postId'] = newPost._id
      newPost
        .save()
        .then(() => {
          return newPost
        })
        .catch((err) => {
          next(err)
        })
    } catch (err) {
      console.log(err)
      next(err)
    }
  },

  update: async (req, res, next) => {
    try {
      await Post.updateOne({ postId: req.body.postId }, req.body)
      return await Post.findOne({ postId: req.body.postId })
    } catch (err) {
      next(err)
    }
  },

  delete: (req, res, next) => {
    try {
      return Post.deleteOne({ postId: req.body.postId })
    } catch (err) {
      console.log(err)
    }
  },
}
module.exports = postmethods
