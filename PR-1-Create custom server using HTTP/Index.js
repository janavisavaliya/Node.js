const http = require("http");
const port = 8000;
const fs = require("fs");
const server = http.createServer((req, res) => {
    let fileName = "";
    switch (req.url) {
        case "/":
            fileName = "./home.html"
            break;
        case "/about":
            fileName = "./about.html"
            break;
        case "/account":
            fileName = "./account.html"
            break;
        case "/blog":
            fileName = "./blog.html"
            break;
        case "/cart":
            fileName = "./cart.html"
            break;
        case "/login":
            fileName = "./login.html"
            break;
        case "/order":
            fileName = "./order.html"
            break;
        case "/policy":
            fileName = "./policy.html"
            break;
        case "/register":
            fileName = "./register.html"
            break;
        case "/shopping":
            fileName = "./shopping.html"
            break;
    }
    fs.readFile(fileName, (err, pagename) => {
        if (err) {
            console.log(`file is not found`);
            return false;
        }
        res.end(pagename)
    })
})
server.listen(port, (err) => {
    if (!err) {
        console.log(`Server is start on ${port}`);
    }
})