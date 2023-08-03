const udp = require('dgram')

const client = udp.createSocket('udp4')
const port = 60000

client.on('message', (msg, info) => {
    console.log(`Got ${msg} from ${info.address}:${info.port}`)

})

let data = Buffer.from(`Buenos Gracios senior`)
client.send(data, port, 'localhost', (err) => {
    if (err) { client.close() }
    else { console.log(`Sent to server`) }
})

