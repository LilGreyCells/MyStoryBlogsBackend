var express = require('express')
var router = express.Router()
var User = require('../models/User')
const jwt = require('jsonwebtoken')
const { ErrorHandler } = require('../helpers/errorHandler')

router.get('/', authenticateToken, async function (req, res, next) {
  // return/send username, name, bio, picture
  var profile = {}
  try {
    await User.findOne({ _id: req.userid.userid })
      .then((user) => {
        profile['userName'] = user.userName
        profile['name'] = user.name
        profile['bio'] = user.bio
        profile['myPosts'] = user.myPosts

        res.json(profile)
      })
      .catch((err) => {
        throw new ErrorHandler(303, 'signUp')
      })
  } catch (err) {
    next(err)
  }
})

function authenticateToken(req, res, next) {
  // Gather the jwt access token from the request header
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401) // if there isn't any token

  jwt.verify(token, process.env.TOKEN_SECRET, (err, userid) => {
    try {
      if (err) {
        throw new ErrorHandler(303, 'signUp')
      }
      req.userid = userid
      next()
    } catch (err) {
      next(err) // pass the execution off to whatever request the client intended
    }
  })
}

module.exports = router
