var lat, long_;
var south_lat, west_long, north_lat, east_long;
var offset = 0.02;
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser");
    }
}
function showPosition(position) {
 //   x.innerHTML = "Latitude: " + position.coords.latitude + 
  //  "<br>Longitude: " + position.coords.longitude; 

    lat = position.coords.latitude;
    long_ = position.coords.longitude;

    south_lat = lat - offset;
    north_lat = lat + offset;
    east_long = lat + offset;
    west_long = long_ - offset;

}

function buildQuery(latitude, longitude){
	var key = "Ao5U18q_nspT-Vc6UtHWvq2XF_eCCFEVfzCmKmhXsqdB0L4lTd7HXV5RyoR8W-JJ";
	var query = "http://dev.virtualearth.net/REST/V1/Traffic/Incidents/";
    query += [south_lat,west_long,north_lat,east_long].join(",");
    query += "&key=" + key;
	
}

