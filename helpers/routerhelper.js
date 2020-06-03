const jwt = require('jsonwebtoken')
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
}
}
module.exports= helper