var STOPS_URL = "http://api.irishrail.ie/realtime/realtime.asmx/getAllStationsXML";
var TIMES_URL = "http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByNameXML";

function getStops() {
    var stopsXML;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", STOPS_URL, true);
    xhr.onload = function() {
      console.log(this.responseText);
    }
    xhr.send();
}

function getStationData(station) {
  var url = `${TIMES_URL}?StationDesc=${station}`;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.send();
}

function parseStops(stops) {
  var parser = new DOMParser();
  var els = parser.parseFromString(stops, text.xml);
  var stopNames = els.querySelectorAll("StationDesc");
  var stopNamesParsed = [];
  for(var i = 0 ; i < stopNames; i++) {
    stopNamesParsed.push(stopNames[i].innerHTML);
  }
  return stopNamesParsed;
}