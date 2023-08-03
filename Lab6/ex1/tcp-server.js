const net = require('net')

const host = '127.0.0.1'
const port = 8086

const server = net.createServer();



server.on('connection', function (sock) {
    console.log(`New Client: ${sock.remoteAddress}:${sock.remotePort}`)
    sock.on('data', function (data) {
        console.log(`Message From ${sock.remoteAddress}: ${data}`)
        sock.write(`ECHO: ${data}.`)
    })

    sock.on('close', function () {
        console.log(`Connection with ${sock.remoteAddress} refused`)
    })

    sock.on('error', function (e) {
        console.log(e)
    })
})


server.listen(port, host, () => {
    console.log(`Server is running - ${host}:${port}`)
})