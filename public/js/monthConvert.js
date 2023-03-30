function monthConvert(monthToConvert){
		var monthString;
		var monthInteger;
		
		if(typeof monthToConvert == 'number'){
				alert(monthToConvert + " is int-number");
				monthIsValue =arrMonthName[monthToConvert];
			 } else {
				alert(monthToConvert + " ,convert this value, it is not a number. line 74");//convert 'January' to 0, February to 1, etc.
				var index = arrMonthName.indexOf(monthToConvert);
				alert ('70: conv1= ' +index);
		}
		//console.log('line 66 '+monthToConvert);
		alert('line 73 '+monthIsValue +' - '+ startTimerMonth);
		continueTimerMonthInt = index + 1;
		alert ('month to continue with: ' continueTimerMonthInt);
		return monthIsValue;
}