var stops;
document.addEventListener("DOMContentLoaded", function() {
  getRailStops(function(data) {
    stops = data;
    var dropdown = document.getElementById("railStopsDropdown");
    var railInfo = document.getElementById("rail-data");
    for(var i = 0 ; i < data.length; i++) {
      var el = document.createElement("option");
      el.value = i;
      el.innerHTML = data[i].name;
      dropdown.appendChild(el);
    }
    dropdown.addEventListener("change", function() {
      if(dropdown.value != "--------") {
        getRailStationData(stops[dropdown.value].name, function(data) {
          railInfo.innerHTML = "";
          console.log(data);
          for(var i = 0 ; i < data.length; i++) {
            var row = document.createElement("tr");
            var dest = document.createElement("td");
            var time = document.createElement("td");
            dest.innerHTML = data[i].dest;
            time.innerHTML = data[i].time;
            row.appendChild(dest);
            row.appendChild(time);
            railInfo.appendChild(row);
          }
        })
      }
    })
  })
})
