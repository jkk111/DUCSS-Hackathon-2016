var stops = [
  "-RED LINE-",
  "Saggart",
  "Fortunestown",
  "Citywest Campus",
  "Cheeverstown",
  "Fettercairn",
  "Tallaght",
  "Hospital",
  "Cookstown",
  "Belgard",
  "Kingswood",
  "Red Cow",
  "Kylemore",
  "Bluebell",
  "Blackhorse",
  "Drimnagh",
  "Goldenbridge",
  "Suir Road",
  "Rialto",
  "Fatima",
  "James's",
  "Heuston",
  "Museum",
  "Smithfield",
  "Four Courts",
  "Jervis",
  "Abbey Street",
  "Connolly",
  "Busáras",
  "George's Dock",
  "Mayor Square - NCI",
  "Spencer Dock",
  "The Point",
  "-GREEN LINE-",
  "St. Stephen's Green",
  "Harcourt",
  "Charlemont",
  "Ranelagh",
  "Beechwood",
  "Cowper",
  "Milltown",
  "Windy Arbour",
  "Dundrum",
  "Balally",
  "Kilmacud",
  "Stillorgan",
  "Sandyford",
  "Central Park",
  "Glencairn",
  "The Gallops",
  "Leopardstown Valley",
  "Ballyogan Wood",
  "Carrickmines",
  "Laughanstown",
  "Cherrywood",
  "Brides Glen"
]

var pendingIn, pendingOut;

function getLuasStops(cb) {
  cb(stops);
}

function isOutbound(el) {
  var cl = el.parentElement.classList || [];
  for(var i = 0 ; i < cl.length; i++) {
    if(cl[i].indexOf("Outbound") != -1)
      return true;
  }
  return false;
}

function getLuasStopInfo(stop, cb) {
  var haveInbound = false;
  var haveOutbound = false;
  var validInbound = [];
  var validOutbound = [];
  if(pendingIn)
    pendingIn.abort();
  if(pendingOut)
    pendingOut.abort();
  var base = `https://www.luas.ie/luaspid.html?get=${stop}`;
  ["Inbound", "Outbound"].forEach(function(dir) {
    var url = `${base}&direction=${dir}`;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    if(dir === "Inbound")
      pendingIn = xhr;
    else
      pendingOut = xhr;
    xhr.onload = function() {
      console.log(this.responseText);
      var el = document.createElement("el");
      el.innerHTML = this.responseText;
      var locs = el.getElementsByClassName("location");
      console.log(locs);
      for(var i = 0; i < locs.length; i++) {
        var item = {};
        item.dest = locs[i].innerHTML;
        item.time = locs[i].nextSibling.innerHTML;
        item.dir = dir;
        if(dir === "Inbound") {
          validInbound.push(item);
          haveInbound = true;
        }
        else {
          validOutbound.push(item);
          haveOutbound = true;
        }
        if(haveInbound && haveOutbound) {
          pendingIn = null;
          pendingOut = null;
          cb(validInbound.concat(validOutbound));
        }
      }
    }
    xhr.send();
  });
}