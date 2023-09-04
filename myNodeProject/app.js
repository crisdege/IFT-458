// Import the required modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Create an instance of express
const app = express ();

// We use the 'body-parser' middleware to parse the incoming request bodies
app.use(bodyParser.urlencoded({extended: false}));

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
console.log('views', path.join(__dirname, 'views'));

// Create a data store for our student data
let students = [];

app.get('/', (req, res) => {
    res.redirect('/StudentForm'); // Redirect to the form page
});

// The GET route for the form
app.get('/StudentForm', (req, res) => {
    // Render the form and pass in the current student data
    res.render('index', {students: students});
});

// The POST route for form submissions
app.post('/StudentData', (req, res) => {
    // Add the submitted student data to our data store
    students.push(req.body);

    // Redirect back to the form
    res.redirect('/');
})

app.use(express.urlencoded({extended: true}));

// Start server
app.listen(4000, () =>{
    console.log("Server is running on port 4000")
});

// // Serve the form
// app.get('/', (req, res) => {
//     res.render('form');
// });

// // Handle form submissions
// app.post('/submit', (req, res) => {
//     console.log(req.body);
//     res.redirect('/');
// });