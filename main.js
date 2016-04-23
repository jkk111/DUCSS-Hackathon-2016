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
  document.getElementById("railSearch").addEventListener("input", function(e) {
    updateRailItems(searchRailItems(e.target.value));
  })
  document.getElementById("luasSearch").addEventListener("input", function(e) {
    updateLuasItems(searchLuasItems(e.target.value));
  })
  document.getElementById("busSearch").addEventListener("input", function(e) {
    updateBusItems(searchBusItems(e.target.value));
  })
  dropdown.addEventListener("change", railListener);
  busStopsDropdown.addEventListener("change", busListener);
  luasDropdown.addEventListener("change", luasListener);
  getRailStops(updateRailItems)
  getLuasStops(updateLuasItems)
  getBusStops(updateBusItems)
})

function searchRailItems(q) {
  var matches = [];
  if(!railStops)
    return [];
  for(var i = 0; i < railStops.length; i++) {
    if(railStops[i].name.toLowerCase().indexOf(q.toLowerCase()) != -1) {
      matches.push(railStops[i]);
    }
  }
  return matches;
}

function searchLuasItems(q) {
  var matches = [];
  if(!luasStops)
    return [];
  for(var i = 0; i < luasStops.length; i++) {
    console.log(luasStops[i], q)
    if(luasStops[i].toLowerCase().indexOf(q.toLowerCase()) != -1) {
      console.log("pushing", luasStops[i], "for ", q);
      matches.push(luasStops[i]);
    }
  }
  return matches;

}

function updateLuasItems(data) {
  console.log(data);
  if(!luasStops)
    luasStops = data;
  luasInfo = document.getElementById("luas-data");
  luasDropdown.innerHTML = "<option>--------</option>";
  for(var i = 0 ; i < data.length; i++) {
    var el = document.createElement("option");
    el.innerHTML = data[i];
    el.value = data[i];
    luasDropdown.appendChild(el);
  }
}

function updateRailItems(data) {
  if(!railStops)
    railStops = data;
  railInfo = document.getElementById("rail-data");
  dropdown.innerHTML = "<option>--------</option>";
  for(var i = 0 ; i < data.length; i++) {
    var el = document.createElement("option");
    el.value = i;
    el.innerHTML = data[i].name;

    dropdown.appendChild(el);
  }
}

function searchBusItems(q) {
  var matches = [];
  if(!busStops)
    return [];
  for(var i = 0 ; i < busStops.length; i++) {
    if(busStops[i].stopid.toLowerCase().indexOf(q.toLowerCase()) != -1) {
      matches.push(busStops[i]);
    }
  }
  return matches;
}

function updateBusItems (data) {
  console.log(data);
  if(!busStops)
    busStops = data;
  busInfo = document.getElementById("bus-data");
  busStopsDropdown.innerHTML = "<option>--------</option>";
  for(var i = 0 ; i < data.length; i++) {
    var el = document.createElement("option");
    el.innerHTML = data[i].stopid;
    el.value = i;
    busStopsDropdown.appendChild(el);
  }
}

function busListener() {
  if(busStopsDropdown.value != "--------") {
    getBusStopInfo(busStops[busStopsDropdown.value].stopid, function(data) {
      data = data.results;
      busInfo.innerHTML = "";
      var header = document.createElement("tr");
      var el = document.createElement("th");
      el.innerHTML = "Destination";
      header.appendChild(el);
      el = document.createElement("th");
      el.innerHTML = "Route";
      header.appendChild(el);
      el = document.createElement("th");
      el.innerHTML = "Due";
      header.appendChild(el);
      busInfo.appendChild(header);
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
      var header = document.createElement("tr");
      var el = document.createElement("th");
      el = document.createElement("th");
      el.innerHTML = "Destination";
      header.appendChild(el);
      el = document.createElement("th");
      el.innerHTML = "Due";
      header.appendChild(el);
      railInfo.appendChild(header);
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
      var header = document.createElement("tr");
      var el = document.createElement("th");
      el.innerHTML = "Direction";
      header.appendChild(el);
      el = document.createElement("th");
      el.innerHTML = "Destination";
      header.appendChild(el);
      el = document.createElement("th");
      el.innerHTML = "Arrives in";
      header.appendChild(el);
      luasInfo.appendChild(header);
      for(var i = 0 ; i < data.length; i++) {
        if(data[i].dest === "No trams forecast")
          continue;
        var row = document.createElement("tr");
        var dir = document.createElement("td");
        var dest = document.createElement("td");
        var time = document.createElement("td");
        dir.innerHTML = data[i].dir;
        dest.innerHTML = data[i].dest;
        time.innerHTML = data[i].time === "DUE" ? "DUE" : data[i].time + " mins";
        row.appendChild(dir);
        row.appendChild(dest);
        row.appendChild(time);
        luasInfo.appendChild(row);
      }
    });
  }
}