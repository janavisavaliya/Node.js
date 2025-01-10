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
        id:Math.floor(Math.random()*1000),
        name : username,
        phone : userphone
    }
    record.push(obj);
    console.log("Record Add");
    return res.redirect('/')
})
app.get('/deleteuser',(req,res)=>{
    let id = req.query.deleteid;
    let deletedata = record.filter(val=> val.id != id);
    record = deletedata;
    console.log("delete data successfully..!");
    return res.redirect('/');
})

app.get('/edituser',(req,res)=>{
   let id = req.query.editid;
   let singledata = record.find(val => val.id == id)
   return res.render('edit',{
    singledata
   })
})

app.post('/updateuser',(req,res)=>{
    const {editid,username,userphone} = req.body
    let up = record.map((val)=>{
        if(val.id == editid){
            val.name = username;
            val.phone = userphone;
            }
            return val;
    })
    record = up;
    console.log("update data successfully..!");
    return res.redirect('/');
})

app.listen(port,(err)=>{
    if (err) {
        console.log(err);
        return false
    }
    console.log(`Server is start on port:- ${port}`);
    
})