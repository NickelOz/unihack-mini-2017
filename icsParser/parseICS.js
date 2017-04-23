/**
 * Created by Draga on 22/04/2017.
 */

var PRE_READING_HOURS = 2;
var POST_CLASS_STUDY = 4;

var iCalendarData = "";
var current_events = [];
var unitNameArray = [];
var freeTimes = [];

function handle_submit(){
    $.ajax({
        success:function(data){
            iCalendarData = data;
            parseICS(iCalendarData);
            getFreeTimes();
            addStudyTimes();
        },
        url: 'calendar_files/timetable.ics'
    });
}

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

function getFreeTimes(){
    var monSched = [];
    var tuesSched = [];
    var wedSched = [];
    var thurSched = [];
    var friSched = [];
    for (i = 0; i < current_events.length; i++){
        var currentEvent = current_events[i];
        var currentEventStart = moment(currentEvent[1], "YYYY-MM-DDTHH:mm:ss");
        if (currentEventStart.format('dddd') == 'Monday'){
            monSched.push(currentEvent);
        }
        else if (currentEventStart.format('dddd') == 'Tuesday'){
            tuesSched.push(currentEvent);
        }
        else if (currentEventStart.format('dddd') == 'Wednesday'){
            wedSched.push(currentEvent);
        }
        else if (currentEventStart.format('dddd') == 'Thursday'){
            thurSched.push(currentEvent);
        }
        else if (currentEventStart.format('dddd') == 'Friday'){
            friSched.push(currentEvent);
        }

    }
    var dayScheds = [monSched, tuesSched, wedSched, thurSched, friSched];
    for (k = 0; k < dayScheds.length; k++){
        var currentSched = dayScheds[k];
        var dayStart = currentSched[0][1].clone().set('hour', 9);
        var dayEnd = currentSched[0][1].clone().set('hour', 19);
        for (j = 0; j < currentSched.length; j ++){
            var event = currentSched[j];
            var eventEnd = event[2].clone();
            var diffEventDayEnd = dayEnd.diff(eventEnd, 'hour');
            if (diffEventDayEnd >= 1){
                var freeStart = eventEnd.clone();
                var freeEnd = eventEnd.clone().add(diffEventDayEnd, 'h');
                freeTimes.push([freeStart, freeEnd]);
            }
            dayEnd = event[1].clone();
        }
        var diffDayStartEvent = dayEnd.diff(dayStart, 'hour');
        if (diffDayStartEvent >= 1){
            freeStart = dayStart.clone();
            freeEnd = dayStart.clone().add(diffDayStartEvent, 'h');
            freeTimes.push([freeStart, freeEnd]);
        }
    }


}

function addStudyTimes() {
    for (i = 0; i < unitNameArray.length; i++){
        readingTimes = PRE_READING_HOURS;
        postClassTimes = POST_CLASS_STUDY;

        for (k = 0; k < )
    }
}
