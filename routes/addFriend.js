var express = require('express')
var router = express.Router()
var routerhelper = require('../helpers/routerhelper')
var User = require('../models/User')
const { ErrorHandler } = require('../helpers/errorHandler')

router.get('/', routerhelper.authenticateTokenWithoutCookies, async function (
  req,
  res,
  next
) {
  try {
    var channelId = routerhelper.generateChannelId()
    var currentChannelId = req.body.authorName + '_' + channelId
    var toConnectToChannelId = req.body.toConnectTo + '_' + channelId

    let updateCurrentChannelId = {}
    updateCurrentChannelId[toConnectToChannelId] = []

    let updateToConnectToChannelId = {}
    updateToConnectToChannelId[currentChannelId] = []

    await User.update(
      { authorName: req.body.authorName },
      { $push: { chatSessions: updateCurrentChannelId } }
    )

    await User.update(
      { authorName: req.body.toConnectTo },
      { $push: { chatSessions: updateToConnectToChannelId } }
    )

    res.json({ message: 'Friend added to chat!' })
  } catch (err) {
    new ErrorHandler(404, 'Something went wrong!')
  }
})

module.exports = router
