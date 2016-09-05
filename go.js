if (location.search) {
  var goCodes = {
      'electricity-ii-hw-1': 'https://westminsterschool-my.sharepoint.com/personal/peter_sharp_westminster_org_uk/_layouts/15/guestaccess.aspx?guestaccesstoken=l0YGndfu4zxX1f5fuyuwWq5U7FWQ%2bWcPBfn36o9UpE0%3d&docid=0a62f8e054af8434385a3a1c6d95a6695&rev=1',
  };
  var queryDict = {};
  location.search.substr(1).split("&").forEach(function(item) {
      queryDict[item.split("=")[0]] = item.split("=")[1]
  });
  var shortCode = queryDict['go'];
  if (goCodes[shortCode]) {
      document.write('going to new location....');
      document.location.href = goCodes[shortCode]
  } else if (shortCode) {
      alert('Error: shortcode undefined')
  }
}
