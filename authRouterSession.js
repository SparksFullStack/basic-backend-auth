const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();

router.get('/', (req, res) => {
    res.send(`router is working!`)
})

router.post('/register', (req, res) => {
    const newUser = req.body;
    if (!newUser.username || !newUser.password) {
        return (res.status(404).send(`You need a username and password, ya dingus!`));
    } 

    // hashes the password and adds it to the newUser object
    const hashedPass = bcrypt.hashSync(newUser.password, 14);
    newUser.password = hashedPass;
    req.session.loggedIn = true;

    // stores the user on the session object with their username as the key
    req.session[newUser.username] = newUser;
    res.status(201).send(`${req.session[newUser.username].username} you're good to go!`)
})

router.post('/login', (req, res) => {
    // "searches" the Session for the username provided
    const { username, password } = req.body;
    const storedUser = req.session[username];

    // checks for all fields to be provided and that the user can indeed be found in the Session
    if (!username || !password) return res.status(404).send(`You need a username and password, ya dingus!`);
    if (!storedUser) return res.status(400).send(`No user with that name was found`);
    
    // compares the provided password with the stored password and responds accordingly
    bcrypt.compareSync(password, storedUser.password) ?
        res.status(200).send(`You're all logged in, ${username}!`) :
        res.status(400).send(`Incorrect password, please try again`);
})

router.get('/restricted/:username', (req, res) => {
    // grabs the username from the URL and checks the matching user object on the session object...
    // ...if it's logged in property is true, it sends the goods
    const { username } = req.params;

    if (!req.session.loggedIn) res.status(400).send('you need to be logged in to see this!')
    else res.status(200).send(`welcome. what're ya buyin'`);
})

module.exports = router;