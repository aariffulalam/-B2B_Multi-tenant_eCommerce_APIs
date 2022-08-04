const jwt = require('jsonwebtoken');
const config =require('../config/config')

const generateToken = (id, name, email)=>{
    console.log(config)
    return jwt.sign({id, name, email},config.secretKey)    
}

const verifyToken = (req, res, next) =>{
    try {
        const cookie = req.headers.authorization
        if (!cookie){
            res.status(401).json({
                status:"unauthorized"
            })
        }
        const token = cookie.split(" ")[1]
        const decode = jwt.verify(token,config.secretKey)
        req.userValues = decode
        next()
    } catch (error) {
        res.status(500).json({title:"error", message:error})
    }
}

module.exports = {generateToken, verifyToken}