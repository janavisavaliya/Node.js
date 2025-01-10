const express = require('express')
const port = 8500;
const app = express();
app.get('/', (req, res) => {
    res.write(`<h1>Hello Node</h1>`)
    res.end();
})

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`server is satrt on port:- ${port}`);
})