var Post = require('../models/Post')
const { ErrorHandler } = require('../helpers/errorHandler')
var routerhelper = require('../helpers/routerhelper')
const postmethods={
    get: (req) => {
      await Post.findOne({postId: req.body._id}).then((post) =>{return posts}
      )
    },
  
    post: (req, res, next)=>{try{
      var newPost=new Post({
          title:req.body.postTitle,
          authorName: req.body.authorName,
          blogId: req.body.blogId,
          postTitle: req.body.postTitle,
          timestamp: req.body.timestamp,
          keywords: req.body.keywords,
          views: req.body.views
      })
      await newPost
          .save()
          .then(() => {
            return newPost
          })
          .catch((err) => {
            next(err)
          })
    }
    catch(err){
        next(err)
    }
    },

    update:(req,res,next)=>{
        try{
            var post_id={_id:req.body._id}
            post =  await Post.findOne({
              post_id
            })
          if(!post){
            throw new ErrorHandler(404, 'The requested post does not exist')
          }
          const update={}
          if(req.body.postTitle)
          {update.postTitle=req.body.postTitle
            
        }
    
              await post.updateOne(update);
    
              const updatedDoc = await Post.findOne(post_id);
            res.status(200).json(updatedDoc)
    
          }
          catch(err){
            if (err instanceof ErrorHandler){
                next(err)
              }
              next(new ErrorHandler(404, 'Something went wrong '+err))
            }
    },

    delete: (req, res, next) => {
      // try {
      //   var postId = req.body._id
      //   await Post.findOne({ _id: postId }).then((result) => res.send(result))
      // } catch (err) {
      //   console.log(err)
      // }
    }
}
module.exports=postmethods