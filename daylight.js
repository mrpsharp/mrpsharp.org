document.addEventListener('DOMContentLoaded', function () {
  getPosition(calcTimes);
}, false);

function getPosition (callback) {
  // First attempt to get the latitude and longitude from the browser, fallback on London
  var latitude;
  var longitude;
  var output = document.getElementById("output");
  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
  return;
  }
  function success(position) {
    latitude  = position.coords.latitude.toFixed(1);
    longitude = position.coords.longitude.toFixed(1);

    output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';
    callback(latitude, longitude);
  }

  function error() {
    output.innerHTML = "Unable to retrieve your location, using London instead";
    latitude  = 51.5;
    longitude = -0.1;
    callback(latitude, longitude);
  }

  output.innerHTML = "<p>Locating…</p>";

  navigator.geolocation.getCurrentPosition(success, error);
}

function calcTimes(latitude, longitude, callback) {
  // Calculate values of sunrise, noon and sunset for the year.
  var year = 2017;
  var dates = [];
  for (var month=0;month<12;month++){
    for (var day=1;day<30;day+=1) {
      dates.push(new Date(year,month,day));
    }
  }
  var riseTimes = [];
  var noonTimes = [];
  var setTimes = [];
  for (var i=0;i<dates.length;i++) {
    var times = SunCalc.getTimes(dates[i], latitude, longitude);
    var sunRise = times.sunrise;
    var noonTime = times.solarNoon;
    var sunSet = times.sunset;
    sunRise.setFullYear(2010,0,1);
    noonTime.setFullYear(2010,0,1);
    sunSet.setFullYear(2010,0,1);
    riseTimes.push(sunRise);
    noonTimes.push(noonTime);
    setTimes.push(sunSet);
  }

  // Now plot the times
  var riseTrace = {
    x: dates,
    y: riseTimes,
    type: 'scatter',
    name: 'Sunrise'
  };
  var noonTrace = {
    x: dates,
    y: noonTimes,
    type: 'scatter',
    name: 'Noon'
  };
  var setTrace = {
    x: dates,
    y: setTimes,
    type: 'scatter',
    name: 'Sunset'
  };

  var data = [riseTrace, noonTrace, setTrace];
  var layout = {
    xaxis: {
      title: "Date",
    },
    yaxis: {
      title: "Time",
      tickformat: ("%H:%M")
    }
  }
  Plotly.newPlot('graphDiv', data, layout);
}
