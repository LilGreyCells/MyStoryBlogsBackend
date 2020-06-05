var express = require('express')
var router = express.Router()
var blogcontroller=require('../controllers/Blogs')
var postcontroller=require()

/* GET blogs based on params. */
router.get('/', async function (req, res, next) {

})

/* POST a new blog based on params. */
router.post('/',routerhelper.authenticateToken,async function (req, res, next) {
  blogcontroller.post(req,res,next)
})

/*DELETE the blog based on params*/
router.delete('/',routerhelper.authenticateToken ,async function(req,res,next){

})

/*PUT updated information in the blog based on params*/
router.put('/',routerhelper.authenticateToken ,async function(req,res,next){
  blogcontroller.update(req,res,next)
      }
    )


module.exports = router
