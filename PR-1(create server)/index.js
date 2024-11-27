const http = require('http');
const port = 9090;
const fs = require('fs');
const RequestHandlar = (req,res)=>{
    let filename ="";
    switch(req.url){
        case '/':
        filename ="./index.html"
        break;

        case '/about':
        filename ="./about.html"
        break;

        case '/product':
        filename ="./product.html"
        break;

        case '/contact':
        filename ="./contact.html"
        break;
      
    }
    fs.readFile(filename,(err,data)=>{
        if(err){
            console.log(err);
            return false;
        }
        res.end(data);
    })
}
const server = http.createServer(RequestHandlar);
server.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log(`server is run :-${port}`);
})
