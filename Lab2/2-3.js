const http = require('http')
const fs = require('fs')

const hostname = "127.0.0.1"
const port = "5000"
const html = fs.readFileSync('index.html');

const server = http.createServer((req,res)=>{
    switch (req.url){
        case "/":
            res.statusCode=200
            res.setHeader("Content-Type","text/plain")
            res.end(`Server is running on ${hostname} with port ${port}`)
            break
        case "/api/name":
            res.statusCode=200
            res.setHeader("Content-Type","text/plain")
            res.end("Leonov Denis Igorevich 3rd grade 7th group")
            break
    }
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });

