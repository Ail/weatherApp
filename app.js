var APPID = "9b8c65403e5477ca3f0e64e3691a6d76";
var temp;
var loc;
var icon;
var humidity;
var wind;
var direction;
var city = '';

function setFormData() {
 	city = document.weatherForm.city.value;
}

function getFormData() {
	return city;
}

function search(){
	setFormData();
	sendRequest();
	return false;
}

function sendRequest() {
	var xhReq = new XMLHttpRequest();
	xhReq.open("GET", "http://api.openweathermap.org/data/2.5/weather?appid=" + APPID + "&q=" + getFormData(), false);
	xhReq.send(null);
	var serverResponse = xhReq.responseText;
	update(JSON.parse(serverResponse));
}

function degreesToDirection(degrees) {
  var range = 360/16;
  var low = 360 - range/2;
  var high = (low + range) % 360;
  var angles = ["N","NNE","ENE","E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  for (i in angles) {
    if(degrees >= low && degrees < high)
      return angles[i];
    low = (low + range) % 360;
    high = (high + range) % 360;
  }
  return "N";
}

function update(weather){
  wind.innerHTML = weather.wind.speed;
  direction.innerHTML = degreesToDirection(weather.wind.deg);
  humidity.innerHTML = weather.main.humidity;
  loc.innerHTML = weather.name;
  temp.innerHTML = Math.round(weather.main.temp - 273.15);
  icon.innerHTML = "imgs/codes/" + weather.weather[0].icon + ".png"
}

window.onload = function() {
  temp = document.getElementById("temperature");
  loc = document.getElementById("location");
  icon = document.getElementById("icon");
  humidity = document.getElementById("humidity");
  wind = document.getElementById("wind");
  direction = document.getElementById("direction");

}
