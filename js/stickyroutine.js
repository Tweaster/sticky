
var NOTIFICATIONDICT = {};


function generateEntryHTML(routineObj)
{
	var entryHTML = `
			<li class="table-view-cell{4}">
				<div class="square-checkbox">
					<input type="checkbox" value="" id="{0}" name="item[]" {2}/>
					<label for="{0}"></label>
				</div>
				 {1}
				<span class="btn btn-outlined" data-source="{0}">{3}</span>
			</li>
	`;
	var today = new Date();
	var checkStr = routineObj.isChecked(today) ? "checked" : "";
	var html = String.format(
		entryHTML,
		routineObj.id(),
		routineObj.getCaption(),
		checkStr,
		routineObj.getFrequency(),
		(routineObj.isExpected(today) ? "" : " checked")
	);

	return html;
}


function reconstructListView()
{
	var today = new Date();
	var html = "";
	for (key in HABITS)
	{
		var routine = HABITS[key];
		if (routine !== null && (routine instanceof Routine))
		{
			var tmp = generateEntryHTML(routine);
			if (routine.isExpected(today))
			{
				html = tmp + html;
			}
			else
			{
				html += tmp;
			}
		}
	}

	$("ul.table-view").html(html);
	
}



function routineWorkingDaysHTML(routine)
{
	var html = `
		<div class="daily-routine-calendar">
		<div class="wd-container">
		<ul class="wd">
	`;
	var days = ["S", "M", "T", "W", "T", "F", "S"];
	for (var i = 0; i < 7; i++)
	{
		html += '<li><span class="daily-round-circle' +  (routine.isWorkingDay(i) ? ' checked' : '') + '" data-day="' + i.toString() + '" data-source="' + routine.id() + '">' + days[i] + '</span></li>';
	}

	html += "</ul></div></div>";

	return html;
}

function monthlyRoutineWorkingDaysHTML(routine)
{
	var html = '<div class="monthly-routine-calendar">';

	for (var j = 0; j < 31; j++)
	{
		html += '<div class="wd-container">';
		html += '<ul class="wd">';
		for (var i = 0; i < 7 && j < 31; i++)
		{
			html += '<li><span class="monthly-round-circle' +  (routine.isWorkingDay(j) ? ' checked' : '') + '" data-day="' + j.toString() + '" data-source="' + routine.id() + '">' + (j + 1).toString() + '</span></li>';
			j++;
		}
		j--;

		html += "</ul></div>";
	}

	html += "</div>";

	return html;
}

function intervalRoutineWorkingDaysHTML(routine)
{
	var html = `<div class="interval-routine-calendar">
				<label>Interval in between routine (in days): </label> <input type="number" class="semi-transparent-bgnd no-border" placeholder="Enter number of days..." autocomplete="off"  data-source="{0}" id="entry-interval-input" value="{1}">
			</div>`;

	return String.format(html, routine.id(), routine.getInterval().toString());
}


function reminderHTML(routine)
{
	var html = `<div class="routine-reminder">
					<input type="checkbox" value="" data-source="{0}" id="routine-reminder-checkbox" {2}/>
					<label>Reminder at: </label> <input type="time" class="semi-transparent-bgnd no-border" data-source="{0}" id="entry-reminder-input" value="{1}">
				</div>`;

	return String.format(html, routine.id(), routine.getReminder(), (routine.getIsReminderActive() ? "checked" : ""));
}


function workingDaysForRoutineHTML(routine)
{
	switch(routine.getFrequency())
	{
		case "DAILY":
			return routineWorkingDaysHTML(routine);
		case "MONTHLY":
			return monthlyRoutineWorkingDaysHTML(routine);
		case "INTERVAL":
			return intervalRoutineWorkingDaysHTML(routine);
	}
	return "";
}


function historyLogHTML(routine)
{

	var today = new Date();
	var tmp = new Date(today.getFullYear(), today.getMonth(), 1);
	while (tmp.getDay() !== 0)
	{
		tmp = new Date(tmp.getTime() - 86400000);
	}

	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


	var html = `<div class="monthly-history-log">
	<h4>` + months[today.getMonth()] + ` log</h4><hr/>`;

	while (tmp.getMonth() <= today.getMonth())
	{
		html += '<div class="wd-container">';
		html += '<ul class="wd">';

		for (var i = 0; (i < 7) && (tmp.getMonth() <= today.getMonth()) ; i++)
		{
			var day = tmp.getDate();

			var classValue = "";
			if (tmp.getMonth() !== today.getMonth())
			{
				classValue = "prev-month-round-circle";
			}
			else if (tmp.getDate() <= today.getDate() && routine.isChecked(tmp))
			{
				classValue = "success-round-circle";
			}
			else if (tmp.getDate() <= today.getDate() && !routine.isChecked(tmp) && routine.isExpected(tmp))
			{
				classValue = "failure-round-circle";
			}
			else
			{
				classValue = "dayoff-round-circle";
			}
			html += '<li><span class="' + classValue + '" data-day="' + day.toString() + '" data-source="' + routine.id() + '">' + day.toString() + '</span></li>';	
			tmp = new Date(tmp.getTime() + 86400000);
		}
		

		html += "</ul></div>";
	}

	html += "</div>";

	return html;
}

