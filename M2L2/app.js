// Import the required modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios')

// Create an instance of express
const app = express ();

// We use the 'body-parser' middleware to parse the incoming request bodies
app.use(bodyParser.urlencoded({extended: false}));

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
console.log('views', path.join(__dirname, 'views'));

// create the route for home page
// The GET route for the form
app.get('/', (req, res) => {
    // Render the form and pass in the current student data
    res.render('index')
});

// create a route for user to enter the numbers
app.post('/calculate', (req, res) => {
    const {num1, num2} = req.body;
    const sum = Number(num1) + Number(num2);
    const difference = Number(num1) - Number(num2);
    const product = Number(num1) * Number(num2);
    const quotient = Number(num1)/Number(num2);
    res.render('result', {sum, difference, product, quotient});
});

// books routes
const books = [];

app.get('/books', (req, res) => {
    res.render('books', {books})
})

app.post('/addBook', (req, res) => {
    const {title, author, publicationYear} = req.body;
    books.push({title, author, publicationYear});
    res.redirect('/books')
})

// user routes
function User(name, age, email) {
    this.name = name;
    this.age = age;
    this.email = email;
}

app.get('/user', (req, res) => {
    res.render('user', {User})
})

app.post('/createUser', (req, res) => {
    const { name, age, email } = req.body;
    const user = new User(name, age, email);
    const { name: userName, age: userAge, email: userEmail } = user;
    res.render('userInfo', { userName, userAge, userEmail})
})

// fruit routes
const fruits = ['Apple', 'Orange', 'Banana']

app.get('/fruits', (req, res) => {
    res.render('fruits', {fruits})
})

app.post('/addFruit', (req, res) => {
    const {fruit} = req.body;
    fruits.push(fruit);
    res.redirect('/fruits')
})

// async.ejs route

app.get('/promises', (req, res) => {
    res.render('promises')
})

app.get('/simulateAsync', (req, res) => {
    setTimeout(() => {
        res.json({ message: 'Asynchronous operation completed!'})
    }, 2000)
})

//httpRequest.ejs route
// const fetch = require('fetch')

app.get('/httpRequest', (req, res) => {
    res.render('httpRequest')
})

app.post('/makeRequest', async (req, res) => {
    const { url } = req.body;
    console.log(url)
    try {
        const response = await axios.get(url);
        res.json(response.data)
    } catch (error) {
        res.json({ error: error.message})
    }
})

// start the server on port 4000,
var port = 4000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});