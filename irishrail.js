var STOPS_URL = "https://api.irishrail.ie/realtime/realtime.asmx/getAllStationsXML";
var TIMES_URL = "https://api.irishrail.ie/realtime/realtime.asmx/getStationDataByNameXML";

function getStops(cb) {
  var stopsXML;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", STOPS_URL, true);
  xhr.onload = function() {
    console.log(parseStops(this.responseText));
    if(cb)
      cb(parseStops(this.responseText));
    else
      throw new Error("NO CALLBACK SPECIFIED");
  }
  xhr.send();
}

function getStationData(station, cb) {
  var url = `${TIMES_URL}?StationDesc=${station}`;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = function() {
    console.log(parseStationData(this.responseText));
    if(cb)
      cb(parseStationData(this.responseText));
    else
      throw new Error("NO CALLBACK SPECIFIED");
  }
  xhr.send();
}

function parseStops(stops) {
  var parser = new DOMParser();
  var els = parser.parseFromString(stops, "text/xml");
  var stopNames = els.querySelectorAll("StationDesc");
  var stopLon = els.querySelectorAll("StationLatitude");
  var stopLat = els.querySelectorAll("StationLatitude")
  var stopNamesParsed = [];
  for(var i = 0 ; i < stopNames.length; i++) {
    stopNamesParsed.push({ name: stopNames[i].innerHTML, lon: stopLon[i].innerHTML, lat: stopLat[i].innerHTML});
  }
  console.log(stopNamesParsed.length)
  return stopNamesParsed;
}

function parseStationData(data) {
  var parser = new DOMParser();
  var els = parser.parseFromString(data, "text/xml");
  var destinations = els.querySelectorAll("Destination");
  var arrivalTime = els.querySelectorAll("Exparrival");
  var type = els.querySelectorAll("Trainstype");
  var trains = [];
  for(var i = 0; i < destinations.length; i++) {
    trains.push({dest: destinations[i].innerHTML, arrivalTime: arrivalTime[i].innerHTML, type: type[i].innerHTML});
  }
  return trains;
}