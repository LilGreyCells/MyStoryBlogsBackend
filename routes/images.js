var express = require('express')
var router = express.Router()
var unsplashcontroller = require('../controllers/Unsplash')

// var postcontroller = require()
const { ErrorHandler } = require('../helpers/errorHandler')
var routerhelper = require('../helpers/routerhelper')
/* GET blogs based on params. */

router.get('/search',routerhelper.authenticateToken, async function (
  req,
  res,
  next
) {
  try {
   let result = await unsplashcontroller.searchOnQuery(req.query)
   let response = await result.json()
   if (result.status!=200)
            throw new Error(response.errors)
    res.status(200).json(response)         
   
  } catch (err) {
    next(new ErrorHandler(401, 'Something went wrong ' + err))
  }
})

router.post('/download',routerhelper.authenticateToken, async function (
  req,
  res,
  next
) {
  try {
   
   let result = await unsplashcontroller.downloadTrigger(req.body.url)
   let response = await result.json()
   if (result.status!=200)
            throw new Error(response.errors)
    res.status(200).json(response)         
   
  } catch (err) {
    next(new ErrorHandler(404, 'Something went wrong ' + err))
  }
})



module.exports = router
