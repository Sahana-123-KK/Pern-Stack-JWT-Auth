const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

const jwtGenerator = (user_id)=>{
    const payload = {
        user:user_id
    }

    return jwt.sign(payload,process.env.SECRETKEY,{expiresIn:"1hr"})
}

module.exports = jwtGenerator