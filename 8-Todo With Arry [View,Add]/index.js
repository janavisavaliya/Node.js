const express = require("express");
const port = 9000;
const app = express();

app.set('view engine','ejs');
app.use(express.urlencoded());
let record = [];

app.get('/',(req,res)=>{
    return res.render('table',{
        record
    })
})

app.get('/add',(req,res)=>{
    return res.render('form');
})
 
app.post('/adduser',(req,res)=>{
    const {username,userphone} = req.body;
    let obj = {
        name : username,
        phone : userphone
    }
    record.push(obj);
    console.log("Record Add");
    return res.redirect('/')
})


app.listen(port,(err)=>{
    if (err) {
        console.log(err);
        return false
    }
    console.log(`Server is start on port:- ${port}`);
    
})