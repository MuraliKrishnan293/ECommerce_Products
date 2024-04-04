const jwt = require('jsonwebtoken');
const SECRETKEY = 'abcdefg';

const Middleware = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization?.split(' ')[1];
    if(!token){
        res.json({message:"Token Miss"})
    }
    try {
        req.user = jwt.verify(token,SECRETKEY).user;
        next();
    } catch (error) {
        res.json({message:"Token Wrong"})
    }
}

module.exports = Middleware;