function validateNewCaption(event)
{
	if (event.type == 'keydown' && (event.which == 13 || event.which == 9))
  	{
  		var newVal = $("#entry-caption-input").text();
  		var id = $("#entry-caption-input").attr("data-source");
  		var routine = HABITS[id];

  		if (routine !== null && (routine instanceof Routine))
  		{
  			routine.setCaption(newVal);
  			commitChanges();
  			editEntryHTML(id);
  		}
  	}
}

function validateNewReminder()
{
	var newVal = $("#entry-reminder-input").val();
	var id = $("#entry-reminder-input").attr("data-source");
	var routine = HABITS[id];

	if (routine !== null && (routine instanceof Routine))
	{
		if (newVal !== "--:--")
		{
			routine.setReminder(newVal);
			commitChanges();
			initNotificationService();
			editEntryHTML(id);
		}
	}
}


function validateNewInterval()
{
	if (event.type == 'keydown' && (event.which == 13 || event.which == 9))
  	{
  		var newVal = Number($("#entry-interval-input").val());
  		var id = $("#entry-interval-input").attr("data-source");
  		var routine = HABITS[id];

  		if (routine !== null && (routine instanceof Routine))
  		{
  			routine.setInterval(newVal);
  			commitChanges();
  			editEntryHTML(id);
  		}
  	}
}


function editEntryHTML(id)
{
	var routine = HABITS[id];

	if (routine !== null && (routine instanceof Routine))
	{


		var editHtml = `

		<div class="routine-details-container">
			<div>
			<input type="text" class="semi-transparent-bgnd no-border" placeholder="Edit Entry Caption..." autocomplete="off" data-source="{0}" id="entry-caption-input" value="{1}">
			</div>
			<div id="frequency-bar-container">
			<ul>
				<li id="btn-daily-frequency" data-source="{0}" ` + (routine.getFrequency() === "DAILY" ? 'class="checked"' : '') + `>daily</li>
				<li id="btn-monthly-frequency" data-source="{0}" ` + (routine.getFrequency() === "MONTHLY" ? 'class="checked"' : '') + `>Monthly</li>
				<li id="btn-interval-frequency" data-source="{0}" ` + (routine.getFrequency() === "INTERVAL" ? 'class="checked"' : '') + `>Interval</li>
			</ul>	
			</div>

			{4}
			{5}
			<div class="streak-container">
				<h5><img src="images/current.png">Current streak: {2}</h5>
				<h5><img src="images/trophy.png">Longest streak: {3}</h5>
			</div>

			<div id="routine-pie-chart">
			</div>
			{6}

		</div>

		`;

		var html = String.format(
			editHtml,
			routine.id(),
			routine.getCaption(),
			routine.getCurrentStreak().toString(),
			routine.getLongestStreak().toString(),
			workingDaysForRoutineHTML(routine),
			reminderHTML(routine),
			historyLogHTML(routine)
		);

		$("#routine-detail-content").html(html);

		
		setTimeout(
			function() {
				//var w = Math.floor($(window).width() * 0.4);
				//$("#routine-pie-chart").css("height", w.toString() + "px");
				//buildRoutinePieChart(routine);


				$("#entry-caption-input").unbind().keydown(validateNewCaption);
				$("#entry-reminder-input").on('input', validateNewReminder);
				$("#entry-interval-input").unbind().keydown(validateNewInterval);
			},
			100
		);

	}

}


function commitChanges()
{
	var raw_data = encodeData(HABITS);
	localStorage.setItem(app_id + ".data", raw_data);
}


function centerModalDialog()
{
  $('.modal.fade.in > .modal-dialog').css("opacity", "0");
  $('.modal.fade.in > .modal-dialog').css("margin-left", "-350px");
  var hmargin = Math.floor(($(window).width() - $('.modal.fade.in > .modal-dialog > .modal-content').width()) / 2);
  $('.modal.fade.in > .modal-dialog').animate({ left : "0px", marginLeft:  hmargin.toString() + "px", opacity : "1"}, 500); 
}

