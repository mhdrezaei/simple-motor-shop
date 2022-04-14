const http = require('http');
const url = require('url');
const fs = require('fs').promises;

const server = http.createServer(async(req,res)=>{
    console.log('server is running');
    if(req.url === '/favicon.ico') return;

    const myURL = new URL(req.url,`http://${req.headers.host}/`);
    const pathName = myURL.pathname;
    const id = myURL.searchParams.get('id');

    console.log(req.url);
    if(pathName === '/'){
        const html = await fs.readFile('./view/shop.html','utf-8');
        res.writeHead(200,{'Content-Type' : 'text/html'});
        res.end(html);
    }else if(pathName === '/product' && id >= 0 && id <= 5){
        const html = await fs.readFile('./view/product.html','utf-8');
        res.writeHead(200,{'Content-Type' : 'text/html'});
        res.end(html);
    }
    else if(/\.(jpg)$/i.test(req.url)){

        const image = await fs.readFile(`./public/images/${req.url.slice(1)}`);
        res.writeHead(200,{'Content-Type' : 'image/jpg'});
        res.end(image);
    }
    else if(/\.(css)$/i.test(req.url)){

        const image = await fs.readFile(`./public/css/main.css`);
        res.writeHead(200,{'Content-Type' : 'text/css'});
        res.end(image);
    }
    
    else{
        res.writeHead(404,{'Content-Type' : 'text/html'});
        res.end('page not found');
    }

    
})

server.listen(3000);