/*
$(document).ready(function() {
  $("#bookingForm").keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      getDestination();
      submitSearch();
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

function submitSearch() {
	$(location).attr('href', './search.html')
}*/

var map = null;
function myMapFunction() {
	//options
	var mapOptions = {
		center: {lat: -34.9285, lng: 138.6007},
		zoom: 12
	};

	//load map
	map = new google.maps.Map(
		document.getElementById("map"),
		mapOptions
		);

	defaultMarker();

	//create search box and link to UI
	var input = document.getElementById('pac-input');
	var searchBox = new google.maps.places.SearchBox(input);
	/*map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);*/

	//Bias searchbox results towards map viewport
	//called when bounds of map are changed; searchbox
	//bounds set to equal map's bounds
	map.addListener('bounds_changed', function() {
		searchBox.setBounds(map.getBounds());
	});

	var markers = [];

	//Listen for the event fired when the user selects a prediction
	//and retrieve more details for that place
	searchBox.addListener('places_changed', function() {
		var places = searchBox.getPlaces();
		if (places.length==0) {
			return;
		}

		//clear out old markers.
		markers.forEach(function(marker) {
			marker.setMap(null);
		});
		markers=[];

		//for each place, get the icon, name and location
		var bounds = new google.maps.LatLngBounds();
		places.forEach(function(place) {
			if (!place.geometry) {
				console.log("returned place contains no geometry");
				return;
			}

			var icon = {
				url: place.icon,
				size: new google.maps.Size(71,71),
				origin: new google.maps.Point(0,0),
				anchor: new google.maps.Point(17,34),
				scaledSize: new google.maps.Size(25,25)
			};

			//create a marker for each place
			markers.push(new google.maps.Marker({
				map:map,
				icon: icon,
				title: place.name,
				position: place.geometry.location
			}));

			if (place.geometry.viewport) {
				//only geocodes have viewport
				bounds.union(place.geometry.viewport);
			} else {
				bounds.extend(place.geometry.location);
			}
		});
		map.fitBounds(bounds);
	});
	console.log("places should have changed");
}

function defaultMarker() {
	console.log("markers placed");
	var place = { lat: -34.9285, lng: 138.6007 };

	var marker = new google.maps.Marker({
		position: place,
		map: map
	});
}



var hasEnoughInfo =false;
function validateEntry() {
	var origin = $("#controller");
	if (($(origin).children(".name").val()!="")&&
		($(origin).children(".rating").val()!="")&&
		($(origin).children(".price").val()!="")&&
		($(origin).children(".descriptionInput").val()!="")){
		$(origin).children("button").prop("disabled",false);
		if (!hasEnoughInfo) {
			console.log("success");
			hasEnoughInfo=true;
		}
	} else {
		$(origin).children("button").prop("disabled",true);
		if (hasEnoughInfo) {
			console.log("failed");
			hasEnoughInfo =false;
		}
	}
}

var hotelMarkers = [];
var hotelMarkerInfo = [];


function addHotelMarker(text) {
	console.log("markers placed");
	var marker = new google.maps.Marker({
		position: map.getCenter(),
		map: map,
		label: $("#controller").children(".name").val()
	});

	//create a new infowindow object
	var infowindow = new google.maps.InfoWindow({
		content: text
	});
	//hotelMarkerInfo.push(infowindow);

	//when the user clicks the marker, an info window opens
	//when marker is clicked, infowindow in this context 
	//will open on the map, on *this* marker
	marker.addListener('click', function() {
		infowindow.open(map, this);
	})

	hotelMarkers.push(marker);
}

function addHotel() {
	var origin = $("#controller");
	var name, rating, price, description;
	name = $(origin).children(".name").val();
	rating = $(origin).children(".rating").val();
	price = $(origin).children(".price").val();
	description = $(origin).children(".descriptionInput").val();

	var testString = '<div>\
	<p>'+name+'</p>\
	<p>Rating: '+rating+' by ___ guests</p>\
	<p>Rooms from '+price+'</p>\
	<p><a href="example.com">See more...</a></p>\
	</div>'

	//outer div
	var newRes = $('<div class="result"></div>');
	//volcano image
	var newImg = $('<div class="image"></div>');
	newRes.append(newImg);
	//main body
	var newInfo = $('<div class="information"></div>');
	//hotel name
	var newHeader = $("<h3>"+name+"</h3>");
	newInfo.append(newHeader);
	//contains p elements: rating and how many reviews
	var newReview = $('<div class="review"></div>');
	var newRating = $("<p class=\"rating\">"+rating+"</p>");
	var newReviewCount = $("<p><a href=\"reviews.com\">___ reviews</a></p>");
	newReview.append(newRating); newReview.append(newReviewCount);
	newInfo.append(newReview);
	//location of the hotel
	var newLocation = $("<p>Hotel, Somewhere</p>");
	newInfo.append(newLocation);
	//main description
	var newDescription =$('<p class="description"><i>'+description+'</i></p>');
	newInfo.append(newDescription);

	//price
	var newPrice =$('<div>Rooms start at $<span class="price">'+price+'</span>/night</div>');
	newInfo.append(newPrice);
	//facilities and amenities are default
	var newFacilities = $('<div class="amenities">\
							<p>Facilities:</p>\
							<ul>\
								<li><i class="fas fa-wifi"></i></li>\
								<li><i class="fas fa-bath"></i></li>\
							</ul>\
						</div>');
	newInfo.append(newFacilities);
	newRes.append(newInfo);

	$(".reslist").append(newRes);
	addHotelMarker(testString);
}



function showFilter() {
	$(".filter").toggle();
}

function toggleFilter() {
	$(this).parent().children("ul").toggle();
}
