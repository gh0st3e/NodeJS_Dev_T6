const net = require('net')

const client = new net.Socket()
const host = '127.0.0.1'
const port = process.argv[2] ? process.argv[2] : 40000
let buf = Buffer.alloc(4)

let i = process.argv[3] ? process.argv[3] : 0;

client.connect(port, host, () => {
    console.log(`Connected to ${host}:${port}`)

    timer = setInterval(() => {
        client.write((buf.writeInt32LE(i++, 0), buf));
    }, 1000)

    client.on('data', function (data) {
        console.log(`${data.readInt32LE()}`)
    })
})