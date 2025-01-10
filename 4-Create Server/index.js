const http = require('http');
const port = 8000;
const server = http.createServer((req,res)=>{
    res.write(`<h1>Hello</h1>`);
    res.write(`<h1>Hello World</h1>`);
    res.write(`<h1>Node js</h1>`);
    res.end()
})
server.listen(port,(err) => {
   if (!err) {
    console.log(`server is strat on port:-${port}`);
    console.log(`${port}`);
}
});