const express  = require('express');
const session = require('express-session');
const port = process.env.PORT || 3001;

// importing the two routers
const authRouterSession = require('./authRouterSession');
const authRouterJWT = require('./authRouterJWT');
const router = require('./router');

const server = express();
server.use(express.json());

// having the server use Sessions and passing in the Session object
server.use(session({
    name: 'testing sessions',
    secret: 'i like turtles',
    cookie: { maxAge: 1 * 24 * 60 * 60 * 1000 }, // the value for maxAge is set in milliseconds--this multiplies out to one day's worth of time
    httpOnly: true,
    secure: true,
    resave: false,
    saveUninitialized: false
}))

server.get('/', (req, res) => {
    req.session.loggedIn = false;
    res.status(200).send('The server is up and running!')
})

server.use('/router', router);

server.use('/authSession', authRouterSession); // the router that uses sessions

server.use('/authJwt', authRouterJWT); // the router that uses JWTs

server.listen(port, () => console.log(`The server is listening on port ${port}`));