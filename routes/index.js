/*jshint esversion: 6 */
var express = require('express');
var router = express.Router();

var CLIENT_ID = '166539957450-37od0bampf06jlt34j11ri1te6ncu0fd.apps.googleusercontent.com';
var {OAuth2Client} = require('google-auth-library');
var client = new OAuth2Client(CLIENT_ID);

var fs = require('fs');
var path = require('path');
var session = require('express-session');

var bookings;
var accounts;
var hotelaccounts;
var hotels;
var UID = 600; //spaghetti is good

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

router.get('/checkForSession', function(req, res) {
	if (sessions[req.session.id]) {
		res.redirect('/?username='+sessions[req.session.id]);
	} 
	res.redirect('/');
});

router.post('/loginWithGoogle', function(req, res) {
	console.log(req.body);

	/*if google sign in*/
	if (req.body.idtoken!==undefined) {
		console.log("Google Login detected");
		async function verify() {
		  	const ticket = await client.verifyIdToken({
		        idToken: req.body.idtoken,
		        audience: CLIENT_ID
	    	});

		    const payload = ticket.getPayload();
		    const userid = payload.sub;
		    const firstname = payload.given_name;
		  	const lastname = payload.family_name;

			var username = firstname+userid;
			var name = {
				first: firstname,
				last: lastname
			};

			console.log(username);
			console.log(name);

			var newUser = {};
			newUser.username = username;
			newUser.name = name;
			users.username = newUser;

			req.pool.getConnection(function(err, connection) {
				if (err) throw err;

				var query = "insert into user_account (userID, username, first_name, last_name) values (?, ?, ?, ?)";
				connection.query(query, [UID++, newUser.username, newUser.name.first, newUser.name.last], function(err, results) {
					if (err) throw err;
					connection.release();
				});
			});

			sessions[req.session.id] = username;
			console.log("successfully created new user, returning username");
			console.log(JSON.stringify(username));
			res.send(JSON.stringify(username));
		}
		verify().catch(console.error);
		// setTimeout(function() {
		// 	res.redirect('/?username='+sessions[req.session.id]); 
		// }, 2000);
		
	}
});

router.get('/GSIlogin', function(req, res) {
	console.log("recieved: "+req.query.username);
	req.pool.getConnection(function(err, connection) {
		if (err) throw err;
		var query = "select * from user_account where username = ?"
		connection.query(query, [req.query.username], function(err, results) {
			if (err) throw err;
			if ((results.length!=0) && (sessions[req.session.id])) {
				res.redirect('/?username='+sessions[req.session.id]);
			}
		})
	})
}); 

router.post('/login', function(req, res) {
	console.log(req.body);

	req.pool.getConnection(function(err, connection) {
		if (err) throw err;

		var query = "select * from user_account where username = ? and password = ?";
		connection.query(query, [req.body.username, req.body.password], function(err, results) {
			if (err) throw err;
			connection.release();
			if (results.length!=0) {
				session[req.session.id] = req.body.username;
				res.redirect('/?username='+sessions[req.session.id]);
			}
		});
	});

	req.pool.getConnection(function(err, connection) {
		if (err) throw err;
		sessions[req.session.id] = req.body.username;
		var query = "insert into user_account (userID, username, password) values (?,?)"
		connection.query(query, [UID++,req.body.username, req.body.password], function() {
			if (err) throw err;
			connection.release();
			res.redirect('/?username='+sessions[req.session.id]);
		});
	});
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
	req.pool.getConnection(function(err, connection) {
		if (err) {
			console.log(err);
			throw err;
		}

		var query = "select * from hotel inner join room on hotel.hotelID = room.hotelID group by hotel.hotelID";
		connection.query(query, function(err, results) {
			if (err) {
				console.log(err);
				throw err;
			}
			connection.release();
			console.log(results);
			res.json(results);
		});

	});
});

var HID = 100;
/*processing addition of new hotels*/
router.post('/hotels.json', function(req, res) {
	if (sessions[req.session.id]) return;

	console.log("add hotel received by router");
	console.log(req.body);
	console.log("and the name is: "+req.body.name);
	var propertyOwner="";	

	var newHotel = req.body;

	req.pool.getConnection(function(err, connection) {
		if (err) {
			console.log(err);
			throw err;
		}

		var query = "insert into hotel (hotelID, ownerID, name, rating, lat, lng, description) values (?, ?, ?, ?, ?, ?, ?)";
		connection.query(query,[HID++, sessions[req.session.id], newHotel.name, newHotel.rating, newHotel.position.lat, newHotel.position.lng, newHotel.description],function(err, results) {
			if (err) {
				console.log(err);
				throw err;
			}
			connection.release();
			console.log(results);
			res.redirect('/search');
		});
	});
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

/*get bookings*/
router.get('/bookings.json', function(req, res) {
	console.log(bookings);
	res.send(JSON.stringify(bookings));
});



module.exports = router;
