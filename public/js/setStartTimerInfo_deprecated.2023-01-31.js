function setStartTimerInfo(){		// sets information like date & time when app is started/opened
		alert ('2' + startTimerYear);
		document.getElementById('idSelectedYear').innerHTML = startTimerYear;		//document.getElementById('idSelectedMonth').innerHTML = monthName[startTimerMonth];		alert (startTimerMonth);

		document.getElementById('idSelectedMonth').innerHTML = monthConvert(startTimerMonth);
		
		var startTimerDay = selectTimerStart.getDay();
		var startTimerWeekDay = selectTimerStart.getDate();		//console.log ('year = ' + startTimerYear + ' // month = ' + startTimerMonth + ' // day = ' + startTimerDay);
	}