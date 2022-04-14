const http = require('http');
const url = require('url')

const server = http.createServer((req,res)=>{
    console.log('server is running');
    if(req.url === '/favicon.ico') return;

    const myURL = new URL(req.url,`http://${req.headers.host}/`);
    const pathName = myURL.pathname;
    const id = myURL.searchParams.get('id');

    res.writeHead(200,{'Content-Type' : 'text/html'});
    res.end('<h1>Wellcome to motor shop </h1>');
})

server.listen(3000);