var express = require('express')
var router = express.Router()
var User = require('../models/User')
const { ErrorHandler } = require('../helpers/errorHandler')
var routerhelper = require('../helpers/routerhelper')
var bcrypt = require('bcrypt')
const saltRounds = 10

/* GET users listing. */
router.post('/signUp', function (req, res, next) {
  try {
    bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
      var newUser = new User({
        name: req.body.name,
        userName: req.body.userName,
        password: hash,
      })
      await newUser
        .save()
        .then(() => {
          res.status(200).json(makeToken(newUser._id))
        })
        .catch((e) => {
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
    console.log(process.env.TOKEN_SECRET)
    await User.findOne({
      userName: inputUserName,
    })
      .then((profile) => {
        if (!profile) {
          throw new ErrorHandler(401, 'Username does not exist')
        } else {
          bcrypt.compare(inputPassword, profile.password, function (
            err,
            result
          ) {
            if (result === true) {
              res.status(200).json(routerhelper.makeToken(profile._id))
            } else {
              throw new ErrorHandler(401, 'Incorrect Password')
            }
          })
        }
      })
      .catch((err) => {
        throw new ErrorHandler(404, 'Something went wrong')
      })
  } catch (err) {
    next(err)
  }
})

module.exports = router
