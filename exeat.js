document.getElementById('top').style.cssText = "display: None";
document.getElementById('wrapper').style.cssText = "position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%)";
var timerId =
  countdown(
    new Date(2019,02,29,12,0,0,0),
    function(ts) {
      document.getElementById('exeat').innerHTML = ts.toString();
    },
    countdown.HOURS|countdown.MINUTES|countdown.SECONDS);
