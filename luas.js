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

var pending;

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
  var base = "https://www.luas.ie/luaspid.html?get=";
  base += stop;
  var xhr = new XMLHttpRequest();
  if(pending)
    pending.abort();
  xhr.open("GET", base, true);
  xhr.onload = function() {
    var el = document.createElement("div");
    el.innerHTML = this.responseText;
    var valid = [];
    var locs = el.querySelectorAll(".location");
    for(var i = 0 ; i < locs.length; i++) {
      if(locs[i].innerHTML != "No trams forecast") {
        var item = {};
        item.dest = locs[i].innerHTML;
        item.time = locs[i].nextSibling.innerHTML;
        item.dir = isOutbound(locs[i]) ? "Outbound" : "Inbound";
        valid.push(item);
        console.log(item);
      }
    }
    cb(valid)
  }
  pending = xhr;
  xhr.send();
}