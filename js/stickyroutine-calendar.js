var gTaskBackgroundColor = {};
var gCalendar = null;



function toCalendarDateFormat(date)
{
	//var result = date.toISOString();
	//return result.substr(0, 10);

	var result = date.getFullYear().toString() + '-';
	var month = (date.getMonth() + 1).toString();
	if (month.length === 1)
		result += '0';
	result += month + '-';
	var d = date.getDate().toString();
	if (d.length === 1)
		result += '0';
	result += d ;

	return result;

}



function prepareRoutineCalendarData(routine, data)
{
	if (routine !== null && (routine instanceof Routine))
	{
		var color = getRandomColor();
		var tmp = new Date();
		tmp = new Date(tmp.getFullYear(), 0 ,1);

		var timeStr = "";

		if (routine.getIsReminderActive())
		{
			timeStr = "T" + routine.getReminder() + ":00";
		}

		for (var i = 0; i < 365; i++)
		{
			if(routine.isExpected(tmp))
			{
				var e = toCalendarDateFormat(tmp) + timeStr;
				var s = toCalendarDateFormat(tmp) + timeStr;
				var src = {
					backgroundColor: color,
					borderColor: color,
					id: routine.id(),
					title: routine.getCaption(),
					start: s,
					end: e,
					durationEditable: false,
					startEditable: false,
					editable: false,
					className: routine.id()
				};
				data.push(src);
			}


			tmp = new Date(tmp.getTime() + 86400000);
		} 
		
	}
}

function extractProjectCalendarData()
{
	var result = [];
	for (var i = 1; i < 6; i++)
	{
			result.push(
				{
					dow : [i],
					start : "06:00",
					end : "22:00"
				}
			);
	}

	return result;
}



function buildCalendar()
{

	var data = [];

	for (key in HABITS)
	{
		var routine = HABITS[key];
		if (routine !== null && (routine instanceof Routine))
		{
			prepareRoutineCalendarData(routine, data);
		}
	}


	if (gCalendar === null)
	{
		setTimeout(
			function()
			{
				gCalendar = $('#project-calendar').fullCalendar({
					header: {
						left: 'prev,next today',
						center: 'title',
						right: 'month,agendaWeek,agendaDay,listWeek'
					},
					businessHours: extractProjectCalendarData(),
					eventBackgroundColor : "#0dceb0",
					eventBorderColor : "#1ddec0",
					navLinks: true, // can click day/week names to navigate views
					editable: false,
					eventLimit: true, // allow "more" link when too many events
					events: data,
					nowIndicator: true
				});

				
			}
			,
			50
		);
	}
	else
	{
		//gCalendar.fullCalendar('updateEvents', data);
		gCalendar.fullCalendar('removeEvents');
		gCalendar.fullCalendar('addEventSource', data);
		

	}


}