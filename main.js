var railStops, busStops, luasStops;
var dropdown, busStopsDropdown, luasDropdown, luasInfo, railInfo, busInfo;
var date,hour,minute;

function getTime(){
  date = new Date();
  hour = parseInt(date.getHours());
  minute = parseInt(date.getMinutes());

}

document.addEventListener("DOMContentLoaded", function() {
  dropdown = document.getElementById("railStopsDropdown");
  busStopsDropdown = document.getElementById("busStopsDropdown");
  luasDropdown = document.getElementById("luasDropdown");
  dropdown.addEventListener("change", railListener);
  busStopsDropdown.addEventListener("change", busListener);
  luasDropdown.addEventListener("change", luasListener);
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
  getLuasStops(function(data) {
    luasStops = data;
    luasInfo = document.getElementById("luas-data");
    for(var i = 0 ; i < luasStops.length; i++) {
      var el = document.createElement("option");
      el.innerHTML = luasStops[i];
      el.value = luasStops[i];
      luasDropdown.appendChild(el);
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
        var superSafeTime = 30;
        var safeTime = 15;
        var trainNums = data[i].time.split(":");
        var difference = ((parseInt(trainNums[0]) * 60) + parseInt(trainNums[1])) - (hour * 60 + minute);
        if (difference >= superSafeTime){
            time.classList.add("green");
        } else if (difference >= safeTime){
          time.classList.add("orange");
        } else {
          time.classList.add("red");
        }
        row.appendChild(dest);
        row.appendChild(time);

        railInfo.appendChild(row);
      }
    })
  }
}

function luasListener() {
  console.log(luasDropdown.value);
  if(luasDropdown.value != "--------" && luasDropdown.value != "-RED LINE-" && luasDropdown.value != "-GREEN LINE-") {
    getLuasStopInfo(luasDropdown.value, function(data) {
      console.log(data);
      luasInfo.innerHTML = "";
      for(var i = 0 ; i < data.length; i++) {
        var row = document.createElement("tr");
        var dir = document.createElement("td");
        var dest = document.createElement("td");
        var time = document.createElement("td");
        dir.innerHTML = data[i].dir;
        dest.innerHTML = data[i].dest;
        time.innerHTML = data[i].time;
        row.appendChild(dir);
        row.appendChild(dest);
        row.appendChild(time);
        luasInfo.appendChild(row);
      }
    });
  }
}