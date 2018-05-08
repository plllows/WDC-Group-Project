function initIndex() {
	console.log("initialising index...");
	var d = new Date();
	var date, month, year;
	date = d.getDate();
	if (date<10) {
		date = "0"+date;
	}
	month = d.getMonth()+1;
	if (month<10) {
		month = "0"+month;
	}
	year = d.getFullYear();

	$("#bookingForm").children(".in").children("input").attr("placeholder", year+"-"+month+"-"+date);
	$("#bookingForm").children(".out").children("input").attr("placeholder", year+"-"+month+"-"+date);
}

window.onload = initIndex;

var destination;