const jwt = require('jsonwebtoken')
const { ErrorHandler } = require('../helpers/errorHandler')
var helper={
     makeToken:(userid)=>{
    const tokenstring = jwt.sign(
        { userid: userid },
        process.env.TOKEN_SECRET,
        {
          expiresIn: '43200m',
        }
      )
      return {token:tokenstring}
      
},

authenticateToken:(req, res, next)=> {
  // Gather the jwt access token from the request header
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) {
    throw new ErrorHandler(400,"Token not provided. Unauthorized access.")
  } // if there isn't any token

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


}
module.exports= helper