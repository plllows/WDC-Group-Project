$(document).ready(function() {
  $("#bookingForm").keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      getDestination();
      //submitSearch();
      return false;
    }
  });
});

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

	$("#bookingForm").children(".in").children("input").val(year+"-"+month+"-"+date);
	$("#bookingForm").children(".out").children("input").val(year+"-"+month+"-"+date);
}

window.onload = initIndex;

var destination;

function getDestination() {
	console.log("search submitted");
	destination = $("#bookingForm").children(".dest").first().children("input").first().val();
	console.log("destination is: "+$("#bookingForm").children(".dest").first().children("input").first().val());
	//console.log("destination is: "+destination);
}

/*function submitSearch() {
	$(location).attr('href', './search.html')
}*/