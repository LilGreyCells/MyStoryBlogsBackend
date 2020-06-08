var Blog = require('../models/Blogs')
const blogmethods = {
  get: async (req) => {
   console.log(req.body)
    return Blog.findOne({_id:req.body.blogid})
  }
  ,
  update: async (req) => {

   
    await Blog.updateOne({blogid:req.body.blogid},req.body)
   return Blog.findOne({blogid:req.body.blogid})
  


  },
  post:  (req) => {
  
      var newblog = new Blog(req.body)
     return newblog.save() 
  
},
delete: async (req) => {
    return Blog.deleteOne({_id:req.body.blogid })
    
  
}
}
module.exports = blogmethods