function fadeTopEntryInput(val)
{
	if (val === "out")
	{
		$(".bar-header-secondary").animate({ opacity : 0}, 600);
		setTimeout(
			function() {
				$(".bar-header-secondary").css("display", "none");
			}, 
			620);
	}
	else
	{
		$(".bar-header-secondary").css("display", "inline-block");
		$(".bar-header-secondary").css("opacity", "0");
		$(".bar-header-secondary").animate({ opacity : 1}, 600);
	}
}


/******************************** CHARTS ****************************/



function generateStatsChartData()
{
	var chartData = [];

	

	var today = new Date();
	for (key in HABITS)
	{
		var index = dateAsIndex(today);
		var routine = HABITS[key];
		if (routine !== null && (routine instanceof Routine))
		{
			var successCount = 0;
			var failureCount = 0;
			var expectedCount = 0;
			for (var i = 0; i < 90; i++)
			{
				if (routine._rec[index] === 1)
					successCount++;
				else if (routine._expectation[index] === 1)
					failureCount++;

				if (routine._expectation[index] === 1)
					expectedCount++;

				index--;
				if (index < 0)
					index = 365;
			}

			if (expectedCount === 0)
				expectedCount = 1;

			chartData.push({
                "caption": routine.getCaption(),
                "amount": successCount,
                "budgeted": expectedCount,
                "percentage" : percentageAsString(successCount, expectedCount),
                "color" : "#ff2655"
            });			
		}
	}

	return chartData;
}



function buildStatsChart()
{
	var balanceBarChart = AmCharts.makeChart("stats-barchart", {
          "theme": "dark",
          "type": "serial",
          "mouseWheelScrollEnabled": false,
          "valueAxes": [{
              "stackType": "3d",
              "position": "left",
              "title": "stats over the past 90 days",
          }],
          "startDuration": 0,
          "graphs": [{
              "balloonText": "« [[caption]] »: [[value]] times i.e [[percentage]]",
              "fillAlphas": 0.3,
              "lineAlpha": 1,
              "title": "Achieved",
              "type": "column",
              "valueField": "amount",
              "startEffect": "easyOutSine",
              "lineColor" : getRandomColor()
          }, {
              "balloonText": "Expected for « [[caption]] »: [[value]] times",
              "fillAlphas": 1,
              "lineAlpha": 1,
              "title": "Expected",
              "type": "column",
              "valueField": "budgeted",
              "startEffect": "easyOutSine",
              "lineColor" : getRandomColor()
          }
          ],
          "plotAreaFillAlphas": 0.2,
          "depth3D": 40,
          "angle": 30,
          "categoryField": "caption",
          "categoryAxis": {
              "gridPosition": "start",
              "labelRotation": 45
          },
          "export": {
            "enabled": false
           }
      });

  balanceBarChart.dataProvider = generateStatsChartData();
  balanceBarChart.validateData();

}


function generateRoutineChartData(routine)
{
	var chartData = [];

	var successCount = 0;
	var failureCount = 0;

	var d = new Date();
	var index = dateAsIndex(d);
	var count = 0;
	while (index >= 0)
	{
		if (routine._expectation[index] === 1)
		{
			if (routine._rec[index] === routine._expectation[index])
				successCount++;
			else
				failureCount++;
		}
		index--;
	}

	chartData.push({
	      "caption": routine.getCaption(),
	      "title" : "success",
	      "amount": successCount,
	      "color" : "#ff2655"
	  });

	chartData.push({
	      "caption": routine.getCaption(),
	      "title" : "failure",
	      "amount": failureCount,
	      "color" : "#ff2655"
	  });

	return chartData;
}


function buildRoutinePieChart(routine)
{
	routinePieChart = AmCharts.makeChart( "routine-pie-chart", {
      "type": "pie",
      "theme": "dark",
      "mouseWheelScrollEnabled": false,
      "valueField": "amount",
      "titleField": "title",
      "labelRadius": 5,
      "innerRadius": "50%",
      "depth3D": 20,
      "balloonText": "[[caption]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
      "angle": 40,
      "export": {
        "enabled": false
      }
    } );

    routinePieChart.dataProvider = generateRoutineChartData(routine);
  	routinePieChart.validateData();
}






/******************************** CLICK HANDLING ****************************/

