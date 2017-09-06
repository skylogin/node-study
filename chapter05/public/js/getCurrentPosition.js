function getCurrentPosition(){
  //check the supporting for browser/navigator
  if(navigator.geolocation){
    var options = {
      enableHighAccuracy: true,
      timeout: Infinity,
      maximumAge: 0
    };
    navigator.geolocation.watchPosition(getUserPosition, trackError, options);
  } else{
    alert('Ops; Geolocation is not supported');
  }

  //bring the user location and display icon on map
  function getUserPosition(position){
    //check latitude, longitude
    console.log(position.coords.latitude, position.coords.longitude);
    var googlePos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var mapOptions = {
      zoom: 12,
      center: googlePos,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    //setting get variable HTML div
    var mapObj = document.getElementById('map');
    //create the map and passing: map div & map options
    var googleMap = new google.maps.Map(mapObj, mapOptions);

    //setting marker that user location on map
    var markerOption = {
      map: googleMap,
      position: googlePos,
      animation: google.maps.Animation.DROP
    };

    //create marker instance on map
    var googleMarker = new google.maps.Marker(markerOption);
    //bring completly user location using Geocoder
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
      'latLng': googlePos
    }, function(results, status){
      if(status == google.maps.GeocoderStatus.OK){
        if(results[1]){
          var popOpts = {
            content: results[1].formatted_address,
            position: googlePos
          };

          //settind user information window
          var popup = new google.maps.InfoWindow(popOpts);
          google.maps.event.addListener(googleMarker, 'click', function(){
            popup.open(googleMap);
          });
        } else{
          alert('No results found');
        }
      } else{
        alert('Uhh, failed: ' + status);
      }
    });
  }

  //error
  function trackError(error){
    var err = document.getElementById('map');
    switch(error.code){
      case error.PERMISSION_DENIED:
        err.innerHTML = 'User denied Geolocation';
        break;
      case error.POSITION_UNAVAILABLE:
        err.innerHTML = 'Information is unavailable';
        break;
      case error.TIMEOUT:
        err.innerHTML = 'Location timed out';
        break;
      case error.UNKNOWN_ERROR:
        err.innerHTML = 'An unknown error';
        break;
    }
  }
}

getCurrentPosition();