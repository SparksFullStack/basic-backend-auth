const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

const secret = 'i like turtles';

const storedUser = {
    username: "charlie",
    password: "i like turtles"
}

const loginMiddleware = (req, res, next) => {
    const { username, password } = req.body;
    if (storedUser.username !== username) res.status(404).send(`No user with that name was found, please try again`);
    
    // here we're going to hash the stored password to simulate it being stored in a database...
    // ...you'd never do this in real life:
    storedUser.password = bcrypt.hashSync(storedUser.password, 14);

    // now we check if the password provided matches the stored password
    // bcrypt.compareSync(password, storedUser.password, 14) ?
    //     next() :
    //     res.status(404).send(`The password you entered did not match, please try again`);

    if (bcrypt.compareSync(password, storedUser.password)){
        const newJWT = JWT.sign(req.body, secret);
        req.jwt = newJWT;
        next();
    } else {
        res.status(400).send(`The passwords did not match`);
    }
}   



module.exports = loginMiddleware;