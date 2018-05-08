var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var session = require('express-session');

var bookings;
var accounts;
var hotelaccounts;
var hotels;

var sessions; //key and val are both usernames

/*obtaining data from json files*/
fs.readFile('data/bookings.json', 'utf8', function(err, data) {
	bookings = JSON.parse(data); //turns json into js data object
		//console.log(bookings["username"]);
});

fs.readFile('data/accounts.json', 'utf8', function(err, data) {
	accounts = JSON.parse(data); //turns json into js data object
		//console.log(accounts["username"]);
});

fs.readFile('data/hotelaccounts.json', 'utf8', function(err, data) {
	hotelaccounts = JSON.parse(data); //turns json into js data object
		//console.log(hotelaccounts["propertyOwner"]);
});

fs.readFile('data/hotels.json', 'utf8', function(err, data) {
	hotels = JSON.parse(data); //turns json into js data object
		console.log(hotels["testhotel"]);
});

/* GET home page. */
router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

router.get('/search', function(req, res) {
	res.sendfile('public/search.html'); 
	//res.sendFile(path.join(__dirname, '../public', 'search.html'));
});

/*processing addition of new hotels*/
router.post('/hotels.json', function(req, res) {
	console.log("add hotel received by router");
	console.log(req.body);
	console.log("and the name is: "+req.body.name);
	var propertyOwner="";	

	var newHotel = req.body;
	
	/*assign property owner if exists*/
	// if (sessions[req.session.id]) {
	// 	propertyOwner=sessions[req.session.id];
	// }
	
	if (hotels[req.body.name]) {
		console.log("hotel by this name already exists");
	} else {
		console.log("adding hotel...")
		hotels[newHotel.name] = newHotel;
		//hotels[req.body.name].propertyOwner = propertyOwner;
		console.log("done");
		res.redirect('/search');
	}
	res.redirect('/search');
});

/*processing login request*/
 router.post('/login', function(req, res) {
 	console.log("login attempt");
 	if (accounts[req.body.name] && accounts[req.body.name].password==req.body.password) {
 		sessions[req.session.id] = req.body.username;
 		console.log("logged in");
 		res.redirect('/');
 	}
 	console.log("login failed");
 });

/*booking form submission redirects to the search page*/
router.post('/search', function(req, res) {
	console.log(req.body.destination);
	console.log(req.body.checkin);
	console.log(req.body.checkout);
	console.log(req.body.guestCount);
	res.redirect('/search?referrer='+req.body.destination);
});

/*load search with the hotels we have by default*/
router.get('/hotels.json', function(req, res) {
	console.log(hotels);
	res.send(JSON.stringify(hotels));
});

module.exports = router;
