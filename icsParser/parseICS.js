/**
 * Created by Draga on 22/04/2017.
 */


var iCalendarData = '';
var current_events = [];

$.ajax({
    success:function(data){
        iCalendarData = data;
        parseICS(iCalendarData)
    },
    url: '../calendar_files/timetable.ics'
});

function parseICS(iCalendarData) {
    var jcalData = ICAL.parse(iCalendarData);
    var vcalendar = new ICAL.Component(jcalData);
    var vevent = vcalendar.getAllSubcomponents('vevent');
    for (var i = 0; i < vevent.length; i++) {
        var current_event = new ICAL.Event(vevent[i]);
        var startDT = current_event.startDate;
        startDT = moment(startDT, "YYYY-MM-DD HH:mm:ss");
        var endDT = current_event.endDate;
        endDT = moment(endDT, "YYYY-MM-DD HH:mm:ss");
        event_array = [startDT, endDT];
        current_events.push(event_array);

    }
    alert(current_events);

}
