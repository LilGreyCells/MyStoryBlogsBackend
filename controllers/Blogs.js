var Blog = require('../models/Blogs')
const { ErrorHandler } = require('../helpers/errorHandler')
var routerhelper = require('../helpers/routerhelper')
const blogmethods={

    update:(req,res,next)=>{
        try{
            var blog_id={_id:req.body._id}
          blog=  await Blog.findOne({
              blog_id
              })
          if(!blog){
            throw new ErrorHandler(404, 'The requested blog does not exist')
          }
          const update={}
          if(req.body.title)
          {update.title=req.body.title
            
        }
          if(req.body.description)
          {update.description=req.body.description}
          if(req.postId)
          {  const temp= blog.postIds 
            temp.push(req.body.postId)
              update.postIds=temp
          }
    
              await blog.updateOne(update);
    
              const updatedDoc = await Blog.findOne(blog_id);
            res.status(200).json(updatedDoc)
    
          }
          catch(err){
            if (err instanceof ErrorHandler){
                next(err)
              }
              next(new ErrorHandler(404, 'Something went wrong '+err))
            }
    },
    post: (req, res, next)=>{try{
      var newblog=new Blog({
          title:req.body.title,
            authorName: req.body.authorName,
            authorId:req.body.authorId,
            description: req.body.description,
            postIds:null
      })
      await newblog
          .save()
          .then(() => {
            res.status(200).json(newblog)
          })
          .catch((e) => {
            next(new ErrorHandler(404, 'Either Title or Authorname not provided'))
          })
    }
    catch(err){
        next(err)
    }
  }
}
module.exports=blogmethods