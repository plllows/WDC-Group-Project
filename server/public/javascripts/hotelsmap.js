function initMap() {
        var Experience_Bella_Hotel_Apartments = {lat: -37.8257632, lng: 144.95962029999998};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15,
          center: Experience_Bella_Hotel_Apartments
        });


        var marker = new google.maps.Marker({
          position: Experience_Bella_Hotel_Apartments,
          map: map
        });
      }




