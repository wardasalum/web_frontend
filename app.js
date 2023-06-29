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

  app.get('/Attendtable', (req, res) => {
    let sql = "SELECT * FROM attend";
    let query = connection.query(sql, (err, rows) => {
        if (err) throw err;
        res.render('attendtable', {
            title: 'attendancetable',
            attend :rows // Pass the lecture data to the template
        });
    });
});

// Handle form submission
app.post('/sub', (req, res) => {
    // Access form data from the request body
    const lecturerID = req.body.username;
    const studentID = req.body.stu;
    const yearOfStudy = req.body.year;
    const date = req.body.date;
    const attendanceStatus = req.body.status1;
  
    // Insert the form data into the database
    const sql = "INSERT INTO attend (Id, stuid, year, date, status) VALUES (?, ?, ?, ?, ?)";
    connection.query(sql, [lecturerID, studentID, yearOfStudy, date, attendanceStatus], (err, result) => {
      if (err) throw err;
      console.log("Attendance record inserted successfully");
      res.redirect('/attendtable');
    });
  });
  
  //delete the form attend

  app.get('/delet/:id', (req, res) => {
    const attendanceId = req.params.id;
    const sql = 'DELETE FROM attend WHERE Id = ?';
    connection.query(sql, [attendanceId], (err, result) => {
        if (err) throw err;
        console.log(`Deleted attendance record with ID ${attendanceId}`);
        res.redirect('/attendtable');
    });
});

//Update attendance
// Render the edit form
app.get('/edit1/:id', (req, res) => {
    const attendanceId= req.params.id;
    let sql = "SELECT * FROM attend WHERE Id = ?";
    let query = connection.query(sql, [attendanceId], (err, rows) => {
        if (err) throw err;
        res.render('editattend', {
            title: 'editncepage',
            attend: rows[0] // Assuming there is only one attendance returned from the query
        });
    });
});
// Handle form submission for editing attendance
app.post('/edit1/:id', (req, res) => {
    const attendanceId = req.params.id;
    const lecturerID = req.body.username;
    const studentID = req.body.stu;
    const yearOfStudy = req.body.year;
    const date = req.body.date;
    const attendanceStatus = req.body.status1;
    
    const sql = "UPDATE attend SET Id=?, stuid=?, year=?, date=?, status=? WHERE Id=?";
    connection.query(sql, [attendanceId,lecturerID, studentID, yearOfStudy, date, attendanceStatus ], (err, result) => {
        if (err) throw err;
        console.log(`Updated attendance record with ID ${attendanceId}`);
        res.redirect('/attendtable');
    });
});




// for attendanceReport

app.get('/Attendtable', (req, res) => {
    let sql = "SELECT * FROM attend";
    let query = connection.query(sql, (err, rows) => {
        if (err) throw err;
        res.render('attendtable', {
            title: 'attendancetable',
            attend :rows // Pass the lecture data to the template
        });
    });
});

app.get('/Login', (req, res) => {
        res.render('login', {
            title: 'loginpage',
        });
    });


  