function clickPerformed(evt)
{
	lastClickedObject = $(evt.target);

	// add new entry
	if (lastClickedObject.is("span.icon.icon-plus") || lastClickedObject.is('button.btn.btn-primary.pull-right'))
	{
		var caption = $('input.pull-left').val();
		if (caption !== "")
		{
			var newRoutine = new Routine(caption);
			var html = generateEntryHTML(newRoutine);
			$('input.pull-left').val("");
			$("ul.table-view").append(html);
			commitChanges();
		}

	}
	
	// done checkbox
	else if (lastClickedObject.is("div.square-checkbox > input"))
	{
		var routine = HABITS[$(lastClickedObject).attr('id')];
		if (routine !== null && (routine instanceof Routine))
		{
			routine.tick();
			commitChanges();
		}
	}

	// go to routine detail page
	else if (lastClickedObject.is("span.btn.btn-outlined"))
	{
		//$('#setting-dialog').modal();  
  		//centerModalDialog();

  		$("li#menu-item-list-view").removeClass("checked");

  		var id = $(lastClickedObject).attr("data-source");
  		editEntryHTML(id);

  		var w = $(window).width();
  		$("#routine-detail-content").animate({ marginLeft : 0}, 600);
		$("#listview-content").animate({ marginLeft : w}, 599);
		$("#calendar-content").animate({ marginLeft : w * 2}, 600);
		$("#stats-content").animate({ marginLeft : w * 3}, 600);
		fadeTopEntryInput("out");
		

	}

	// top menu "list view"
	else if (lastClickedObject.is("li#menu-item-list-view"))
	{
		reconstructListView();
		$("li#menu-item-list-view").addClass("checked");
		$("li#menu-item-calendar-view").removeClass("checked");
		$("li#menu-item-stats-view").removeClass("checked");

		var w = $(window).width();
		$("#routine-detail-content").animate({ marginLeft : -w}, 600);
		$("#listview-content").animate({ marginLeft : 0}, 600);
		$("#calendar-content").animate({ marginLeft : w}, 600);
		$("#stats-content").animate({ marginLeft : w * 2}, 600);
		fadeTopEntryInput("in");
	}

	// top menu "calendar view"
	else if (lastClickedObject.is("li#menu-item-calendar-view"))
	{
		$("li#menu-item-list-view").removeClass("checked");
		$("li#menu-item-calendar-view").addClass("checked");
		$("li#menu-item-stats-view").removeClass("checked");

		var w = $(window).width();
		$("#routine-detail-content").animate({ marginLeft : -w * 2}, 600);
		$("#listview-content").animate({ marginLeft : -w}, 600);
		$("#calendar-content").animate({ marginLeft : 0}, 600);
		$("#stats-content").animate({ marginLeft : w }, 600);
		fadeTopEntryInput("out");

		buildCalendar();
	}

	// top menu "stats view"
	else if (lastClickedObject.is("li#menu-item-stats-view"))
	{
		$("li#menu-item-list-view").removeClass("checked");
		$("li#menu-item-calendar-view").removeClass("checked");
		$("li#menu-item-stats-view").addClass("checked");

		var w = $(window).width();
		$("#routine-detail-content").animate({ marginLeft : -w * 3}, 600);
		$("#listview-content").animate({ marginLeft : -w * 2}, 600);
		$("#calendar-content").animate({ marginLeft : -w}, 600);
		$("#stats-content").animate({ marginLeft : 0 }, 600);
		fadeTopEntryInput("out");


		setTimeout(
			function() {
				var w = Math.min($(window).width(), $(window).height());
				if (w > 500)
					w = 500;

				$("#stats-barchart").css("height", w.toString() + "px");
				$("#stats-barchart").css("width", w.toString() + "px");
				buildStatsChart(routine);
			},
			100
		);
	}

	// detailed view ( working days)
	else if (lastClickedObject.is("span.daily-round-circle") || lastClickedObject.is("span.monthly-round-circle"))
	{
		$(lastClickedObject).toggleClass("checked");
		var isChecked = $(lastClickedObject).hasClass("checked");
		var day = $(lastClickedObject).attr("data-day");
		var id = $(lastClickedObject).attr("data-source");

		var routine = HABITS[id];
		if (routine !== null && (routine instanceof Routine))
		{
			routine.setIsWorkingDay(day, isChecked);
			commitChanges();
			initNotificationService();
		}
		
	}

	// detailed view ( history log)
	else if (lastClickedObject.is("span.success-round-circle") || lastClickedObject.is("span.failure-round-circle"))
	{
		var day = $(lastClickedObject).attr("data-day");
		var id = $(lastClickedObject).attr("data-source");


		var routine = HABITS[id];
		if (routine !== null && (routine instanceof Routine))
		{
			var date = new Date();
			date = new Date(date.getTime() - (date.getDate() - day) * 86400000);
			routine.tick(date);
			commitChanges();
			editEntryHTML(id);
		}
		
	}

	else if (lastClickedObject.is("li#btn-daily-frequency"))
	{
		var id = $(lastClickedObject).attr("data-source");

		var routine = HABITS[id];
		if (routine !== null && (routine instanceof Routine))
		{
			routine.setFrequency("DAILY");
			commitChanges();
			editEntryHTML(id);
		}
		
	}

	else if (lastClickedObject.is("li#btn-monthly-frequency"))
	{
		var id = $(lastClickedObject).attr("data-source");

		var routine = HABITS[id];
		if (routine !== null && (routine instanceof Routine))
		{
			routine.setFrequency("MONTHLY");
			commitChanges();
			editEntryHTML(id);
		}
		
	}

	else if (lastClickedObject.is("li#btn-interval-frequency"))
	{
		var id = $(lastClickedObject).attr("data-source");

		var routine = HABITS[id];
		if (routine !== null && (routine instanceof Routine))
		{
			routine.setFrequency("INTERVAL");
			commitChanges();
			editEntryHTML(id);
		}
		
	}

	else if (lastClickedObject.is("input#routine-reminder-checkbox"))
	{
		var id = $(lastClickedObject).attr("data-source");

		var routine = HABITS[id];
		if (routine !== null && (routine instanceof Routine))
		{
			var isChecked = $("input#routine-reminder-checkbox")[0].checked;
			routine.setReminderActive(isChecked);
			commitChanges();
			editEntryHTML(id);
		}
	}
	
}



