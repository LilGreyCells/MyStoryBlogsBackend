var express = require('express')
var router = express.Router()
var blogcontroller = require('../controllers/Blogs')
var postcontroller=require('../controllers/Posts')
// var postcontroller = require()
const { ErrorHandler } = require('../helpers/errorHandler')
var routerhelper = require('../helpers/routerhelper')
/* GET blogs based on params. */
router.get('/', async function (req, res, next) {
  try {
    blog = await blogcontroller.get(req)
    if (!blog) {
      throw new ErrorHandler(404, 'The blog does not exist')
    }
    res.status(200).json(blog)
  } catch (err) {
    if (err instanceof ErrorHandler) {
      next(err)
    }
    next(new ErrorHandler(404, 'Something went wrong ' + err))
  }
})

/* POST a new blog based on params. */

//Note on Async: Any function defined as async returns a promise.
//await can only be called inside an async function.
//await essentially waits for a promise to resolve hence making it kind of synchronous.
//here blogcontroller.post is a call to an async function inside the controller class from this async function (inside routes class)
//as we can see in blogcontroller, we send back a promise from its async post function. mongoose.save returns a promise.
//essentially, we can't throw an error from within the promise.catch unless we write await in front of it because
//unless await is written, the promise will resolve in its own asynchronous time and thus won't be a part of the
// timeline where the encompassing try and catch block exist
//leading to error falling and causing failure.
//await makes sure that the promise resolves, so it is still executing in the same timeline and the error thrown from .catch can be caught
// by the following overall catch block.
//links to go through : https://itnext.io/async-and-await-in-javascript-the-extension-to-a-promise-f4e0048964ac
//https://itnext.io/error-handling-with-async-await-in-js-26c3f20bc06a
router.post('/', routerhelper.authenticateToken, async function (
  req,
  res,
  next
) {
  try {
    result = blogcontroller.post(req)
    await result
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        throw new ErrorHandler(404, 'Missing fields' + err)
      })
  } catch (err) {
    next(new ErrorHandler(404, 'Something went wrong ' + err))
  }
})

/*DELETE the blog based on params*/
router.delete('/', routerhelper.authenticateToken, async function (
  req,
  res,
  next
) {
  try {
    blog = await blogcontroller.delete(req)
    console.log(blog)
    if (blog.postIds && blog.postIds.length > 0) {
      blog.postIds.forEach(async element => {
        console.log(element)
        let req={body:{postId:element}}
        await postcontroller.delete(req)
      });
    }
    res.status(200).json(blog)
  } catch (err) {
    if (err instanceof ErrorHandler) {
      next(err)
    }
    next(new ErrorHandler(404, 'Something went wrong ' + err))
  }
})

/*PUT updated information in the blog based on params*/
router.put('/', routerhelper.authenticateToken, async function (
  req,
  res,
  next
) {
  try {
    result = await blogcontroller.update(req, res, next)
    //TODO: POST USES THIS CONTROLLER TO DELETE A POSTID ONCE POST IS DELETED
    res.status(200).json(result)
  } catch (err) {
    if (err instanceof ErrorHandler) {
      next(err)
    }
    next(new ErrorHandler(404, 'Something went wrong ' + err))
  }
})

module.exports = router
