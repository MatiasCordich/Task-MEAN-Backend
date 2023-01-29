const { verify } = require("jsonwebtoken")
// require('dotenv').config()

const checkJWT = async (req, res, next) => {
    
    try {

        const jwtByUser = req.headers.authorization || ' '

        const token = jwtByUser.split(' ').pop()

        if(!token){
            return res.status(500).send({msg: "UNAUTHORIZED"})
        }

       verify(token, process.env.JWT_SECRET, (err, decoded) => {
         
        if (err) {
            console.log(err)
            return res.status(500).send({msg: "INVALID_TOKEN"})
        } else {
            req.user = decoded
            next()
        }
       })
    } catch (error) {
        res.status(500)
        res.send({msg: "INVALID_SESSION"})
    }
}

module.exports = { checkJWT }