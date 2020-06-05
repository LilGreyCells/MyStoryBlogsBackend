const jwt = require('jsonwebtoken')
const { ErrorHandler } = require('../helpers/errorHandler')
var helper={
     makeToken:(userid,name)=>{
    const tokenstring = jwt.sign(
        { userid: userid,
        name: name},
        process.env.TOKEN_SECRET,
        {
          expiresIn: '43200m',
        }
      )
      return {token:tokenstring}
      
},

//TODO: ADD BOTH ID AND NAME TO THE 'REQUEST BODY' NOT 'THE REQUEST'.
//TODO: CHECK FOR WHETHER SIGNED OUT TOKEN OR NOT BY POLLING THE DB.

authenticateToken:(req, res, next)=> {
  // Gather the jwt access token from the request header
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) {
    throw new ErrorHandler(400,"Token not provided. Unauthorized access.")
  } // if there isn't any token

  jwt.verify(token, process.env.TOKEN_SECRET, (err, userinfo) => {
    try {
      if (err) {
        throw new ErrorHandler(303, 'signUp')
      }
      
      req.body.userid = userinfo.userid
      req.body.name=userinfo.name
      next()
    } catch (err) {
      next(err) // pass the execution off to whatever request the client intended
    }
  })
}


}
module.exports= helper