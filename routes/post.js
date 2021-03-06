var express = require('express')
var router = express.Router()
var routerhelper = require('../helpers/routerhelper')
var postcontroller = require('../controllers/Posts')
var blogcontroller = require('../controllers/Blogs')
const { ErrorHandler } = require('../helpers/errorHandler')
var Post = require('../models/Post')

// Get all posts from Database
router.get('/allPosts', routerhelper.authenticateToken, async function (
  req,
  res,
  next
) {
  try {
    var posts = await Post.find()
    res.json(posts)
  } catch (err) {
    throw new ErrorHandler(404, 'Unable to find posts!')
  }
})

// Get Posts from Database
router.get('/', routerhelper.authenticateToken, async function (
  req,
  res,
  next
) {
  try {
    var post = await postcontroller.get(req.query)
    console.log(post)
    res.json(post)
  } catch (err) {
    throw new ErrorHandler(404, 'Unable to the post!')
  }
})

// Post Posts to Database
router.post('/', routerhelper.authenticateToken, async function (
  req,
  res,
  next
) {
  try {
    var newPost = await postcontroller.post(req, res, next)
    req = {
      body: { $push: { postIds: newPost.postId }, blogId: newPost.blogId },
    }
    await blogcontroller.update(req, res, next)
    res.status(200).json(newPost)
  } catch (err) {
    new ErrorHandler(404, 'Either Post Title or Authorname not provided')
  }
})

// Edit Posts in Database
router.put('/', routerhelper.authenticateToken, async function (
  req,
  res,
  next
) {
  try {
    var updatedPost = await postcontroller.update(req, res, next)
    res.status(200).json(updatedPost)
  } catch (err) {
    if (err instanceof ErrorHandler) {
      next(err)
    }
    next(new ErrorHandler(404, 'Something went wrong ' + err))
  }
})

// Delete Post from Database
router.delete('/', routerhelper.authenticateToken, async function (
  req,
  res,
  next
) {
  try {
    var deletedPost = await postcontroller.delete(req, res, next)
    req = {
      body: {
        $pull: { postIds: deletedPost.postId },
        blogId: deletedPost.blogId,
      },
    }
    await blogcontroller.update(req, res, next)
    res.status(200).json(deletedPost)
  } catch (err) {
    if (err instanceof ErrorHandler) {
      next(err)
    }
    next(new ErrorHandler(404, 'Something went wrong ' + err))
  }
})

module.exports = router
