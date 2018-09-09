const express = require('express');
const register = require('./middleware/register');
const login = require('./middleware/login');

const router = express.Router();

router.get('/', (req, res) => {
    res.send(`Router is working!`);
})

// both of these routes send a JWT if the middleware passes things on to them
router.post('/register', register, (req, res) => {
    const { jwt } = req;
    res.send(jwt);
})

router.post('/login', login, (req, res) => {
    const { jwt } = req;
    res.send(jwt);
})

module.exports = router;