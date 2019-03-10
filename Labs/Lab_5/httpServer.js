const http = require('http');
const url = require('url');
const port = 3000;
const math = require('./math');

var s = http.createServer();
s.on('request', function(request, response) {
    response.writeHead(200);
    let res_url = url.parse(request.url, true);
    if (request.method === 'GET' && res_url.pathname === '/divide'){
        response.statusCode = 200;
        var url_data = res_url.query;
        var a = url_data.a;
        var b = url_data.b;
        console.log(math.stringifyDivision(a,b))
    }
    else{
        response.statusCode = 405;
        response.send('This operation is not supported')
    }
   // console.log(request.headers);
    // console.log(request.url);
   // response.write(math.doDivition(4,2));
    response.end();
});

s.listen(port);
console.log('Browse to http://127.0.0.1:' + port);
