const http = require('http')
const url = require('url');
const fs = require('fs')
const data = require('./DB/DB');

const EventEmitter = require('events')

const hostname = "127.0.0.1"
const port = "9000"

const page = fs.readFileSync("index.html")

var db = new data.DB();

class MyEmitter extends EventEmitter { }
const myEmitter = new MyEmitter();

myEmitter.on('GET', (req, res) => {
    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify(db.select()))

})

myEmitter.on('POST', (req, res) => {
    req.on('data', data => {
        let newUser = JSON.parse(data)
        db.insert(newUser)
        res.statusCode = 200
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify(newUser))
    })
})

myEmitter.on('PUT', (req, res) => {
    let updatedUser
    req.on('data', data => {
        updatedUser = JSON.parse(data)

        const queryObject = url.parse(req.url, true).query;
        let id = queryObject.id

        db.update(id, updatedUser)

        res.statusCode = 200
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify(updatedUser))
    })
})

myEmitter.on('DELETE', (req, res) => {
    const queryObject = url.parse(req.url, true).query;
    let id = queryObject.id

    delUser = db.delete(id)

    res.statusCode = 200
    res.setHeader("Content-Type", "applicataion/json")
    res.end(JSON.stringify(delUser))
})

const server = http.createServer((req, res) => {
    if (url.parse(req.url).pathname === '/') {
        let html = fs.readFileSync('./index.html');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(html);
    }

    if (url.parse(req.url).pathname === '/api/db') {
        myEmitter.emit(req.method, req, res);
    }

})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


