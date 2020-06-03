var express = require('express')
var router = express.Router()
var User = require('../models/User')
const jwt = require('jsonwebtoken')


router.get('/', authenticateToken, async function (req, res, next) {
  // return/send username, name, bio, picture
  console.log(req.userid)
  var profile = {
    userName: req.userid.userid,
  }
  await User.findOne({ _id: req.userid.userid }).then((user) => {
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

  jwt.verify(token, process.env.TOKEN_SECRET, (err, userid) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.userid=userid
    next() // pass the execution off to whatever request the client intended
  })
}

module.exports = router
