const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const express = require("express");
const users = require('./users.json')

const host = "127.0.0.1"
const port = 3000
const accessTokenSecret = "TURNDOWNFORWHAT"
const tokenLifeTime = '10m'

function GenerateToken(username, password) {
    const accessToken = jwt.sign(
        {
            username: username,
            password: password
        },
        accessTokenSecret,
        {expiresIn: tokenLifeTime}
    )

    return accessToken
}

function ValidateToken(req, res, next) {
    const headers = req.headers
    if (headers.authorization != null) {
        const authHeader = headers.authorization
        const token = authHeader.split(' ')[1]
        jwt.verify(token, accessTokenSecret, {complete: true}, (err, decoded) => {
            if (err) {
                res.setHeader("Content-Type", "application/json")
                return res.status(401).end(JSON.stringify("Invalid token"));
            } else {
                req.username = decoded.payload.username
                next()
            }
        })
    } else {
        res.setHeader("Content-Type", "application/json")
        return res.status(401).end(JSON.stringify("Unauthorized"));
    }
}

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", (req, res) => {
    res.end("Server is working")
})

app.post("/login", (req, res) => {
    const {username, password} = req.body
    const user = users.find(u => u.username === username && u.password === password);
    res.setHeader("Content-Type", "application/json")
    if (user) {
        const token = GenerateToken(username, password)
        res.end(JSON.stringify({authToken: token}))
    } else {
        res.statusCode = 401
        res.end(JSON.stringify({error: "Invalid auth information"}))
    }
})

app.get("/profile", ValidateToken, (req, res) => {
    const name = req.username
    res.end(`Hello ${name}`)
})

app.use((req, res) => {
    res.status(404).send('404: Not found');
});

app.listen(port, host, () => {
    console.log(`Server is running on port ${port}`)
})