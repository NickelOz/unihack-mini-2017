/**
 * Created by Draga on 22/04/2017.
 */


var iCalendarData = '';
var current_events = [];
var unitNameArray = [];

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
    var tempCurrentEvents = [];
    for (var i = 0; i < vevent.length; i++) {
        var current_event = new ICAL.Event(vevent[i]);
        var startDT = current_event.startDate;
        startDT = moment(startDT, "YYYY-MM-DDTHH:mm:ss");
        var endDT = current_event.endDate;
        endDT = moment(endDT, "YYYY-MM-DDTHH:mm:ss");
        //TODO: parse unit name, parse desc.
        var summary = current_event.summary;
        event_array = [summary, startDT, endDT];
        tempCurrentEvents.push(event_array);

        var nameDescArray = summary.split(" - ");
        if ($.inArray(nameDescArray[0], unitNameArray) == -1){
            unitNameArray.push(nameDescArray[0]);
        }
    }
    var firstStartDate = tempCurrentEvents[tempCurrentEvents.length - 1][1];
    firstStartDate = moment(firstStartDate, "YYYY-MM-DDTHH:mm:ss");
    var finalStartDate = firstStartDate.add(1, 'w');
    for (var j=0; j < tempCurrentEvents.length; j++){
        var currentStartDate = tempCurrentEvents[j][1];
        currentStartDate = moment(currentStartDate, "YYYY-MM-DDTHH:mm:ss");
        if (currentStartDate.isBefore(finalStartDate, 'd')){
            current_events.push(tempCurrentEvents[j]);
        }

    }
}
