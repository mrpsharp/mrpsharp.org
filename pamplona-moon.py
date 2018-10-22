import ephem, pytz, datetime
from datetime import datetime, timedelta, date, time
from pytz import timezone

# Date iterator
def daterange(start_date, end_date):
    for n in range(int ((end_date - start_date).days)):
        yield start_date + timedelta(n)

def cardinal(az):
    directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
    index = int((az+22.5%360)/45)
    if index > 7:
        index = 0
    return directions[index]
# Set constants
utc = pytz.utc
local = timezone('Europe/Madrid')
moon = ephem.Moon()
pamplona = ephem.Observer()
pamplona.lat = '42.8'
pamplona.lon = '-1.69'

def calcmoon(indate):
    localtime = local.localize(indate)
    utctime = localtime.astimezone(utc)
    pamplona.date = utctime
    moon.compute(pamplona)
    #print("%s %0.f %0.f" % (pamplona.date,moon.alt * 57.3, moon.az * 57.3))
    datelist = pamplona.date.triple()
    moondate = date(int(datelist[0]),int(datelist[1]),int(datelist[2]))
    return {'date':moondate, 'alt':moon.alt * 57.3, 'az':moon.az * 57.3}

start = date(2018,10,22)
end = date(2019,7,1)
time = time(9,30)
print("<table>")
print(" <tr><th>Date</th><th>Direction (&deg;)</th><th>Altitude (&deg;)</th></tr>")
for singledate in daterange(start, end):
    singledatetime = datetime.combine(singledate, time)
    calcs = calcmoon(singledatetime)
    print(' <tr><td>{:%d/%m/%y}</td>'.format(calcs['date']),end='')
    if calcs['alt'] > 0:
        print('<td>{:0.0f} ({})</td><td>{:0.0f}</td></tr>'.format(calcs['az'],cardinal(calcs['az']),calcs['alt']))
    else:
        print('<td colspan=2>Moon below horizon</td></tr>')
print("</table>")
