const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

const secret = 'i like turtles'

const registerMiddleware = (req, res, next) => {
    const newUser = req.body;
    if (!newUser.username || !newUser.password) res.status(404).send('No username and/or password provided');

    const hashedPassword = bcrypt.hashSync(newUser.password, 14);
    newUser.password = hashedPassword;
    
    const newJWT = JWT.sign(newUser, secret);
    req.jwt = newJWT;
    next();
}

module.exports = registerMiddleware;