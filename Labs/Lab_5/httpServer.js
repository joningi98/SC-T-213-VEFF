const http = require('http');
const url = require('url');
const port = 3000;
const math = require('./math');

var s = http.createServer();
s.on('request', function(request, response) {
    response.setHeader('Content-Type', 'text/plain');
    let res_url = url.parse(request.url, true);
    if (request.method === 'GET' && res_url.pathname === '/divide' && Number(res_url.query.a) && Number(res_url.query.b)){
        response.writeHead(200);
        var url_data = res_url.query;
        var a = url_data.a;
        var b = url_data.b;
        response.write(math.stringifyDivision(a,b))
    }
    else{
        response.writeHead(405);
        response.write('This operation is not supported')
    }
    response.end();
});

s.listen(port);
console.log('Browse to http://127.0.0.1:' + port);
