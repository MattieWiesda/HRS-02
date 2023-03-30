/*==================================================================================================================*/
/* Copyright Mosaedata.nl																							*/
/* Erik Wijsen                																						*/
/* Van den Berghstraat 47																							*/
/* 6221 XB Maastricht         																						*/
/*==================================================================================================================*/

/*
 *
 * 
 * 
*/
let Lang; //set language first. NL EN DE ES FR
Lang = 'EN';
const arrMonthName = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"); 
const arrMonthNameNL = new Array("januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december");
const arrMonthNameDE = new Array("", "", "", "", "", "", "", "", "", "", "", "");	
const arrMonthNameFR = new Array("", "", "", "", "", "", "", "", "", "", "", "");
const arrMonthNameES = new Array("", "", "", "", "", "", "", "", "", "", "", "");

/*
 * Sunday = 0, Monday equals 1. Tuesday is 2, etc. etc. 
 * 
 *
 */
//const arrDayNamesFull = new Array("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday");
const arrDayNamesFull = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
const arrDayNamesFullNL = new Array("zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag");
const arrDayNamesFullDE = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
const arrDayNamesFullFR = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
const arrDayNamesFullES = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");

const arrDayNames = new Array("Su", "Mo", "Tu", "We", "Th", "Fr", "Sa");
const arrDayNamesNL = new Array("zo", "ma", "di", "woe", "do", "vr", "za");
const arrDayNamesDE = new Array("So", "Mo", "Di", "Mi", "Do", "Fr", "Sa");
const arrDayNamesFR = new Array("di", "lu", "ma", "me", "je", "ve", "sa");
const arrDayNamesES = new Array("Su", "Mo", "Tu", "We", "Th", "Fr", "Sa");

let selectTimerStart = new Date();
//let FOCM_DayName; //Name of the Day of the First of the Current Month
let startTimerMonth;		// = selectTimerStart.getMonth();
let startTimerMonthISO;

let uxMonthISOCurrent;
let uxMonthNameCurrent;
let uxMonthISOPrevious;
let uxMonthNamePrevious;
let uxMonthISONext;
let uxMonthNameNext;

let uxYearISOCurrent;
let uxYearISONext;
let uxYearISOPrevious;

let uxDayISOCurrent;
let uxDayNameCurrent;
let uxDayISONext;
let uxDayNameNext;
let uxDayISOPrevious;
let uxDayNamePrevious;

let FOM;//ISO First Of Month, not particularly for the current month, but for every month usedin the calendar control

/*
* Initializing HRScheduler application
*
*/
function setHRScheduler() {
	//alert('49. Start: ' + selectTimerStart);
	setCurrentDate();
	generateTable('idTableMonth_Task_', 9, 48);
	addCboSelect('4_0');
	addLayout();
	setHRSTimerInfo();//set yyyy mm dd in ISO format, use current date to fill out the table	//console.log('71. Todays date ISO:' + DateTodayISO + ', year: ' + YearTodayISO + ', month: ' + MonthTodayISO + ' - ' + MonthTodayName + ', day: ' + Day ======TodayISO);
	addSetAttribute('5_6', '8_47', 'changeColor', 'onclick');
	addSetAttributeName('5_6', '5_47', '', 'name', 'HAR');
	addSetAttributeName('6_6', '6_47', '', 'name', 'MIT');
	addSetAttributeName('7_6', '7_47', '', 'name', 'NIC');
	addSetAttributeName('8_6', '8_47', '', 'name', 'ERI');
	additionsInterface();	//refi();
	navigateMonth(1);
	console.log('END');
}

/*
* Refresh info for developing purposes
*
*/
function refi() {
	
	//console.log('100 : here');
	document.getElementById("uxMIC").innerText = uxMonthISOCurrent;//	console.log('92  refi: month current ISO: '+ uxMonthISOCurrent);
	document.getElementById("uxMNC").innerText = uxMonthNameCurrent;
	document.getElementById("uxMIP").innerText = uxMonthISOPrevious;
	document.getElementById("uxMNP").innerText = uxMonthNamePrevious;
	document.getElementById("uxMIN").innerText = uxMonthISONext;
	document.getElementById("uxMNN").innerText = uxMonthNameNext;

}