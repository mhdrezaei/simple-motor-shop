const http = require('http');

const server = http.createServer((req,res)=>{
    console.log('server is running');

    res.writeHead(200,{'Content-Type' : 'text/html'});
    res.end('<h1>Wellcome to motor shop </h1>');
})

server.listen(3000);