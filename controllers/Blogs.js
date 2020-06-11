var Blog = require('../models/Blogs')

const blogmethods = {
  get: async (req) => {
    return Blog.findOne(req.body)
  },
  update: async (req) => {
    await Blog.updateOne({ blogId: req.body.blogId }, req.body)
    return Blog.findOne({ blogId: req.body.blogId })
  },
  post: (req) => {
    var newblog = new Blog(req.body)
    newblog['blogId'] = newblog._id
    return newblog.save()
  },
  delete: async (req) => {
    return Blog.deleteOne({ blogId: req.body.blogId })
  },
}
module.exports = blogmethods
