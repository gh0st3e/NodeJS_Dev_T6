const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const users = require('./users.json')

const port = 3000
const host = "127.0.0.1"

const form = fs.readFileSync('form.html')

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const user = users.find(u => u.id === id);
    done(null, user);
});

passport.use(new LocalStrategy((username, password, done) => {
    const user = users.find(u => u.username === username && u.password === password)
    if (user) {
        return done(null, user)
    } else {
        return done(null, false, {error: "Incorrect auth information"})
    }
}))

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    res.end("Server is working")
})

app.get("/login", (req, res) => {
    res.end(form)
})

app.post("/login",
    passport.authenticate('local', {failureRedirect: '/login'}),
    (req, res) => {
        res.redirect('/profile')
    }
)

app.get("/logout", (req, res) => {
    req.logout(function (err) {
        if (err) {
            console.error(err);
            res.end(JSON.stringify({error: err}))
        }
        res.redirect('/login');
    });
})

app.get("/profile", (req, res) => {
    if (req.isAuthenticated()) {
        res.send(`Hello ${req.user.username}`)
    } else {
        res.redirect("/login")
    }
})

app.use((req, res) => {
    res.status(404).send('404: Not found');
});

app.listen(port, host, () => {
    console.log(`Server is working on port: ${port}`)
})