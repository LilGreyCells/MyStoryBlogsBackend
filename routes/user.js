var express = require('express')
var router = express.Router()
var User = require('../models/User')
const { ErrorHandler } = require('../helpers/errorHandler')
var routerhelper = require('../helpers/routerhelper')
var bcrypt = require('bcrypt')
const { token } = require('morgan')
const { JsonWebTokenError } = require('jsonwebtoken')
const saltRounds = 10
const jwt = require('jsonwebtoken')

/* GET users listing. */
router.post('/signUp', function (req, res, next) {
  try {
    bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
      var newUser = new User({
        userName: req.body.userName,
        authorName: req.body.authorName,
        password: hash,
        tokens: [],
      })
      newUser['authorId'] = newUser._id
      await newUser
        .save()
        .then(async () => {
          var refreshToken = routerhelper.makeRefreshToken(
            newUser.authorId,
            req.body.authorName
          )
          var accessToken = routerhelper.makeAccessToken(
            newUser.authorId,
            req.body.authorName
          )

          res.cookie('refreshTokenCookie', refreshToken, {
            httpOnly: true,
            secure: true,
          })
          res.cookie('accessTokenCookie', accessToken, {
            httpOnly: true,
            secure: true,
          })

          await User.updateOne(
            { authorId: newUser.authorId },
            { $push: { tokens: refreshToken.token } }
          )

          res.status(200).send()
        })
        .catch((e) => {
          console.log(e)
          next(new ErrorHandler(401, 'Username is already taken'))
        })
    })
  } catch (err) {
    next(err)
  }
})

router.post('/login', async function (req, res, next) {
  try {
    var inputUserName = req.body.userName
    var inputPassword = req.body.password

    await User.findOne({
      userName: inputUserName,
    })
      .then((profile) => {
        if (!profile) {
          throw new ErrorHandler(401, 'Username does not exist')
        } else {
          bcrypt.compare(inputPassword, profile.password, async function (
            err,
            result
          ) {
            if (result === true) {
              var refreshToken = routerhelper.makeRefreshToken(
                profile.authorId,
                profile.authorName
              )
              var accessToken = routerhelper.makeAccessToken(
                profile.authorId,
                profile.authorName
              )
              res.cookie('refreshTokenCookie', refreshToken, {
                httpOnly: true,
                secure: true,
              })
              res.cookie('accessTokenCookie', accessToken, {
                httpOnly: true,
                secure: true,
              })

              await User.updateOne(
                { userName: profile.userName },
                { $push: { tokens: refreshToken.token } }
              )

              res.status(200).json({ message: 'User is logged in!' })
            } else {
              throw new ErrorHandler(401, 'Incorrect Password')
            }
          })
        }
      })
      .catch((err) => {
        if (err instanceof ErrorHandler) {
          throw err
        }
        throw new ErrorHandler(404, 'Something went wrong')
      })
  } catch (err) {
    next(err)
  }
})

router.get('/profile', routerhelper.authenticateToken, async function (
  req,
  res,
  next
) {
  // return/send username, name, bio, picture
  var profile = {}
  try {
    await User.findOne(req.body)
      .then((user) => {
        console.log('user: ', user)
        profile['authorName'] = user.authorName
        profile['username'] = user.userName
        profile['bio'] = user.bio
        profile['myPosts'] = user.myPosts
        console.log(profile)
        res.json(profile)
      })
      .catch((err) => {
        console.log('errrrrrooooooooooo: ', err)
        throw new ErrorHandler(303, 'signUp')
      })
  } catch (err) {
    next(err)
  }
})

router.get('/refreshToken', function (req, res, next) {
  if (req.cookies.refreshTokenCookie == undefined) {
    throw new ErrorHandler(303, 'login')
  }
  var refreshToken = req.cookies.refreshTokenCookie.token
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, userinfo) => {
      if (err) {
        // await User.updateOne(
        //   { authorId: userinfo.authorId },
        //   { $pull: { tokens: refreshToken } }
        // )
        throw new ErrorHandler(401, 'Token has expired.')
      }
      var user = await User.findOne({ authorId: userinfo.authorId })
      if (user.tokens.includes(refreshToken)) {
        var newAcessToken = routerhelper.makeAccessToken(
          userinfo.authorId,
          req.body.authorName
        )

        res.cookie('accessTokenCookie', accessToken, {
          httpOnly: true,
          secure: true,
        })
        res.send()
      } else {
        throw new ErrorHandler(401, 'Token has expired.')
      }
    }
  )
})

router.get('/logout', routerhelper.authenticateToken, async function (
  req,
  res,
  next
) {
  var refreshToken = req.cookies.refreshTokenCookie.token
  var result = await User.updateOne(
    { authorId: req.body.authorId },
    { $pull: { tokens: refreshToken } }
  )

  res.clearCookie('refreshTokenCookie')
  res.clearCookie('accessTokenCookie')

  res.status(200).json({ message: 'User is logged out!' })
})

router.post('/addFriend',routerhelper.authenticateToken,async function(req,res,next){
  
})
module.exports = router
