const express = require('express'),
    app = express(),
    axios = require('axios'),
    massive = require('massive')
    bodyParser = require('body-parser');
    passport = require('passport'),
    Devmtn = require('devmtn-auth'),
    DevmtnStrategy = Devmtn.Strategy;
    
require('dotenv').config();

app.use(bodyParser.json());


/////////////////////
///Passport stuff ///
/////////////////////
passport.use('devmtn', new DevmtnStrategy({
    app: process.env.AUTH_APP,
    client_token: process.env.AUTH_CLIENT_TOKEN,
    callbackURL: process.env.AUTH_CALLBACK,
    jwtSecret: process.env.AUTH_SECRET
}, function (jwtoken, user, done) {
    console.log(user)
    done(user);
}));


passport.serializeUser(function (user, done) {
    console.log(user)
    done(null, user);
});
passport.deserializeUser(function (obj, done) {
    console.log(done)
    done(null, obj);
});

//DevMtn Auth
app.get('/auth/', passport.authenticate('devmtn'));
app.get('/auth/devmtn/callback', passport.authenticate('devmtn', 
{
    failureRedirect: process.env.FAILURE_REDIRECT, 
    successfulRedirect: process.env.SUCCESS_REDIRECT
}),
(req, res) =>{
    console.log("Login Success");
        console.log('The User: ', req.user);
    res.redirect(process.env.SUCCESS_REDIRECT)
});

app.get('/api/logout', (req, res)=>{
    req.logout();
    res.redirect(process.env.LOGOUT_URL)
});
// axios.get(`https://slack.com/api/users.list?token=`).then(({data}) =>{
//     console.log(data);
// })


massive(process.env.CONNECTION_STRING).then(db => {
    app.set('db', db);
    app.listen(process.env.SERVER_PORT, _=>{
        console.log(`Listening on port ${process.env.SERVER_PORT}`)
    });
})