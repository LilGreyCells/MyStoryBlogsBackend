var express = require('express')
var router = express.Router()
var User = require('../models/User')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

router.get('/', authenticateToken, async function (req, res, next) {
  // return/send username, name, bio, picture
  var profile = {
    userName: req.userName.userName,
  }
  await User.findOne({ userName: req.userName.userName }).then((user) => {
    profile['name'] = user.name
    profile['bio'] = user.bio
    profile['myPosts'] = user.myPosts
  })

  res.json(profile)
})

function authenticateToken(req, res, next) {
  // Gather the jwt access token from the request header
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401) // if there isn't any token

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.userName = user
    next() // pass the execution off to whatever request the client intended
  })
}

module.exports = router
