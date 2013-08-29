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

function checkJquery() {
    if (window.jQuery) {
        main();
    } else {
        window.setTimeout(checkJquery, 100);
    }
}

function main() {
	// Load style sheet
  var url = 'http://mrpsharp.org/css/seatingplan.css';
  if (document.createStyleSheet)
  {
      document.createStyleSheet(url);
  }
  else
  {
      $('<link rel="stylesheet" type="text/css" href="' + url + '" />').appendTo('head'); 
  }

  // Mirror function

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
	var overlay = jQuery('<div id="overlay"><h1>Seating Plan</h1> \
    <p style="float:right;"><a style=" color=red; " href="#" id="clear"><< Clear >></a></p> \
    <form id="layout_form"> \
    <label for="layout">Enter number of seats in each row, separated with spaces</label> \
    <input type="text" name="layout" id="layout"/> \
    <input type="submit" value="Go!" />  \
    </form> \
    <p><a href="#" id="mirror">Mirror Page</a></p> \
    <table id="seat_table"></table></div>');
  overlay.appendTo(document.body);
  $('#mirror').hide();
  $('#clear').click(function() { $('#overlay').hide(); return false;});
  $('#overlay').focus();
  var mirror = document.getElementById('mirror');
  mirror.onclick = function() {
    for (i=0; i<rows.length; i++) {
      rows[0].parentNode.insertBefore(rows[rows.length-1], rows[i]);};
    for (row =0; row<rows.length;row++){
      cells=rows[row].getElementsByTagName('td');
      for (i=0; i<cells.length; i++) {cells[0].parentNode.insertBefore(cells[cells.length-1], cells[i])};
    };
    return false;
  }
  tbl = document.getElementById('seat_table');
  rows = tbl.getElementsByTagName('tr');
  cells = []
  maxLength = 0
  for (i=0; i<rows.length;i++){ 
    rowLength = rows[i].childNodes.length
    if (rowLength>maxLength) { maxLength = rowLength ;}
    }
  for (i=0; i<rows.length;i++){ 
    difference = maxLength - rows[i].childNodes.length
    if (difference) {
      for (j=0; j<difference; j++) {
        cell = rows[i].insertCell(-1);
        cell.className = "grayed";
      }
    }
  }

  $('#layout_form').submit(function(e) {
    e.preventDefault();
    layout_str = $('#layout').val();
    rows = layout_str.split(" ");
    $.each(rows, function() {
      rowStr = "<tr>"
      for (var i=0; i<this; i++) {
        if (names.length > 0) {
          rowStr += "<td>" + names.pop() + "</td>"
        }
      };
      rowStr += "</tr>";
      $('#seat_table').append(rowStr);
    });
    if (names.length >0) {
      alert("Not enough seats!")
    }
    $('#layout_form').hide();
    $('#mirror').show();
    var mirror = document.getElementById('mirror');
  mirror.onclick = function() {
    for (i=0; i<rows.length; i++) {
      rows[0].parentNode.insertBefore(rows[rows.length-1], rows[i]);
    };
    for (row =0; row<rows.length;row++){
      cells=rows[row].getElementsByTagName('td');
      for (i=0; i<cells.length; i++) {cells[0].parentNode.insertBefore(cells[cells.length-1], cells[i])};
    };
    return false;
  }
  tbl = document.getElementById('seat_table');
  rows = tbl.getElementsByTagName('tr');
  cells = []
  maxLength = 0
  for (i=0; i<rows.length;i++){ 
    rowLength = rows[i].childNodes.length
    if (rowLength>maxLength) { maxLength = rowLength ;}
    }
  for (i=0; i<rows.length;i++){ 
    difference = maxLength - rows[i].childNodes.length
    if (difference) {
      for (j=0; j<difference; j++) {
        cell = rows[i].insertCell(-1);
        cell.className = "grayed";
      }
    }
  }
    return false;
  });
}

checkJquery();





