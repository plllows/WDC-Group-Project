/*jshint esversion: 6 */
var express = require('express');
var router = express.Router();

var CLIENT_ID = '166539957450-37od0bampf06jlt34j11ri1te6ncu0fd.apps.googleusercontent.com';
// var {OAuth2Client} = require('google-auth-library');
// var client = new OAuth2Client(CLIENT_ID);

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
		console.log(hotels.testhotel);
});

/* GET home page. */
router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

/*navigate to account page*/
router.get('/account', function(req, res) {
	res.sendfile(path.join(__dirname, '../public', 'account.html'));
});

router.get('/accessAccount', function(req, res) {
	if (sessions[req.session.id]!==null) {
		//if we have a logged in user, redirect to account
		res.redirect('/account?username='+sessions[req.session.id]);
	} 

	//if not logged in, redirect to home page
	console.log("redirecting to previous page");
	res.redirect(req.query.ref);
});

/*processing login request*/
var users = {};
var sessions = {};

router.post('/loginWithGoogle', function(req, res) {
	console.log(req.body);

	/*if google sign in*/
	if (req.body.idtoken!==undefined) {
		console.log("Google Login detected");

		// const ({OAuth2Client} = require('google-auth-library'));
		// const client = new OAuth2Client(CLIENT_ID);

		async function verify() {
		  	const ticket = await client.verifyIdToken({
		        idToken: req.body.idtoken,
		        audience: CLIENT_ID, 
	    	});


		    const payload = ticket.getPayload();
		    const userid = payload['sub'];
		    const firstname = payload['given_name'];
		  	const lastname = payload['family_name'];

			var username = firstname+userid;
			var name = {
				first: firstname,
				last: lastname
			}

			users[username].username = username;
			users[username].name = name;
			sessions[req.session.id] = username;
			res.redirect('/?username='+sessions[req.session.id]);
		}
		verify().catch(console.error);
	}
}

router.post('/login', function(req, res) {
	console.log(req.body);

	if (users[req.body.username]) {
		//if the username exists, check password and set session[id] = their username, else redirect
		if ((users[req.body.username].password == req.body.password) && (users[req.body.username].username==req.body.username)){
			sessions[req.session.id] = req.body.username;
			res.redirect('/?username='+sessions[req.session.id]);
		}
		res.redirect('/');
	} else {
		//create a user using supplied usernames and passwords, and give them a session
		var newUser = {
			"username": req.body.username,
			"password":req.body.password
		};
		//users[req.body.username].username = req.body.username;
		//users[req.body.username].password = req.body.password;
		users[req.body.username] = newUser;
		sessions[req.session.id] = req.body.username;
		res.redirect('/?username='+sessions[req.session.id]);
	}
});

/*serves static search page*/
router.get('/search', function(req, res) {
	res.sendfile('public/search.html'); 
	//res.sendFile(path.join(__dirname, '../public', 'search.html'));
});

/*contains info from submitted booking form*/
var bookingFormDetails = {};

/*booking form submission redirects to the search page*/
router.post('/search', function(req, res) {
	console.log(req.body.destination);
	console.log(req.body.checkin);
	console.log(req.body.checkout);
	console.log(req.body.guestCount);
	//console.log(typeof(req.body.destination));
	var temp = {};
	temp.destination = req.body.destination;
	temp.checkin = req.body.checkin;
	temp.checkout = req.body.checkout;
	temp.guestCount = req.body.guestCount;

	if (sessions[req.session.id]) {
		//if session exists, log the booking form submission under their name
		bookingFormDetails[sessions[req.session.id]] = temp;
	} else {
		//otherwise, give them a session
		sessions[req.session.id] = req.session.id;
		bookingFormDetails[sessions[req.session.id]] = temp;
	}
	
	console.log(JSON.stringify(bookingFormDetails));
	res.redirect('/search?username='+sessions[req.session.id]+'&destination='+req.body.destination+'&checkin='+req.body.checkin+'&checkout='+req.body.checkout+'&guestCount='+req.body.guestCount);
});

/*load search with the hotels we have by default*/
router.get('/hotels.json', function(req, res) {
	console.log(hotels);
	res.send(JSON.stringify(hotels));
});

/*processing addition of new hotels*/
router.post('/hotels.json', function(req, res) {
	console.log("add hotel received by router");
	console.log(req.body);
	console.log("and the name is: "+req.body.name);
	var propertyOwner="";	

	var newHotel = req.body;
	
	/*assign property owner if exists*/
	if (sessions[req.session.id]) {
		propertyOwner=sessions[req.session.id];
	}
	
	if (hotels[req.body.name]) {
		console.log("hotel by this name already exists");
	} else {
		console.log("adding hotel...");
		hotels[newHotel.name] = newHotel;
		//hotels[req.body.name].propertyOwner = propertyOwner;
		console.log("done");
		res.redirect('/search');
	}
	res.redirect('/search');
});

/*access hotel pages using hotel hyperlinks*/
router.get('/hotel', function(req, res) {
	if (!hotels[req.query.property]) {
		res.redirect(req.query.ref);
	} 
	res.redirect('/hotelPage?property='+req.query.property);
});

router.get('/hotelPage', function(req, res) {
	res.sendfile(path.join(__dirname, '../public', 'hotel.html'));
});




module.exports = router;
