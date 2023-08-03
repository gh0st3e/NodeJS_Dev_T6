const net = require('net')

const client = new net.Socket()
const host = '127.0.0.1'
const port = 8086

client.connect(port, host, () => {
    console.log(`Connected to ${host}:${port}`)
    client.write("Hola Amigo")
    client.on('data', function (data) {
        console.log(`${data}`)
    })
})