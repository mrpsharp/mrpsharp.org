var timerId =
  countdown(
    new Date(2019,03,29,12,0,0),
    function(ts) {
      document.getElementById('exeat').innerHTML = ts.toString();
    },
    countdown.HOURS|countdown.MINUTES|countdown.SECONDS);