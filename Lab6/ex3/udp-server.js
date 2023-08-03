const { error } = require('console')
const udp = require('dgram')
const port = 60000

let server = udp.createSocket('udp4')

server.on(error, (e) => {
    console.log(`${e}`)
    server.close()
})

server.on("message", (msg, info) => {
    console.log(`Got ${msg} from ${info.address}:${info.port}`)

    msg = `ECHO: ${msg}`

    server.send(msg, info.port, info.address, (err) => {
        if (err) { server.close }
        else { `Data sent` }
    })
})

server.on('listening', () => {
    console.log(`Address: ${server.address().address}; Port: ${server.address().port}`)
})

server.on('close', () => { console.log(`Socket closed`) })

server.bind(port)