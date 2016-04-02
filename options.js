function save_options() {
  var preferedStop = document.getElementById('preferedStop').value;
  var preferedRoute = document.getElementById('preferedRoute').value;
  var travelTime = document.getElementById('travelTime').value;
  var finishTime = document.getElementById('finishTime').value;
  chrome.storage.sync.set({
    preferedStop: preferedStop,
    preferedRoute: preferedRoute,
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

function restore_options() {
  chrome.storage.sync.get({
    preferedStop: 0;
    preferdRoute: 0;
    travelTime: null,
    finishTime: null
  }, function(items) {
    document.getElementById('preferedStop').value = items.preferedStop;
    document.getElementById('preferedRoute').value = items.preferedRoute;
    document.getElementById('travelTime').value = items.travelTime;
    document.getElementById('finishTime').checked = items.finishTime;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
