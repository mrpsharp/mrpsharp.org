var goCodes = {
  'WHW' : 'https://drive.google.com/open?id=1vJXtP076R_a2DFcuIKCIiqaZwp5P6K5d&usp=sharing'
};

function go(shortCode) {
  if (goCodes[shortCode]) {
      $shortcodeStatus.html('Going to address: <a href="' + goCodes[shortCode] + '">'+goCodes[shortCode]+'</a>');
      document.location.href = goCodes[shortCode]
  } else if (shortCode) {
    $shortcodeStatus.text('Badly formed shortcode, redirecting to home...');
    window.setTimeout(function() {
     window.location.href = "https://www.mrpsharp.org";
    }, 5000);
  }
}
var $shortcodeStatus = $('#shortcode-status')
if (location.search) {
  //console.log("parsing GET....")
  $shortcodeStatus.text('Looking up shortcode');
  var queryDict = {};
  location.search.substr(1).split("&").forEach(function(item) {
      queryDict[item.split("=")[0]] = item.split("=")[1]
  });
  go(queryDict['l']);
} else if (window.location.host.split(":")[0]=="go.mrpsharp.org" && window.location.pathname.substr(1)!="") {
    go(window.location.pathname.substr(1));
} else {
    $shortcodeStatus.text('No shortcode specified, redirecting to home...');
    window.setTimeout(function() {
      window.location.href = "https://www.mrpsharp.org";
    }, 5000);
}
