const express = require('express')
const port = 5600;
const app = express();

app.set('view engine','ejs');
app.get('/',(req,res)=>{
    return res.render('home')
})                              
app.get('/products',(req,res)=>{
    return res.render('products')
})

app.listen(port,(err) => {
    if(err){
        console.log(err);
        return false;
    }
    console.log(`Server is running on port :- ${port}`);
})