var preferredBusData = [];
var preferredRailData = [];
function save_options() {
  var preferedStop = document.getElementById('preferedStop').value;
  var preferedRoute = document.getElementById('preferedRoute').value;
  var travelTime = document.getElementById('travelTime').value;
  var finishTime = document.getElementById('finishTime').value;
  chrome.storage.sync.set({
    preferedStop: preferedStop,
    preferedTrain: preferredRailData,
    travelTime: travelTime,
    finishTime: finishTime
  }, function() {
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function addRail() {
  var val = document.getElementById("railStopsDropdown").value
  preferredRailData.push(val);
}

function restore_options() {
  chrome.storage.sync.get({
    preferredBus: [],
    preferedTrain: [],
    travelTime: null,
    finishTime: null
  }, function(items) {
    var preferredBusStops = document.getElementById("preferredBusStops");
    var preferredTrainStops = document.getElementById("preferredRailStops");
    var busStopsDropdown = document.getElementById("busStopsDropdown");
    var railStopsDropdown = document.getElementById("railStopsDropdown");
    preferredRailData = items.preferedTrain;
    getBusStops(function(busStops) {
      busStops = busStops.results
      for(var i = 0 ; i < busStops.length; i++) {
        var el = document.createElement("option");
        el.innerHTML = busStops[i].stopid;
        el.value = i;
        busStopsDropdown.appendChild(el);
      }
    })
    getRailStops(function(railStops) {
      for(var i = 0 ; i < railStops.length; i++) {
        var el = document.createElement("option");
        el.innerHTML = railStops[i].name;
        el.value = railStops[i].name;
        railStopsDropdown.appendChild(el);
      }
    })
    document.getElementById('save').addEventListener('click', save_options);
    document.getElementById('addRail').addEventListener('click', addRail);
    document.getElementById('addBus').addEventListener('click', addBus);
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
