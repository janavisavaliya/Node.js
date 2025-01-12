const express = require("express");
const port = 8000;
const app = express();

app.set('view engine','ejs')

const path = require('path');
app.use('/',express.static(path.join(__dirname,'public')))

app.get('/',(req,res)=>{
    return res.render('dashboard')
})

app.get('/charts',(req,res)=>{
    return res.render('charts')
})

app.get('/widgets',(req,res)=>{
    return res.render('widgets')
})

app.get('/tables',(req,res)=>{
    return res.render('tables')
})

app.get('/full-width',(req,res)=>{
    return res.render('full-width')
})

app.get('/form-basic',(req,res)=>{
    return res.render('form-basic')
})

app.get('/form-wizard',(req,res)=>{
    return res.render('form-wizard')
})

app.get('/pages-button',(req,res)=>{
    return res.render('pages-button')
})

app.get('/icon-material',(req,res)=>{
    return res.render('icon-material')
})

app.get('/icon-fontawesome',(req,res)=>{
    return res.render('icon-fontawesome')
})

app.get('/pages-elements',(req,res)=>{
    return res.render('pages-elements')
})

app.get('/dashboard2',(req,res)=>{
    return res.render('dashboard2')
})

app.get('/pages-gallery',(req,res)=>{
    return res.render('pages-gallery')
})

app.get('/pages-calendar',(req,res)=>{
    return res.render('pages-calendar')
})

app.get('/pages-invoice',(req,res)=>{
    return res.render('pages-invoice')
})

app.get('/pages-chat',(req,res)=>{
    return res.render('pages-chat')
})

app.get('/authentication-login',(req,res)=>{
    return res.render('authentication-login')
})

app.get('/authentication-register',(req,res)=>{
    return res.render('authentication-register')
})

app.get('/error-403',(req,res)=>{
    return res.render('error-403')
})

app.get('/error-404',(req,res)=>{
    return res.render('error-404')
})

app.get('/error-405',(req,res)=>{
    return res.render('error-405')
})

app.get('/error-500',(req,res)=>{
    return res.render('error-500')
})

app.listen(port,(err)=>{
    if (err) {
        console.log(err);
        return false
    }
    console.log(`server is start on port :- ${port}`);
    
})