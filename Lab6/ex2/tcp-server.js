const net = require('net');

let HOST = '0.0.0.0';
let PORT1 = 40000;
let PORT2 = 50000;



let h = (n) => {
    return (sock) => {
        let sum = 0
        console.log(`[${n}] New Client on : ${sock.remoteAddress}:${sock.remotePort}`);

        sock.on('data', (data) => {
            sum += data.readInt32LE()
            console.log(`[${n}] Server got ${data.readInt32LE()} from: ${sock.remoteAddress}:${sock.remotePort}; Sum: ${sum}`)
        });

        let buf = Buffer.alloc(4)
        let timer = setInterval(() => {
            buf.writeInt32LE(sum, 0)
            sock.write(buf)
            console.log(`Result sent to ${sock.remoteAddress}:${sock.remotePort}`)
        }, 5000)

        sock.on('close', () => {
            console.log(`[${n}] Connection with ${sock.remoteAddress}:${sock.remotePort} refused`)
            clearInterval(timer)
        });

        sock.on('error', function (e) {
            if (e.code != 'ECONNRESET') {
                console.log(e)
            }
        })
    }
};

net.createServer(h(PORT1)).listen(PORT1, HOST).on('listening', () => { console.log('TCP-server ' + HOST + ':' + PORT1); });

net.createServer(h(PORT2)).listen(PORT2, HOST).on('listening', () => { console.log('TCP-server ' + HOST + ':' + PORT2); });