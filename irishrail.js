var STOPS_URL = "https://api.irishrail.ie/realtime/realtime.asmx/getAllStationsXML";
var TIMES_URL = "https://api.irishrail.ie/realtime/realtime.asmx/getStationDataByNameXML";
var MAX_WAIT = 30;
var pending;

function getRailStops(cb) {
  var stopsXML;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", STOPS_URL, true);
  xhr.onload = function() {
    if(cb)
      cb(parseRailStops(this.responseText));
    else
      throw new Error("NO CALLBACK SPECIFIED");
  }
  xhr.send();
}

function getRailStationData(station, maxWait, cb) {
  if(typeof maxWait === "function") {
    cb = maxWait;
    maxWait = undefined;
  }
  if(pending) {
    pending.abort();
  }
  var url = `${TIMES_URL}?StationDesc=${station}` + (maxWait != undefined ? `&${maxWait}` : "");
  var xhr = new XMLHttpRequest();
  pending = xhr;
  xhr.open("GET", url, true);
  xhr.onload = function() {
    pending = undefined;
    if(cb)
      cb(parseRailStationData(this.responseText, station));
    else
      throw new Error("NO CALLBACK SPECIFIED");
  }
  xhr.send();
}

function parseRailStops(stops) {
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
  stopNamesParsed.sort(function(a, b) {
    if(a.name > b.name) return 1;
    else if(a.name == b.name) return 0;
    return -1;
  })
  return stopNamesParsed;
}

function parseRailStationData(data, name) {
  var parser = new DOMParser();
  var els = parser.parseFromString(data, "text/xml");
  var destinations = els.querySelectorAll("Destination");
  var departTime = els.querySelectorAll("Expdepart");
  var arrivalTime = els.querySelectorAll("Exparrival");
  var type = els.querySelectorAll("Traintype");
  var trains = [];
  for(var i = 0; i < destinations.length; i++) {
    if(destinations[i].innerHTML !== name)
      trains.push({dest: destinations[i].innerHTML, time: (arrivalTime[i].innerHTML == "00:00" ? departTime[i].innerHTML : arrivalTime[i].innerHTML), type: type[i].innerHTML});
  }
  return trains;
}
