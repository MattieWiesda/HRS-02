	function navigatorDate_MovedToFile(timeSpan, spanNumber){		//setStartTimerInfo();
		//	timeSpan =  or Day or week or Month or Year etc. convert Month to number eg January = 1, Feb = 2 etc.
		//	spanNumber =  number of days/months/years to move forward or backward
		var selectedYear = parseInt(document.getElementById('idSelectedYear').innerText);
		var selectedMonth = (document.getElementById('idSelectedMonth').innerText);
		//var selectedDay = 
		//selectedTimeHrsMinSec
		
		switch (timeSpan){
		case 0:
			selectedYear = selectedYear + spanNumber;
			document.getElementById('idSelectedYear').innerHTML = selectedYear;
			break;
		case 1:
			//selectedMonth = parseInt(selectedMonth);
			selectedMonth = document.getElementById('idSelectedMonth').innerText;
			//alert('37. selected month = ' + selectedMonth);
			selectedMonth = monthConvert(selectedMonth)
			alert('41. selected month = ' + selectedMonth);
			spanNumber =  parseInt(spanNumber); 
			console.log(continueTimerMonth);
			alert('45. selected month = ' + continueTimerMonth);//tot hier
			selectedMonth = selectedMonth + spanNumber;	
					
			console.log('84 : ' + selectedMonth);							//console.log(spanNumber);
			if (selectedMonth == -1){							//console.log('87');
				selectedMonth = 11;								//and selectedYear = selectedYear - 1
			}
			if (selectedMonth == 12){							//console.log('91');
				selectedMonth = 0;				//and selectedYear = selectedYear + 1
			}							//console.log ('96 newly selected month = ' + selectedMonth); //alert ('line70 , year. if month is January or December then...adjust');
			document.getElementById('idSelectedMonth').innerHTML = selectedMonth;			//document.getElementById('idSelectedmonth').innerHTML = monthConvert(selectedMonth);
			document.getElementById('idSelectedMonth').innerHTML = monthName[selectedMonth];
			break;
		case 2:
			break;

		}
	}

	
	
