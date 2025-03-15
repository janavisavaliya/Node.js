const express = require('express');

const app = express();

const port = 9000;

const cors = require('cors');
app.use(cors());

app.get('/users', (req, res) => {
    return res.status(200).json({
        success: true,
        message: "User Successfully Fetch",
        users: [
            { "id": 1, "name": "janavi", "age": 20, "phone": 9099376428, "city": "surat" },
            { "id": 2, "name": "arun", "age": 25, "phone": 9087474523, "city": "mumbai" },
            { "id": 3, "name": "ravi", "age": 22, "phone": 9098234321, "city": "delhi" },
            { "id": 4, "name": "neha", "age": 28, "phone": 9076439023, "city": "pune" },
            { "id": 5, "name": "sneha", "age": 24, "phone": 9098765432, "city": "ahmedabad" },
            { "id": 6, "name": "vikas", "age": 30, "phone": 9087654321, "city": "chennai" },
            { "id": 7, "name": "akshay", "age": 27, "phone": 9099887766, "city": "bangalore" },
            { "id": 8, "name": "tanya", "age": 23, "phone": 9076543210, "city": "kolkata" },
            { "id": 9, "name": "shreya", "age": 26, "phone": 9098238765, "city": "hyderabad" },
            { "id": 10, "name": "vishal", "age": 21, "phone": 9087452365, "city": "mumbai" },
            { "id": 11, "name": "kriti", "age": 22, "phone": 9078327546, "city": "delhi" },
            { "id": 12, "name": "manoj", "age": 29, "phone": 9099328741, "city": "surat" },
            { "id": 13, "name": "sara", "age": 27, "phone": 9087429384, "city": "mumbai" },
            { "id": 14, "name": "rahul", "age": 24, "phone": 9098723094, "city": "pune" },
            { "id": 15, "name": "pooja", "age": 25, "phone": 9076456723, "city": "ahmedabad" },
            { "id": 16, "name": "ajay", "age": 28, "phone": 9087654329, "city": "chennai" },
            { "id": 17, "name": "poornima", "age": 23, "phone": 9098765634, "city": "bangalore" },
            { "id": 18, "name": "shivani", "age": 30, "phone": 9078364567, "city": "kolkata" },
            { "id": 19, "name": "karan", "age": 22, "phone": 9087462536, "city": "hyderabad" },
            { "id": 20, "name": "neelam", "age": 21, "phone": 9098237465, "city": "delhi" },
            { "id": 21, "name": "mohit", "age": 25, "phone": 9078234567, "city": "surat" },
            { "id": 22, "name": "deepa", "age": 28, "phone": 9087348291, "city": "mumbai" },
            { "id": 23, "name": "ganesh", "age": 27, "phone": 9098764371, "city": "pune" },
            { "id": 24, "name": "komal", "age": 23, "phone": 9076548765, "city": "ahmedabad" },
            { "id": 25, "name": "jay", "age": 29, "phone": 9087564321, "city": "chennai" },
            { "id": 26, "name": "rakhi", "age": 24, "phone": 9098327465, "city": "bangalore" },
            { "id": 27, "name": "subham", "age": 21, "phone": 9078456324, "city": "kolkata" },
            { "id": 28, "name": "rahul", "age": 30, "phone": 9098238476, "city": "hyderabad" },
            { "id": 29, "name": "laxmi", "age": 22, "phone": 9087321546, "city": "delhi" },
            { "id": 30, "name": "gaurav", "age": 26, "phone": 9098327468, "city": "surat" }
        ]
    })
})

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false
    }
    console.log(`Server is Start on Port: ${port}`);

})