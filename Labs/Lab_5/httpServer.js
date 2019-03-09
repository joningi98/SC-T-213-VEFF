const http = require('http');
const URL = 'http://127.0.0.1:3000/divide?a=[value]&b=[value]';
const hostname = '127.0.0.1';
const port = 3000;
const math = require('./math');

var s = http.createServer();
s.on('request', function(request, response) {
    response.writeHead(200);
    console.log(request.method);
    if (request.method === 'GET' && request.url == '/divide?a=[value]&b=[value]'){
        let my_url = new URL(URL);
        let a = my_url.searchParams('/divide?a=[value]&b=[value]').value;
        console.log(a);
        console.log(math.doDivition(4,2))
    }
   // console.log(request.headers);
    // console.log(request.url);
   // response.write(math.doDivition(4,2));
    response.end();
});

s.listen(port);
console.log('Browse to http://127.0.0.1:' + port);
