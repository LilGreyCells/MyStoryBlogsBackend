const jwt = require('jsonwebtoken')
const { ErrorHandler } = require('../helpers/errorHandler')
var helper = {
  makeRefreshToken: (authorId, authorName) => {
    const tokenstring = jwt.sign(
      { authorId: authorId, authorName: authorName },
      process.env.REFRESH_TOKEN_SECRET
    )
    return { token: tokenstring }
  },

  makeAccessToken: (authorId, authorName) => {
    const tokenstring = jwt.sign(
      { authorId: authorId, authorName: authorName },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '1m',
      }
    )
    return { token: tokenstring }
  },

  //TODO: ADD BOTH ID AND NAME TO THE 'REQUEST BODY' NOT 'THE REQUEST'.
  //TODO: CHECK FOR WHETHER SIGNED OUT TOKEN OR NOT BY POLLING THE DB.

  authenticateToken: (req, res, next) => {
    // Gather the jwt access token from the request header
    if (!req.cookies.accessTokenCookie) {
      throw new ErrorHandler(303, 'signUp')
    }
    const token = req.cookies.accessTokenCookie.token
    if (token == null || token == undefined) {
      throw new ErrorHandler(400, 'Token not provided. Unauthorized access.')
    } // if there isn't any token

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userinfo) => {
      try {
        if (err) {
          throw new ErrorHandler(303, 'signUp')
        }
        console.log(userinfo)
        req.body.authorId = userinfo.authorId
        req.body.authorName = userinfo.authorName
        next()
      } catch (err) {
        next(err) // pass the execution off to whatever request the client intended
      }
    })
  },
}
module.exports = helper
