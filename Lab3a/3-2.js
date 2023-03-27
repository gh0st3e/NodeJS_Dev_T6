const http = require('http')
const url = require('url')
const fs = require('fs')
const { time } = require('console')
const { Module } = require('module')

const host = "127.0.0.1"
const port = "5000"

const factorialHtmlPath = fs.readFileSync('fact.html')
const factorialTickHtmlPath = fs.readFileSync('test.html')
const factorialImHtmlPath = fs.readFileSync('imfact.html')

function factorial(n) {
    return (n > 0) ? n * factorial(n - 1) : 1;
}

function factorialTick(n, callback) {
    if (n === 0 || n === 1) {
        callback(1);
    } else {
        process.nextTick(() => {
            factorialTick(n - 1, (result) => {
                callback(n * result);
            });
        });
    }
}

function factorialImmediate(n, callback) {
    if (n < 0) {
        callback("Error: n must be a non-negative integer.");
    } else if (n === 0 || n === 1) {
        setImmediate(() => {
            callback(1);
        });
    } else {
        let result;
        setImmediate(() => {
            factorialImmediate(n - 1, (res) => {
                result = n * res;
                callback(result);
            });
        });
    }
}

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const queryObject = url.parse(req.url, true).query;
    const pathName = parsedUrl.pathname;

    switch (pathName) {
        case "/":
            res.statusCode = 200
            res.setHeader("Content-Type", "text/plain")
            res.end("Server is working")
            break
        case "/fact":
            let k = queryObject.k
            if (!k === Number || k == null) {
                res.statusCode = 400
                res.setHeader("Content-Type", "text/plain")
                res.end("Type the number")
            } else {
                res.statusCode = 200
                res.setHeader("Content-Type", "application/json")
                let time = Date.now()
                res.end(JSON.stringify({ k: k, fact: factorial(k), time: Date.now() - time }))
            }
            break
        case "/facth":
            res.statusCode = 200
            res.setHeader("Content-Type", "text/html")
            res.end(factorialHtmlPath)
            break
        case "/facttick":
            let ktick = queryObject.ktick
            if (!ktick === Number || ktick == null) {
                res.statusCode = 400
                res.setHeader("Content-Type", "text/plain")
                res.end("Type the number")
            } else {
                res.statusCode = 200
                res.setHeader("Content-Type", "application/json")
                let time = Date.now()
                factorialTick(ktick, (result) => {
                    res.end(JSON.stringify({ k: ktick, fact: result, time: Date.now() - time }))
                });
            }
            break
        case "/facttickh":
            res.statusCode = 200
            res.setHeader("Content-Type", "text/html")
            res.end(factorialTickHtmlPath)
            break
        case "/itick":
            let itick = queryObject.itick
            if (!itick === Number || itick == null) {
                res.statusCode = 400
                res.setHeader("Content-Type", "text/plain")
                res.end("Type the number")
            } else {
                res.statusCode = 200
                res.setHeader("Content-Type", "application/json")
                let time = Date.now()
                factorialImmediate(itick, (result) => {
                    res.end(JSON.stringify({ k: itick, fact: result, time: Date.now() - time }))
                });
            }
            break
        case "/itickh":
            res.statusCode = 200
            res.setHeader("Content-Type", "text/html")
            res.end(factorialImHtmlPath)
            break
    }
})



server.listen(port, host, () => {
    console.log(`Server is running on port: ${port}`)
})