#!/usr/local/bin/python
from __future__ import print_function
import sys,json,collections

cover_file = open('cover.json','r')
cover = json.load(cover_file)
fields = collections.OrderedDict([("Term","Play"), ("Week",""), ("Day",""), ("Lesson",""), ("Coverer","")])
cover_file.close()

print("Type X at start of record to exit")

done = False
while done != True:
	new = {}
	for field,val in fields.iteritems():
		text = raw_input(field + "[" + val +"]: ")
		if text == "X":
			done=True
			break
		elif text=="":
			new[field]=val
		else:
			new[field]=text
			fields[field]=text
	if done != True:
		cover.append(new)
		print("Field added.  Type X to exit")


cover_file = open('cover.json','w')
json.dump(cover, cover_file)
cover_file.close()

# Create stats json for https://google-developers.appspot.com/chart/interactive/docs/gallery/columnchart

# open file to write html to
cover_html = open('cover.html','w')

header = """---
title: Physics Department Cover
layout: default
---
<script type="text/javascript" src="https://www.google.com/jsapi"></script>
<style>h2:before {content: "";}"</style>
<h1>Physics Department Cover</h1>
"""

cover_html.write(header)

cover_html.write("<h2>Play 2013</h2>")
cover_html.write("Total this term: "+str(len(cover)))

play_weeks = [0] * 15 # ignore week 0

play_staff = { "BC":0, "PS":0, "CJRU":0, "KAPW":0, "LT":0, "HP":0, "External":0}

for p in cover:
	play_staff[p['Coverer']] += 1
	play_weeks[int(p['Week'])] += 1

divs = """
<div id="staff" style="width: 900px; height: 500px;"></div>
<div id="week" style="width: 900px; height: 500px;"></div>
"""

# print(play_weeks)
# print(play_staff)

cover_html.write(divs)

cover_html.write("""<script type="text/javascript" src="https://www.google.com/jsapi"></script>
<script type="text/javascript">
  google.load("visualization", "1", {packages:["corechart"]});
  google.setOnLoadCallback(drawCharts);
  function drawStaff() {
    var data = google.visualization.arrayToDataTable(""")

gdata = [["Staff", "Number"]]
for s,n in play_staff.iteritems():
	ds = [s,n]
	gdata.append(ds)

json.dump(gdata, cover_html)
cover_html.write(""");

    var options = {
      title: 'Staff Cover',
      hAxis: {title: 'Staff'},
      vAxis: {title: 'Number'},
      legend: {position: 'none'}
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('staff'));
    chart.draw(data, options);
  }""")



cover_html.write("""function drawWeeks() {
    var data = google.visualization.arrayToDataTable(""")

gdata = [["Week", "Number"]]
for a in range(1, len(play_weeks)):
	gdata.append([a,play_weeks[a]])

json.dump(gdata, cover_html)
cover_html.write(""");

    var options = {
      title: 'Weekly Cover',
      hAxis: {title: 'Week'},
      vAxis: {title: 'Number'},
      legend: {position: 'none'}
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('week'));
    chart.draw(data, options);
  }
function drawCharts() {
	drawStaff();
	drawWeeks();
}

</script>""")






cover_html.close()
