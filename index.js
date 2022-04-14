const http = require('http');
const url = require('url');
const fs = require('fs').promises;
const data = require('./data/data.json');

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
        let html = await fs.readFile('./view/product.html','utf-8');

        const motors = data.find((motor) => motor.id === id);
        console.log(motors);

        html = html.replace(/<%IMAGE%>/g,motors.image);
        html = html.replace(/<%NAME%>/g,motors.name);
        html = html.replace(/<%PRICE%>/g,motors.orginalPrice);


        if(motors.hasDiscount){
            const discountPrice = motors.orginalPrice * (100 - motors.discount) / 100;
            html = html.replace(/<%DISCOUNTPRICE%>/g,discountPrice);

        }


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