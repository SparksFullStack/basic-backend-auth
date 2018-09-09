const express = require('express');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

const secret = 'i like turtles';
let userJWT;
let userObj;

const router = express.Router();

router.get('/', (req, res) => {
    res.send('JWTs are a commin');
})

router.post('/register', (req, res) => {
    userObj = req.body;
    const hashedPassword = bcrypt.hashSync(userObj.password, 14);
    userObj.password = hashedPassword;

    userJWT = JWT.sign(userObj, secret);
    res.send(userJWT);
})

router.post('/restricted/:jwt', (req, res) => {
    const { jwt } = req.params;
    const verified = JWT.verify(jwt, secret); // this will throw an error and crash everything if it can't verify
    console.log(verified)
    console.log(typeof userObj.password);
    console.log(bcrypt.compareSync(verified.password, userObj.password)) 
    // ?
    //     res.status(200).send(`You're all logged in!`) :
    //     res.status(400).send(`The password you provided didn't match`);
})

module.exports = router;