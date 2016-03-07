<!DOCTYPE html>
<!-- HTML5 Hello world by kirupa - http://www.kirupa.com/html5/getting_your_feet_wet_html5_pg1.htm -->
<html lang="en-us">

<head>
<meta charset="utf-8">
<title>French Revolutionary Time</title>
<style type="text/css">
#mainContent {
	font-family: Arial, Helvetica, sans-serif;
	font-size: xx-large;
	font-weight: bold;
	border-radius: 4px;
	padding: 10px;
	text-align: center;
}

h2 {
	font-size: large;
	text-align: left;
}


</style>
</head>

<body onload="setClock()">
<div id="mainContent">
	<h2>Local French Revolutionary Time</h2>
	<p id="timeClock">?</p>
</div>
<script>
var theTime = document.getElementById("timeClock");


function setClock() {
	var now=new Date();
    var decimalTime=Math.round(100000*(now.getHours()*3600+now.getMinutes()*60+now.getSeconds()+now.getMilliseconds()*0.001)/86400);
    var decimalText=String("000000"+decimalTime).slice(-5);
    decimalTextLong=decimalText.slice(0,1)+":"+decimalText.slice(1,3)+":"+decimalText.slice(3,5);
    decimalTimeShort=decimalText.slice(0,1)+":"+decimalText.slice(1,3);
    theTime.innerHTML = decimalTextLong;
    document.title="frt: "+decimalTimeShort;
    var t = setTimeout(function(){setClock()},400);
}
</script>

</body>
</html>
