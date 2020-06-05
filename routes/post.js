var express = require('express')
var router = express.Router()
var routerhelper = require('../helpers/routerhelper')
var Post = require('../models/Post')

// Get Posts from Database
router.get('/', routerhelper.authenticateToken, async function (
  req,
  res,
  next
) {
  try {
    await Post.find({}).then((posts) => {
      res.json(posts)
    })
  } catch (err) {
    throw new ErrorHandler(404, 'Unable to find posts')
  }
})

// Post Posts to Database
router.post('/', routerhelper.authenticateToken, async function (
  req,
  res,
  next
) {
  try {
    var newPost = new Post({
      authorName: req.body.authorName,
      blogId: req.body.blogId,
      postTitle: req.body.postTitle,
      timestamp: req.body.timestamp,
      keywords: req.body.keywords,
      views: req.body.views,
    })
    await newPost.save().then(res.json(newPost))
  } catch (err) {
    throw new ErrorHandler(500, 'Unable to save post.')
  }
})

// Delete Post from Database
router.delete('/:id', router.authenticateToken, async function (
  req,
  res,
  next
) {
  try {
    var postId = req.body._id
    await Post.findOne({ _id: postId }).then((result) => res.send(result))
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
