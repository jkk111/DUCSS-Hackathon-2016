//https://github.com/jneill/dublinbus-api

var STOPS_URL = "http://dublinbus-api.heroku.com/stops";
var SERVICES_URL = "http://dublinbus-api.heroku.com/services";

function getStops() {
    var stopsXML;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", STOPS_URL, true);
    xhr.onload = function() {
      console.log(parseStops(this.responseText));
    }
    xhr.send();
}

function getServices() {
    var stopsXML;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", SERVICES_URL, true);
    xhr.onload = function() {
      console.log(parseStops(this.responseText));
    }
    xhr.send();
}
