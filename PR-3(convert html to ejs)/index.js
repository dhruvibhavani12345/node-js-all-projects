const express = require('express');

const port = 9000;

const app = express();

app.set('view engine','ejs');

app.use(express.urlencoded());


app.use(express.urlencoded)();

const path = require('path');

app.use('/',express.static(path.join(__dirname,'/public')));

app.get('/',(req,res)=>{
    return res.render('index')
})
app.get('/chart',(req,res)=>{
    return res.render('chart')
})

app.get('/widget',(req,res)=>{
    return res.render('widget')
})

app.get('/table',(req,res)=>{
    return res.render('table')
})

app.get('/grid',(req,res)=>{
    return res.render('grid')
})
app.get('/button',(req,res)=>{
    return res.render('button')
})

app.get('/elements',(req,res)=>{
    return res.render('elements')
})

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log(`server is running${port}`);
})

