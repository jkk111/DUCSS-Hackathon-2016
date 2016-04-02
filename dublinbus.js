var BUS_API_URL = "https://data.dublinked.ie/cgi-bin/rtpi/busstopinformation";

function getBusStopInfo(stopid) {
  var xmlhttp = new XMLHttpRequest();
  var url = `${BUS_API_URL}?stopid=${stopid}&format=json`;
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
  console.log(this.responseText);
}
