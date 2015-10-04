// Breadcrumbs script, orginally from http://www.danielacton.com/ with alterations.
insertCrumbs = function() { 
	var regex = /([^:]+:\/\/[^\/]+\/)(.*)/g;
	var match = regex.exec(document.location.href);
	var crumbs = document.getElementById('breadcrumbs');
	
	var aPref = '<a href="';
	var aBefore = '">';
	var aAfter = '</a>';

	var txt = '<a href="/">Mr P Sharp</a>';
	var baseUrl = match[1];
	var subUrl = '';
	var components = match[2].split('/');
	
	for (var i = 0; i < components.length; i++) {
		if (components[i].length > 0) {
            subUrl = subUrl + components[i];
            if (i!=components.length -1) { subUrl += '/'; }
			txt = txt + '&nbsp / &nbsp;'  + aPref + 
                baseUrl + subUrl + aBefore + 
				components[i].split(".")[0].replace(/-/g, ' ').replace(/_/g, ' ') + aAfter;
		}
		
	}
	crumbs.innerHTML = txt;
	
	$('#breadcrumbs a:last').click(function() {
        var text = $('#breadcrumbs a:last').prop("outerHTML");
        window.prompt ("Copy to clipboard: Ctrl+C, Enter", text);
        return false;
	    });
};