/******************************** CHROME ALARM & NOTIFICATION ****************************/


function isChromeAlarmsAvailable()
{
	if (typeof(chrome) !== "undefined")
	{
		if (typeof(chrome.alarms) !== "undefined")
		{
			return true;
		}
	}
	return false;
}

function createNotification(id) 
{
	if (isChromeAlarmsAvailable())
	{
		var routine = HABITS[id];

		if (routine !== null && (routine instanceof Routine))
		{
			var opts = {
				message: '"' + routine.getCaption() + '" scheduled at' + routine.getReminder(),
				title: 'Reminder',
				type: 'basic',
				iconUrl: 'res/icon/android/drawable-ldpi-icon.png'
			};

			chrome.notifications.create(id, opts, function(notificationId) { });
		}
	}
}

function createAlarm(id, date) 
{
	if (isChromeAlarmsAvailable())
	{
	  var expectedFireTime = date.getTime();
	  chrome.alarms.create(id , { when: expectedFireTime });
	}
}

function registerAlarm(routine)
{
	var presentTime = new Date();
	var index = dateAsIndex(presentTime);
	var daysAhead = 0;
	
	while (routine._expectation[index] !== 1)
	{
		index++;
		daysAhead++;
	}

	var tmp = new Date(presentTime.getTime() + daysAhead * 86400000);
	tmp = new Date(Date.parse(tmp.toString().substr(0, 16) + routine.getReminder() + ":00"));

	if (presentTime.getTime() > tmp.getTime())
	{
		index++;
		daysAhead++;
		while (routine._expectation[index] !== 1)
		{
			index++;
			daysAhead++;
		}

		tmp = new Date(presentTime.getTime() + daysAhead * 86400000);
		tmp = new Date(Date.parse(tmp.toString().substr(0, 16) + routine.getReminder() + ":00"));
		createAlarm(routine.id(), tmp);
		
		NOTIFICATIONDICT[routine.id()] = tmp.getTime();
	}

}



/******************************** UI INITIALIZATION ****************************/


function initService()
{
	HABITS = {};

	var data = localStorage.getItem(app_id + ".data");
	if (typeof(data) !== "undefined" && data !== null)
	{

		if (isChromeAlarmsAvailable())
		{
			chrome.alarms.clearAll();
			chrome.alarms.onAlarm.addListener(function(alarm) {
			    log("Received alarm: " + alarm.name + '. Creating notification.');
			    createNotification(alarm.name);
			  });
		}

		var tmp = decodeData(data);
		for (key in tmp)
		{
			var routine = new Routine(tmp[key]);
		}

		initNotificationService();
	}
}

function initNotificationService()
{
	if (isChromeAlarmsAvailable())
	{
		NOTIFICATIONDICT = {};

		for (key in HABITS)
		{
			var routine = HABITS[key];

			if (routine !== null && (routine instanceof Routine))
			{
				if (routine.getIsReminderActive())
				{
					registerAlarm();
				}
			}
		}
	}
	
}

function initUI()
{

	reconstructListView();

	$("body").unbind().click(clickPerformed);
}