const http = require('http')
const fs = require('fs')
const url = require('url');
global.send = require('ghostfed_m0605')

const host = '127.0.0.1'
const port = 8086

const indexPage = fs.readFileSync("./index.html")

const server = http.createServer((req, res) => {
    if (url.parse(req.url).pathname === '/send') {
        console.log("worked")
        req.on('data', data => {
            let options = JSON.parse(data)

            send.send(options.sender, options.receiver, options.msg)

            res.statusCode = 200
            res.setHeader("Content-Type", "html/text")
            res.end("work")
        })
    }
    if (url.parse(req.url).pathname === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html')
        res.end(indexPage)
    }
})

server.listen(port, host, () => {
    console.log(`Server is working on port: ${port}`)
})