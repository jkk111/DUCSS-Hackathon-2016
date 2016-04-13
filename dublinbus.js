var BUS_API_URL = "https://data.dublinked.ie/cgi-bin/rtpi/realtimebusinformation";
var BUS_STOP_URL = "https://data.dublinked.ie/cgi-bin/rtpi/busstopinformation?format=json";
var pending;

function getBusStops(cb) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", BUS_STOP_URL, true);
  xhr.onload = function() {
    cb(JSON.parse(this.responseText).results)
  }
  xhr.send();
}

function getBusStopInfo(stopid, cb) {
  var xhr = new XMLHttpRequest();
  if(pending)
    pending.abort();
  var url = `${BUS_API_URL}?stopid=${stopid}&format=json`;
  xhr.open("GET", url, true);
  xhr.onload = function() {
    var res = JSON.parse(this.responseText);
    cb(res);
  }
  xhr.send();
  pending = xhr;
}
