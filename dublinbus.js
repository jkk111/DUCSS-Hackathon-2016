// https://github.com/jneill/dublinbus-api

var BUS_STOPS_URL = "http://dublinbus-api.heroku.com/stops";
var BUS_SERVICES_URL = "http://dublinbus-api.heroku.com/services";

function getStops() {
  var busStopsXML;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", BUS_STOPS_URL, true);
  xhr.onload = function() {
    console.log(this.responseText);
  }
  xhr.send();
}

function getBusServices() {
  var busServicesXML;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", BUS_SERVICES_URL, true);
  xhr.onload = function() {
    console.log(this.responseText);
  }
  xhr.send();
}

function parseBusStops(stops) {
  //TODO
  return parsedStops;
}

function parseBusServices(services){
  //TODO
  return parsedServices;
}
