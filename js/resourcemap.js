var map;
var addressBar;

 
function init() {
   var mapOptions = {
      center: new google.maps.LatLng(43.020054,-83.693008),
      zoom: 9,
      mapTypeId: 'roadmap',
   };

   map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

   // a new Info Window is created
   addressBar = new google.maps.InfoWindow();

   // close the Info Window with a click on the map
   google.maps.event.addListener(map, 'click', function() {
      addressBar.close();
   });
	
   
	// function called to create markers
   createMarkers();
	
}
google.maps.event.addDomListener(window, 'load', init);




function createMarkers(){

   // this variable sets the map bounds according to markers position
   var bounds = new google.maps.LatLngBounds();
   
   // for loop traverses markersData array calling createMarker function for each marker 
   for (var i = 0; i < markersData.length; i++){

	
      addAdressesToMap(i);

      // marker position is added to bounds variable
      bounds.extend(latlng);  
   }

   // Finally the bounds variable is used to set the map bounds
   // with fitBounds() function
   map.fitBounds(bounds);
}
//STEVE
function addAdressesToMap(i){
	var addresses = firebase.database().ref('Resources').orderByKey();
	addresses.once('value', function(snapshot){
  	var addressArray = new Array();
  	snapshot.forEach(function(childSnapshot){
  	var addr = childSnapshot.key;
  	var childData = addr;
  	addressArray.push(childData);
  })
  createmap(addressArray, i);  
})
  
}
//STEVE
//currently testing using name1 all other values created here aren't used
//instead just passing values from arry through
//name1 being set to one to avoid errors from being null during testing
//name1 will output on all markers on map for testing purposes
function createmap(aArray, i){
	
	  var ref1 = firebase.database().ref('Resources').child(aArray[i]);
	  ref1.once('value', function(snapshot){
      var refval = snapshot.val();
      var address = refval.address;
	  //var latlng = refval.latlng;
	  var lat = refval.lat;
	  var lng = refval.lng;
      var name = refval.name;
      var phone = refval.phone;
	  var type = refval.type;
	  var latlng = new google.maps.LatLng(lat, lng);
	  createMarker(latlng, name, address, phone, type)
    })
  
}

// creates marker and set Info Window content
function createMarker(latlng, name, address, phone, type){
   if (type ==="Office Space"){
		   var marker = new google.maps.Marker({
			  map: map,
			  position: latlng,
			  title: name,
			  icon: "img/GMM/space.png"
		   });
   }
		else if (type ==="Business Consultation"){
			var marker = new google.maps.Marker({
			  map: map,
			  position: latlng,
			  title: name,
			  icon: "img/GMM/Business Consultation.png"
		   });
		}
		else if (type === "Business Resource"){
			var marker = new google.maps.Marker({
				  map: map,
				  position: latlng,
				  title: name,
				  icon: "img/GMM/financial.png"
			   });
		}
		else if (type ==="Information Resource"){	   
			var marker = new google.maps.Marker({
				  map: map,
				  position: latlng,
				  title: name,
				  icon: "img/GMM/Information.png"
			   });
		}
		else if (type === "Legal"){
			var marker = new google.maps.Marker({
				  map: map,
				  position: latlng,
				  title: name,
				  icon: "img/GMM/legal.png"
			   });
		}
		else{
			var marker = new google.maps.Marker({
				  map: map,
				  position: latlng,
				  title: name,
				  icon: "img/GMM/contract.png"
			   });
   }		   
   //click on a marker
   google.maps.event.addListener(marker, 'click', function() {
      
      //insert info to addressBar
      var iwContent = '<div id="iw_container">' +
            '<div class="iw_title">' + name + '</div>' +
         '<div class="iw_content">' + address + '<br />' +
         phone + '</div></div>';
      
      // including content to the Info Window.
      addressBar.setContent(iwContent);

      // open the Info Window at the current marker location.
      addressBar.open(map, marker);
   });
}
