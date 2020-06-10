var express = require('express')
var router = express.Router()
var routerhelper = require('../helpers/routerhelper')
var postcontroller = require('../controllers/Posts')
var blogcontroller = require('../controllers/Blogs')
const { ErrorHandler } = require('../helpers/errorHandler')

// Get Posts from Database
router.get('/', routerhelper.authenticateToken, async function (
  req,
  res,
  next
) {
  try {
    var post = await postcontroller.get(req.query)
    res.json(post)
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
    var newPost = postcontroller.post(req, res, next)
    req = { body: newPost.postId, type: 'add' }
    blogcontroller.update(req, res, next)

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
    var post = await postcontroller.delete(req, res, next)
    req = { body: post.postId, type: 'delete' }
    blogcontroller.update(req, res, next)
    res.status(200).json(post)
  } catch (err) {
    if (err instanceof ErrorHandler) {
      next(err)
    }
    next(new ErrorHandler(404, 'Something went wrong ' + err))
  }
})

module.exports = router
