var date,hour,minute;

function getTime(){
  date = new Date();
  hour = date.getHours();
  minute = date.getMinutes();
 
}

var railStops, busStops;
var dropdown, busStopsDropdown, railInfo, busInfo;
document.addEventListener("DOMContentLoaded", function() {
  dropdown = document.getElementById("railStopsDropdown");
  busStopsDropdown = document.getElementById("busStopsDropdown");
  dropdown.addEventListener("change", railListener);
  busStopsDropdown.addEventListener("change", busListener);
  getRailStops(function(data) {
    railStops = data;
    railInfo = document.getElementById("rail-data");
    for(var i = 0 ; i < data.length; i++) {
      var el = document.createElement("option");
      el.value = i;
      el.innerHTML = data[i].name;

      dropdown.appendChild(el);
    }
  })
  getBusStops(function(data) {
    busStops = data.results;
    busInfo = document.getElementById("bus-data");
    console.log(data);
    for(var i = 0 ; i < busStops.length; i++) {
      var el = document.createElement("option");
      el.innerHTML = busStops[i].stopid;
      el.value = i;
      busStopsDropdown.appendChild(el);
    }
  })
})

function busListener() {
  if(busStopsDropdown.value != "--------") {
    getBusStopInfo(busStops[busStopsDropdown.value].stopid, function(data) {
      data = data.results;
      busInfo.innerHTML = "";
      for(var i = 0 ; i < data.length; i++) {
        var row = document.createElement("tr");
        var dest = document.createElement("td");
        var route = document.createElement("td");
        var time = document.createElement("td");
        dest.innerHTML = data[i].destination;
        route.innerHTML = data[i].route;
        time.innerHTML = data[i].departuredatetime.substring(data[i].departuredatetime.indexOf(" ") + 1).substring(0, 5);
        row.appendChild(dest);
        row.appendChild(route);
        row.appendChild(time);
        busInfo.appendChild(row);
      }
    })
  }
}

function railListener() {
  if(dropdown.value != "--------") {
    getRailStationData(railStops[dropdown.value].name, function(data) {
      railInfo.innerHTML = "";
      for(var i = 0 ; i < data.length; i++) {
        var row = document.createElement("tr");
        var dest = document.createElement("td");
        var time = document.createElement("td");
        dest.innerHTML = data[i].dest;
        time.innerHTML = data[i].time;
        getTime();
        var nums = data[i].time.split(":");
        var hourNum = nums[0];
        var minNum = nums[1];
        if (hour==hourNum){
          if (parseInt(minNum)<parseInt(minute)+30){
            time.classList.add("red");
          }
        } else {
          time.classList.add("green");
        }
        row.appendChild(dest);
        row.appendChild(time);
        railInfo.appendChild(row);
      }
    })
  }
}
