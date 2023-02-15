const http = require('http')

const hostname = '127.0.0.1'
const port = 8084;

function writeHeaders(require)
{
    var head = "";
    for(key in require.headers)
    {
        head += "<p>" + key + ": " + require.headers[key];
    }
    return head;
}

const server = http.createServer((request,response) =>{
    let b='';
    request.on('data', str=>{b+=str; console.log('Body:',b);})
    response.writeHead(200,{'Content-Type': 'text/html'});
    request.on('end', () => {
        response.write(
            '<!DOCTYPE html> <html><head></head>' +
            '<body>' +
            '<h1 align="center" style="color:red;font-size:72px">REQUEST INFO</h1>' +
            '<h2>' + 'method:' + request.method + '</h2>' +
            '<h2>' + 'uri: ' + request.url + '</h2>' +
            '<h2>' + 'version: ' + request.httpVersion + '</h2>' +
            '<h2>' + 'header: ' +JSON.stringify(request.headers) + '</h2>' +
            '<h2>' + 'body: ' + b + '</h2>' +
            '</body></html>'
        );
        response.end();
    })
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });

