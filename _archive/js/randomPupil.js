// shuffle from http://stackoverflow.com/questions/2450954/how-to-randomize-a-javascript-array
function shuffle(array) {
  var currentIndex = array.length
    , temporaryValue
    , randomIndex
    ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Load jquery
(function(){
  var newscript = document.createElement('script');
     newscript.type = 'text/javascript';
     newscript.async = true;
     newscript.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js';
  (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(newscript);
  var newscript = document.createElement('script');
     newscript.type = 'text/javascript';
     newscript.async = true;
     newscript.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js';
  (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(newscript);
})();

function jqueryLoaded() {
	$cells = $("td:contains('Name')").parent().siblings().children("td:first-child"); // get name cells plus bottom
	var names = [];
	$cells.each(function() {
		if ($(this).text().charAt(0) == '(') {
			return false;
		} else {
			names.push($(this).text());
		}
	});
	shuffle(names);
	alert(names[0])
}

function checkJquery() {
    if (window.jQuery) {
        jqueryLoaded();
    } else {
        window.setTimeout(checkJquery, 100);
    }
}
checkJquery();





