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
}

var place = { lat: -34.9285, lng: 138.6007 };

var marker = new google.maps.marker({
	position: place,
	map: map
});