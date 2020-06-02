var express = require('express')
var router = express.Router()
var User = require('../models/User')
// var db = require('../models');
var bcrypt = require('bcrypt')
const saltRounds = 10

/* GET users listing. */
router.post('/signUp', function (req, res, next) {
  bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
    var newUser = new User({
      name: req.body.name,
      userName: req.body.userName,
      password: hash,
    })
    await newUser
      .save()
      .then(() => {
        res.status(200).send(newUser)
      })
      .catch((err) => {
        console.log('Error is ', err.message)
      })
  })
})

router.post('/login', async function (req, res, next) {
  var inputUserName = req.body.userName
  var inputPassword = req.body.password

  await User.findOne({
    userName: inputUserName,
  })
    .then((profile) => {
      if (!profile) {
        res.send("User doesn't exist")
      } else {
        bcrypt.compare(inputPassword, profile.password, function (err, result) {
          if (result === true) {
            res.send('User authenticated.')
          } else {
            res.send('User unauthorized')
          }
        })
      }
    })
    .catch((err) => {
      console.log(err.message)
    })
})

module.exports = router
