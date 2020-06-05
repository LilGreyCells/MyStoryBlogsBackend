var Blog = require('../models/Blogs')
const { ErrorHandler } = require('../helpers/errorHandler')
const blogmethods = {
  get: async (req) => {
    blog = await Blog.findOne(req.body)
    if (!blog) {
      throw new ErrorHandler(404, 'The requested blog does not exist')
    }

    return blog


  }
  ,
  update: async (req) => {

    blog = await Blog.findOne(req.body)
    if (!blog) {
      throw new ErrorHandler(404, 'The requested blog does not exist')
    }
    const update = {}
    if (req.body.title) {
    update.title = req.body.title

    }
    if (req.body.description) { update.description = req.body.description }
    if (req.postId) {
      const temp = blog.postIds
      temp.push(req.body.postId)
      update.postIds = temp
    }

    await blog.updateOne(update);

    const updatedDoc = await Blog.findOne(blog_id);
    return updatedDoc



  },
  post:  (req) => {
  
      var newblog = new Blog({
        title: req.body.title,
        authorName: req.body.name,
        authorId: req.body.userid,
        description: req.body.description,
        postIds: null
      })
     return newblog.save()
 
  
      
   
  
},
delete: async (req) => {
    doc=await Blog.findByIdAndRemove(req.body.id,(err,blog)=>{
      if (err){throw new ErrorHandler(404,"Document not found")}
      return blog
    })
  
}
}
module.exports = blogmethods