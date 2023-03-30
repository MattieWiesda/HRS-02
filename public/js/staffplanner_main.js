//Array month names EN:
const arrMonthName = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"); 
//const arrMonthNameES 
const arrMonthNameNL = new Array("januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december");
const arrMonthNameDE = new Array("", "", "", "", "", "", "", "", "", "", "", "");	
const arrMonthNameFR = new Array("", "", "", "", "", "", "", "", "", "", "", "");
const arrMonthNameES = new Array("", "", "", "", "", "", "", "", "", "", "", "");

/*
 * Monday is always 1. Tuesday is 2, etc. etc. 
 * 
 *
 */
var selectFDOW = 1; //First Day of the Week
const arrDayNamesFull = new Array("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday");
const arrDayNamesFullNL = new Array("zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag");
const arrDayNamesFullDE = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
const arrDayNamesFullFR = new Array("SundayMonday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday");
const arrDayNamesFullES = new Array("SundayMonday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday");

const arrDayNames = new Array("Su", "Mo", "Tu", "We", "Th", "Fr", "Sa");
const arrDayNamesNL = new Array("zo", "ma", "di", "woe", "do", "vr", "za");
const arrDayNamesDE = new Array("Su", "Mo", "Tu", "We", "Th", "Fr", "Sa");
const arrDayNamesFR = new Array("Su", "Mo", "Tu", "We", "Th", "Fr", "Sa");
const arrDayNamesES = new Array("Su", "Mo", "Tu", "We", "Th", "Fr", "Sa");

var selectTimerStart = new Date();
var isoFDOM;//this represents the first day of a month, ISO formatting applied. eg: 12 december 2015 = 2015-12-15
var startTimerYear = selectTimerStart.getFullYear();
var startTimerMonth =  selectTimerStart.getMonth();
var startTimerMonthString;
var startTimerWeek;

var setFirstDOW; //set the first day of the week: Mo, Tu, We etc. 
//var startTimerWeek = selectTimerStart
var continueTimerYear; //used to keep values when navigating through calendarcontrol
var continueTimerMonth; //used to keep values when navigating through calendarcontrol
var continueTimerMonthString;

/*
 * sets information like date & time when app is started/opened
 * 
 */
function setStartTimerInfo(){
	
	//year:			
	document.getElementById('idSelectedYear').innerHTML = startTimerYear;
	
	//month:
	document.getElementById('idSelectedMonth').innerHTML = monthConvert(startTimerMonth);

	//week:
	setWeekNumber();
	var weekNumber;
	weekNumber = setWeekNumber();	//document.getElementById('0_6').innerHTML = setWeekNumber();
	document.getElementById('0_6').innerHTML = weekNumber;
	var startTimerDay = selectTimerStart.getDay();
	var startTimerWeekDay = selectTimerStart.getDate();
	addWeekNumbers();//alert('37: Fill out week numbers for current month, starting with weeknumber: ' + weekNumber);

	//daydates:
	//first day of each month is 1st of month, great, 
	//isn't it. Find out what day (Monday, Wednesday of what ever day it is:) and put this date in the corresponding cell at row 2:
	//APPLY ISO FORMATTING
	//ISO 8601 : YYYY-MM-DD


}

function addWeekNumbers() {
	
	/*
	 * fill out the remaining five week numbers in the calendar control. 
	 * 
	 */

	var weekNumber;
	weekNumber = setWeekNumber();
	console.log('42: ' + weekNumber);

	document.getElementById('idStartingWeekNumber').innerHTML = setWeekNumber();
	var element = document.getElementById("0_6");
	element.classList.add("clsWeekNumber");
	document.getElementById('0_13').innerHTML= (weekNumber + 1);
	document.getElementById('0_13').classList.add('clsWeekNumber');
	document.getElementById('0_20').innerHTML= (weekNumber + 2);
	document.getElementById('0_20').classList.add('clsWeekNumber');
	document.getElementById('0_27').innerHTML= (weekNumber + 3);
	document.getElementById('0_27').classList.add('clsWeekNumber');
	document.getElementById('0_34').innerHTML= (weekNumber + 4);
	document.getElementById('0_34').classList.add('clsWeekNumber');
	document.getElementById('0_41').innerHTML= (weekNumber + 5);
	document.getElementById('0_41').classList.add('clsWeekNumber');
	
}

function addCSSClass(applyOnRange, className) {
	document.getElementById(applyOnRange).classList.add('clsDates');
}
 
function setStartTimerInfo_Obsolete() {
	
	//week:
	/*setWeekNumber();
	document.getElementById('0_6').innerHTML = setWeekNumber();
	
	var startTimerDay = selectTimerStart.getDay();
	var startTimerWeekDay = selectTimerStart.getDate();*/
}

function monthConvert(monthToConvert){

	var monthString;
	var monthInteger;

	if(typeof monthToConvert == 'number'){
			monthConvertedValue =arrMonthName[monthToConvert];
		 } else {
		monthConvertedValue = arrMonthName.indexOf(monthToConvert);
	}
	return monthConvertedValue;
}

function navigateYear(spanNumber){

	var selectedYear = parseInt(document.getElementById('idSelectedYear').innerText);

	selectedYear = selectedYear + spanNumber;
	document.getElementById('idSelectedYear').innerHTML = selectedYear;
}

function navigateMonth(spanNumber){
	
	selectedMonth = document.getElementById('idSelectedMonth').innerText;
	if (typeof (selectedMonth === "string")){
		selectedMonth = monthConvert(selectedMonth)	
	};

	selectedMonth = selectedMonth + spanNumber;
	console.log(selectedMonth);
	if (selectedMonth == -1){				
		selectedMonth = 11;
		navigateYear(-1);
	}
	if (selectedMonth == 12){
		selectedMonth = 0;
		navigateYear(1);
	}						
	selectedMonth = monthConvert(selectedMonth);
	console.log(selectedMonth);
	document.getElementById('idSelectedMonth').innerHTML = selectedMonth;
}

function isInt(value) {
	return !isNaN(value) && (function (x) { return (x | 0) === x; })(parseFloat(value))
}

function navigateWeek(){}

function setWeekNumber() {
	currentDate = new Date();
	startDate = new Date(currentDate.getFullYear(), 0, 1);
	var days = Math.floor((currentDate - startDate) /
		(24 * 60 * 60 * 1000));

	var weekNumber = Math.ceil(days / 7);

	// Display the calculated result      
	//console.log("staffplanner_main, 109: Week number of " + currentDate + " is :   " + weekNumber);
	return weekNumber;
}

/*
 * the first weeknumber to be shown for the month to be viewed in a calendarcontrol
 * 
 * 
 */
function startShowWeekOfMonth() { 
	// month =  5 May 2023 => 4
	//1st of May 2023, 01-05-2023 = Monday
	// => belonging weeknumber
	//first date of the belonging weeknumber, this could 
	//be the first of the current month, or a day of the previous month


}
function endOfWeek(date) {

	var lastday = date.getDate() - (date.getDay() - 1) + 6;
	return new Date(date.setDate(lastday));

}

/*dt = new Date();

console.log(endOfWeek(dt).toString());

function navigateDay(){}*/

	
