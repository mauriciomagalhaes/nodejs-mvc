const jwt = require('jsonwebtoken');
const getToken = require('./get-token');

//Middleware to validate token
const checkToken = (req, res, next) => {
    //console.log(req)

    if(!req.headers.authorization){
        return res.status(401).json({message: 'Nenhum token foi informado!'});
    }

    //get token from header
    const token = getToken(req);

    if(!token){
        return res.status(422).json({message: 'Token inválido!'});
    }

    try {
        const verified = jwt.verify(token, 'nossosupersecreto');
        req.user = verified;
        next();
    } catch (error) {
        return res.status(400).json({message: 'Token inválido!'});
    }
}

module.exports = checkToken;