#!/usr/local/bin/python
from __future__ import print_function
import sys,json,collections

cover_file = open('cover.json','r')
cover = json.load(cover_file)
fields = collections.OrderedDict([("Term",""), ("Week",""), ("Day",""), ("Lesson",""), ("Coverer","")])
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