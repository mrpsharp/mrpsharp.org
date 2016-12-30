var goCodes = {
  'el2hw1': 'https://westminsterschool-my.sharepoint.com/personal/peter_sharp_westminster_org_uk/_layouts/15/guestaccess.aspx?guestaccesstoken=l0YGndfu4zxX1f5fuyuwWq5U7FWQ%2bWcPBfn36o9UpE0%3d&docid=0a62f8e054af8434385a3a1c6d95a6695&rev=1',
  'westminster': 'https://www.westminster.org.uk',
  'a1hw1': 'https://westminsterschool-my.sharepoint.com/personal/peter_sharp_westminster_org_uk/_layouts/15/guestaccess.aspx?guestaccesstoken=iyAhQno9k728GCWvGdE5BpT46NozKP0aMfJ%2bSvXTZ%2fI%3d&docid=0d436f931bdca4d87bfec8c5b26785f83&rev=1',
  'tyc-winter-2016': 'https://docs.google.com/spreadsheets/d/1Bn4HjvzrLdk9y8QpalSb8m6HFhSqSv49HmvaXcmomig/edit?usp=sharing',
  'd3sow': ' https://westminsterschool-my.sharepoint.com/personal/peter_sharp_westminster_org_uk/_layouts/15/guestaccess.aspx?guestaccesstoken=h6Y9m9o8871vaN1MyFHvalOkALSng5INLJbDfMy%2f2yk%3d&docid=06dbfc14e13dc4504a97b503bf459a293&rev=1'
};
var $shortcodeStatus = $('#shortcode-status')
if (location.search) {
  //console.log("parsing GET....")
  $shortcodeStatus.text('Looking up shortcode');
  var queryDict = {};
  location.search.substr(1).split("&").forEach(function(item) {
      queryDict[item.split("=")[0]] = item.split("=")[1]
  });
  var shortCode = queryDict['l'];
  if (goCodes[shortCode]) {
      $shortcodeStatus.html('Going to address: <a href="' + goCodes[shortCode] + '">'+goCodes[shortCode]+'</a>');
      document.location.href = goCodes[shortCode]
  } else if (shortCode) {
    $shortcodeStatus.text('Badly formed shortcode, redirecting to home...');
    window.setTimeout(function() {
     window.location.href = "/";
    }, 5000);
  } else {
    $shortcodeStatus.text('No shortcode specified, redirecting to home...');
    window.setTimeout(function() {
      window.location.href = "/";
    }, 5000);
  }
} else {
  $shortcodeStatus.text('No shortcode specified, redirecting to home...');
  window.setTimeout(function() {
    window.location.href = "/";
  }, 5000);
}
