// https://github.com/jneill/dublinbus-api

var BUS_STOPS = "http://dublinbus-api.heroku.com/stops";
var BUS_SERVICES = "http://dublinbus-api.heroku.com/services";

function getStops() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", BUS_STOPS, true);
    xhr.send();
}

function getServices() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", BUS_SERVICES, true);
    xhr.send();
}
