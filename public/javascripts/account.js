/*functions to unhide elements*/
function bookings(){
    document.getElementById('bookingtile').style.display = "block";
}
function past(){
    document.getElementById('past').style.display = "block";
}
function account(){
    document.getElementById('details').style.display = "block";
}
function manage(){
    document.getElementById('manage').style.display = "block";
}
/*JSON*/

var bookings = {};

function getBookings() {
    console.log("get bookings");
    var getReq = new XMLHttpRequest();
    getReq.open("GET", '/bookings.json', true);
    
    getReq.onreadystatechange = function() {
        if (this.readyState==4 && this.status==200) {
            console.log("response text:"+getReq.responseText);
            bookings=JSON.parse(getReq.responseText);
            console.log(bookings);
            console.log(typeof bookings);
            initialiseBookings();
        } else {}
    }; 
    getReq.send();
}

function initialiseBookings(){
    for (var key in bookings) {
            var hotelname, checkin, checkout, numofrooms;
            hotelname = bookings[key].hotelname;
            checkin = checkin[key].checkin;
            checkout = checkout[key].checkout;
            numofrooms = numofrooms[key].numofrooms;
		dat = {}
	    console.log(formElements)
	    for(i=0;i<formElements.length; i++){
		   
		    
	    }
            var newtiles = newtile();
    }
}

function newtile(hotelname, checkin, checkout, numofrooms){
	var tile = document.createElement("div");
	tile.id= "bookingtile";

	//var par = JSON.parse('{ "hotelname":"Hilton Hotel", "checkin":"27/6/17", "checkout":"29/6/17", "NumberOfRooms":3 }');
	var t = document.createTextNode(par.hotelname + " " + par.checkin + " - " + par.checkout + "Number of Rooms:"+ par.numofrooms);
    tile.appendChild(t);
    document.getElementById("bookings").appendChild(tile);
}

function updaterooms(){
	var rooms = document.getElementById('rooms');
	dat = {}
	console.log(formElements)
	
	var xhttp = new XMLHttpRequest();
	
	xhttp.open("POST","rooms", true);
	
	xhttp.setRequestHeader("Content-type","application/json");
	
	xhttp.send(JSON.stringify(rooms));
}
