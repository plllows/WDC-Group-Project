var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "yourusername",
  password: "yourpassword",
  database: "mydb"
});

//update rooms 
con.connect(function(err) {
  if (err) throw err;
  var sql = "UPDATE bookings SET numofrooms = '4' WHERE userID = '1'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
  });
});

//reviews
con.connect(function(err) {
  if (err) throw err;
  var sql = "UPDATE review SET review = 'blah blah' WHERE review = 'Leave your review here!'";
  var sql2 = "UPDATE review SET rating = '2' WHERE review = '4'";
  con.query(sql,sql2, function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
  });
});


//delete
con.connect(function(err) {
  if (err) throw err;
  var sql = "DELETE FROM booking_ID WHERE bookingID = '2'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
  });
});