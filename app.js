const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static('public'));

// Server Listening
app.listen(3002, () => {
    console.log('Server is running at port 3002');
});

const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'attendance'
});

connection.connect(function (error) {
    if (!!error) console.log(error);
    else console.log('Database Connected!');
});

// Set views file
app.set('views', path.join(__dirname, 'views'));

// Set view engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Render the form page
app.get('/', (req, res) => {
    let sql = "SELECT * FROM lecture";
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('index', {
            title: 'Dashboard',
            lecture: rows
        });
    });
});
app.get('/lectures', (req, res) => {
    res.render('Lectures',{
        title:'lecturepage'
    }
    );
});
app.get('/Lectable', (req, res) => {
    let sql = "SELECT * FROM lecture";
    let query = connection.query(sql, (err, rows) => {
        if (err) throw err;
        res.render('lectable', {
            title: 'lectableform',
            lecture: rows // Pass the lecture data to the template
        });
    });
});

// Handle form submission
app.post('/submit', (req, res) => {
    // Access form data from the request body
    const lecturerName = req.body.username;
    const email = req.body.email;
    const password = req.body.pass;
    const course = req.body.course1;
  
    // Insert the form data into the database
    const sql = "INSERT INTO lecture (name, email, password, course) VALUES (?, ?, ?, ?)";
    connection.query(sql, [lecturerName, email, password, course], (err, result) => {
      if (err) throw err;
      console.log("Record inserted successfully");
      res.redirect('/Lectable');
    
    });
  });
 
  // Delete a lecture by ID
// Delete a lecture by ID
app.get('/delete/:id', (req, res) => {
    const lectureId = req.params.id; // Corrected parameter name
    const sql = 'DELETE FROM lecture WHERE Id = ?';
    connection.query(sql, [lectureId], (err, result) => {
        if (err) throw err;
        console.log(`Deleted lecture with ID ${lectureId}`);
        res.redirect('/Lectable');
    });
});

//Update lecture
// Render the edit form
app.get('/edit/:id', (req, res) => {
    const lectureId = req.params.id;
    let sql = "SELECT * FROM lecture WHERE Id = ?";
    let query = connection.query(sql, [lectureId], (err, rows) => {
        if (err) throw err;
        res.render('editlec', {
            title: 'Edit Lecture',
            lecture: rows[0] // Assuming there is only one lecture returned from the query
        });
    });
});

// Handle form submission for edit
app.post('/edit/:id', (req, res) => {
    const lectureId = req.params.id;
    const lecturerName = req.body.username;
    const email = req.body.email;
    const password = req.body.pass;
    const course = req.body.course1;
    
    const sql = "UPDATE lecture SET name=?, email=?, password=?, course=? WHERE Id=?";
    connection.query(sql, [lecturerName, email, password, course, lectureId], (err, result) => {
        if (err) throw err;
        console.log(`Updated lecture with ID ${lectureId}`);
        res.redirect('/Lectable');
    });
});



// for attendance
//add data
app.get('/Attendance', (req, res) => {
    res.render('attendance',{
        title:'Attendancepage'
    }
    );
  });

  
 

  