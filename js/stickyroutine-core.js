var HABITS = {};

/* ---------------------------------------------------------------- *
 * class Routine
 *
 * summary: This class represents a Routine
 * description: a Routine is used to record values over the course of
 * 		time such as work progression etc.
 *
 * ---------------------------------------------------------------- */


 class Routine
 {
 	/* ------------------------------------------------------------- *
	 * method: constructor
	 * ------------------------------------------------------------- */
 	constructor(val)
 	{
 		if ((val instanceof Object) &&
 			typeof(val._id) !== "undefined" &&
 			typeof(val._caption) !== "undefined" &&
 			typeof(val._rec) !== "undefined" &&
 			typeof(val._longestStreak) !== "undefined" &&
 			typeof(val._frequency) !== "undefined" &&
 			typeof(val._expectation) !== "undefined" &&
 			typeof(val._dailyBusinessDays) !== "undefined" &&
 			typeof(val._monthlyBusinessDays) !== "undefined" &&
 			typeof(val._interval) !== "undefined" &&
 			typeof(val._reminder) !== "undefined" &&
 			typeof(val._reminderActive) !== "undefined")
 		{
 			this._id = val._id;
 			this._caption = val._caption;
 			this._rec = val._rec;
 			this._longestStreak = val._longestStreak;
 			this._frequency = val._frequency;
 			this._expectation = val._expectation;
 			this._dailyBusinessDays = val._dailyBusinessDays;
 			this._monthlyBusinessDays = val._monthlyBusinessDays;
 			this._interval = val._interval;
 			this._reminder = val._reminder;
	 		this._reminderActive = val._reminderActive;
 		}
 		else
 		{
	 		this._id = guid();
	 		this._caption = val.toString(); 
	 		this._rec = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];	
	 		this._expectation = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];	
	 		this._longestStreak = 0;
	 		this._frequency = "DAILY";
	 		this._dailyBusinessDays = [1, 1, 1, 1, 1, 1, 1];
	 		this._monthlyBusinessDays = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	 		this._interval = 10;
	 		this._reminder = "09:00";
	 		this._reminderActive = false;
	 	}
	 	HABITS[this._id] = this;
 	}

 	/* ------------------------------------------------------------- *
	 * method: id() returns the id for this Routine
	 * ------------------------------------------------------------- */
	 id()
	 {
	 	return this._id;
	 }

 	/* ------------------------------------------------------------- *
	 * method: getCaption() returns the caption for this Routine
	 * ------------------------------------------------------------- */
	getCaption()
	{
		return this._caption;
	}

	/* ------------------------------------------------------------- *
	 * method: getCurrentStreak() returns the current streak for this Routine
	 * ------------------------------------------------------------- */
	getCurrentStreak()
	{
		var d = new Date();
		var index = dateAsIndex(d);
		var count = 0;
		while (this._rec[index] === this._expectation[index] && index >= 0)
		{
			if (this._expectation[index] === 1)
				count++;
			index--;
		}

		return count;
	}

	/* ------------------------------------------------------------- *
	 * method: getLongestStreak() returns the longest streak for this Routine
	 * ------------------------------------------------------------- */
	getLongestStreak()
	{
		var current = this.getCurrentStreak();
		if (current > this._longestStreak)
			this._longestStreak = current;
		return this._longestStreak;
	}

	/* ------------------------------------------------------------- *
	 * method: setCaption() sets the caption for this Routine
	 * ------------------------------------------------------------- */
	setCaption(caption)
	{
		return this._caption = caption;
	}

	/* ------------------------------------------------------------- *
	 * method: isWorkingDay() 
	 * ------------------------------------------------------------- */
	 isWorkingDay(dayIndex)
	 {
	 	if (this._frequency === "DAILY")
	 	{
		 	if (dayIndex > -1 && dayIndex < 7)
		 	{
		 		return this._dailyBusinessDays[dayIndex] === 1;
		 	}
		}
		else if (this._frequency === "MONTHLY")
	 	{
		 	if (dayIndex > -1 && dayIndex < 31)
		 	{
		 		return this._monthlyBusinessDays[dayIndex] === 1;
		 	}
		}
	 	return false;
	 }

	 /* ------------------------------------------------------------- *
	 * method: setIsWorkingDay() 
	 * ------------------------------------------------------------- */
	 setIsWorkingDay(dayIndex, val)
	 {
	 	if (this._frequency === "DAILY")
	 	{
		 	if (dayIndex > -1 && dayIndex < 7)
		 	{
		 		this._dailyBusinessDays[dayIndex] = val ? 1 : 0;
		 		this.updateExpectedPlan();
		 	}
		}
		else if (this._frequency === "MONTHLY")
	 	{
		 	if (dayIndex > -1 && dayIndex < 31)
		 	{
		 		this._monthlyBusinessDays[dayIndex] = val ? 1 : 0;
		 		this.updateExpectedPlan();
		 	}
		}
	 }

	/* ------------------------------------------------------------- *
	 * method: setIsWorkingDay() 
	 * ------------------------------------------------------------- */
	 updateExpectedPlan()
	 {
	 	

	 	switch(this._frequency)
	 	{
	 		case "DAILY":
	 			var tmp = new Date();
	 			tmp = new Date(tmp.getFullYear(), 0 ,1);
	 			for (var i = 0; i < 365; i++)
	 			{
	 				var index = tmp.getDay();
	 				this._expectation[i] = this._dailyBusinessDays[index];
	 				tmp = new Date(tmp.getTime() + 86400000);
	 			} 
	 			break;
	 		case "MONTHLY":
	 			var tmp = new Date();
	 			tmp = new Date(tmp.getFullYear(), 0 , 1);
	 			for (var i = 0; i < 365; i++)
	 			{
	 				var index = tmp.getDate() - 1;
	 				this._expectation[i] = this._monthlyBusinessDays[index];
	 				tmp = new Date(tmp.getTime() + 86400000);
	 			} 
	 			break;
	 		case "INTERVAL":
	 			var tmp = new Date();
	 			var year = tmp.getFullYear();
	 			for (var i = 0; i < 365; i++)
	 			{
	 				this._expectation[i] = 0;
	 			}
	 			while(year === tmp.getFullYear())
	 			{
	 				this._expectation[dateAsIndex(tmp)] = 1;
	 				tmp = new Date(tmp.getTime() + 86400000 * this._interval);
	 			}
	 			break;
	 	}
	 }


	 /* ------------------------------------------------------------- *
	 * method: setReminder() sets the reminder for this Routine
	 * ------------------------------------------------------------- */
	setReminder(timeStr)
	{
		this._reminder = timeStr;
	}

	/* ------------------------------------------------------------- *
	 * method: getReminder() returns the reminder for this Routine
	 * ------------------------------------------------------------- */
	getReminder()
	{
		return this._reminder;
	}

	/* ------------------------------------------------------------- *
	 * method: setReminderActive() sets the reminder for this Routine
	 * ------------------------------------------------------------- */
	setReminderActive(val)
	{
		this._reminderActive = val;
	}

	/* ------------------------------------------------------------- *
	 * method: getIsReminderActive() returns the reminder for this Routine
	 * ------------------------------------------------------------- */
	getIsReminderActive()
	{
		return this._reminderActive;
	}


	 /* ------------------------------------------------------------- *
	 * method: setInterval() sets the frequency for this Routine
	 * ------------------------------------------------------------- */
	setInterval(freq)
	{
		this._interval = freq;
		this.updateExpectedPlan();
	}

	/* ------------------------------------------------------------- *
	 * method: getFrequency() returns the frequency for this Routine
	 * ------------------------------------------------------------- */
	getInterval()
	{
		return this._interval;
	}


	/* ------------------------------------------------------------- *
	 * method: setFrequency() sets the frequency for this Routine
	 * ------------------------------------------------------------- */
	setFrequency(freq)
	{
		var options = ["DAILY", "MONTHLY", "INTERVAL"];
		if (options.indexOf(freq) !== -1)
		{
			this._frequency = freq;
			this.updateExpectedPlan();
		}
	}


	/* ------------------------------------------------------------- *
	 * method: getFrequency() returns the frequency for this Routine
	 * ------------------------------------------------------------- */
	getFrequency()
	{
		return this._frequency;
	}


	/* ------------------------------------------------------------- *
	 * method: isExpected() checks wether this Routine is expected on the provided date
	 * ------------------------------------------------------------- */
	isExpected(date)
	{
		var index = dateAsIndex(date);
		return this._expectation[index] === 1;
	}

	/* ------------------------------------------------------------- *
	 * method: isChecked() checks wether this Routine was checked on the provided date
	 * ------------------------------------------------------------- */
	isChecked(date)
	{
		var index = dateAsIndex(date);
		return this._rec[index] === 1;
	}

	tick(date)
	{
		if (typeof(date) === "undefined" || date === null)
		{
			date = new Date();
			this.tick(date);
		}
		else
		{
			var index = dateAsIndex(date);

			var val = this._rec[index];
			if (this._expectation[index] === 0 && val === 0)
				return;

			this._rec[index] = val === 0 ? 1 : 0;
		}
	}



}