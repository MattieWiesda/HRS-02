/*==================================================================================================================*/
/*==================================================================================================================*/
/*==================================================================================================================*/
/*                           																						*/
/*                           																						*/
/*                           																						*/
/*                           																						*/
/*                           																						*/
/*                           																						*/
/*                           																						*/
/*                           																						*/
/*                           																						*/
/*                           																						*/
/*                           																						*/
/*                           																						*/
/*                           																						*/
/*                           																						*/
/*                           																						*/
/*                           																						*/
/*                           																						*/
/*                           																						*/
/*                           																						*/
/* Copyright Mosaedata.nl																							*/
/* Erik Wijsen                																						*/
/* Van den Berghstraat 47																							*/
/* 6221 XB Maastricht         																						*/
/*                           																						*/
/*                           																						*/
/*                           																						*/
/*                           																						*/
/*                           																						*/
/*                           																						*/
/*                           																						*/
/*                           																						*/
/*                           																						*/
/*                           																						*/
/*==================================================================================================================*/
/*==================================================================================================================*/
/*==================================================================================================================*/

let FDOM;// determine the First Day Of the (current) Month
let FDOMWeekDayNr; //0 = Su, 1=Mo, 2=Tu etc. 
let FDOMWeekDay;   //Su, Mo, Tu, We etc.

let dateToday; //well, how easy things can be...this represents the date of .... Today!!!! so we say...Hip Hip..... Hooray!!!!!
let DateTodayISO;//string format. To calculate: Convert to number!   eg: 14 January 2021
let DayTodayISO;//DateTodayISO                                       eg: 0 (=Sunday) or: 6 (Saturday)
let DateTodayName;//                                                  eg: Wednesday, Thursday, Saturday etc. 
let FOCM_ISO;
let startPrintingInCellID;

let YearTodayISO;
let YearNextISO;
let YearPreviousISO;

let MonthTodayISO;
let MonthNextISO;
let MonthPreviousISO;
let MonthTodayName;

/*
 * 
 * sets information like date & time when app is started/opened
 * 
 * DateTodayISO, YearTodayISO, YearNextIso etc. etc. MonthNextIso etc. etc.
 * 
 */
function setHRSTimerInfo() {    //First of Month =  1 November 2055 => determine what day (Mo, Tu, We etc.) the first of the current month is. This day is where to start filling out dates in the calendar table. 
    setDay();
    setYear();
    setMonth();
    setWeek();
    console.log('73. start printing in cell id: ' +startPrintingInCellID);
}

/*
 * 
 * Add weeknumbers to the ux: 
 * 
*/
function setWeek() {
    //week:
    setWeekNumber();
    var weekNumber;
    weekNumber = setWeekNumber();
    document.getElementById('0_6').innerHTML = weekNumber;//console.log('88. week: ' + weekNumber);
    addWeekNumbers();
}
/*
 * 
 *
*/
function setDay() {

    DayTodayISO = setDateTodayISO(new Date);
    console.log('93. DayTodayISO: ' + DayTodayISO);
    setFDOM();
    console.log('96. FDOM: ' + FDOM);// + 'Day===TodayISO: ' + Day===TodayISO);
    setFirstOfCurrentMonth();

}



/*
 * set Year: current / next / previous year = yyyy
 *
*/
function setYear(xDate) {
    
    YearTodayISO = selectTimerStart.getFullYear();
    uxYearISOCurrent = YearTodayISO;

    YearNextISO = Number(YearTodayISO) + 1;
    uxYearISONext = YearNextISO;

    YearPreviousISO = Number(YearTodayISO) + -1;
    uxYearISOPrevious = YearPreviousISO;

    document.getElementById('idSelectedYear').innerHTML = YearTodayISO;

}

/*
 * set Month: current year = yyyy,
 *
*/
function setMonth() {

    startTimerMonth = selectTimerStart.getMonth();
    MonthTodayISO = startTimerMonth;
    MonthTodayName = monthConvert(MonthTodayISO); //console.log('159.WRX current month: ' + MonthTodayName + ', current month in ISO: ' + MonthTodayISO);    //document.getElementById('idSelectedMonth').innerHTML = monthConvert(startTimerMonth);
    document.getElementById('idSelectedMonth').innerHTML = MonthTodayName;
    uxMonthISOCurrent = MonthTodayISO;
    uxMonthNameCurrent = MonthTodayName;
    //set previous;
    if (MonthTodayISO > 0) {
        uxMonthISOPrevious = MonthTodayISO - 1;
        //MonthTodayName = monthConvert(MonthTodayISO);
    } else if (MonthTodayISO == 0) {
        uxMonthISOPrevious = 11;
    }
    uxMonthNamePrevious = monthConvert(uxMonthISOPrevious);

    // set next; 
    if (MonthTodayISO < 10) {
        uxMonthISONext = MonthTodayISO + 1;

    } else if (MonthTodayISO == 11) {
        uxMonthISONext = 1;
    }
    uxMonthNameNext = monthConvert(uxMonthISONext);

}

/*
 * set Month for navigation control,
 *
*/
function setMonthNav(uxMonthISOCurrent) {    //selectedMonth = the month being viewed in the calendar control , uxMonthISOCurrent
    // set next; 
    console.log('184. month current ISO: ' + uxMonthISOCurrent);
    if (uxMonthISOCurrent <= 10 && uxMonthISOCurrent > -1) {
        uxMonthISONext = uxMonthISOCurrent + 1;
    } else if (uxMonthISOCurrent == 11) {
        uxMonthISONext = 0;
    }
    uxMonthNameCurrent = monthConvert(uxMonthISOCurrent);
    uxMonthNameNext = monthConvert(uxMonthISONext);
    console.log('193. Month next Name: ' + uxMonthNameNext);
    console.log('199. month current ISO: ' + uxMonthISOCurrent);
    //set previous;
    if (uxMonthISOCurrent > 0 && uxMonthISOCurrent <= 11) {
        uxMonthISOPrevious = uxMonthISOCurrent - 1;        //MonthTodayName = monthConvert(MonthTodayISO);
    } else if (uxMonthISOCurrent == 0 || uxMonthISOCurrent == -1) {
        uxMonthISOPrevious = 11;
        console.log('199 ux Month previous ISO = ' + uxMonthISOPrevious);
    }   
    //if (uxMonthISOPrevious ==-1
    uxMonthNamePrevious = monthConvert(uxMonthISOPrevious);
    console.log('209 ux Month previous ISO = ' + uxMonthNamePrevious + ',(' + uxMonthISOPrevious + ')');
    console.log('210. month current ISO: ' + uxMonthNameCurrent + '('+ uxMonthISOCurrent +')' );
    console.log('211. Month next Name: ' + uxMonthNameNext + '(' + uxMonthISONext + ')' );
    console.log('212. Month ISO previous: ' + uxMonthISOPrevious + ' = ' + uxMonthNamePrevious);    //console.log('202. Month name previous: ' + uxMonthNamePrevious);


}



function setMonthNext(selectedMonth) {//obsolete?
    // set next; 
    alert('do remove');
    if (MonthTodayISO < 10) {
        uxMonthISONext = MonthTodayISO + 1;

    } else if (MonthTodayISO == 11) {
        uxMonthISONext = 1;
    }
    uxMonthNameNext = monthConvert(uxMonthISONext);
}

function setMonthPrevious(selectedMonth) {//obsolete?
    console.log('193' + selectedMonth);
    alert('do remove');
    //set previous;
    if (MonthTodayISO > 0) {
        uxMonthISOPrevious = MonthTodayISO - 1;
        //MonthTodayName = monthConvert(MonthTodayISO);
    } else if (MonthTodayISO == 0) {
        uxMonthISOPrevious = 11;

    }
    uxMonthNamePrevious = monthConvert(uxMonthISOPrevious);
}
/*
 * set today's date in ISO format. and split it into separate year - month - day , as YYYY - MM - DD
 *
*/
function setDateTodayISO(xDate) {

    x = new (Date);    //x = 'Fri Jun 23 2023 16:29:15 GMT+0100 (Central European Standard Time)';
    DateTodayISO = xDate.toISOString();
    DayTodayISO = x.getDay();
    console.log('176. DateTodayISO = ' + DateTodayISO);
    
    return (DateTodayISO);
}
/*
 *
 * set Month belonging to Todays date. - MM - DD
 * 
 * result/return => ISO format. (MM) eg: January = 01, July = 07 , December = 12
 * 
*/
function setMonthTodayISO() {
    x = new (Date);
    MonthTodayISO = Number(x.getMonth());
    if (MonthTodayISO < 10) {
        MonthTodayISO = '0' + String(MonthTodayISO);
    }
    return MonthTodayISO;
}
/*
 * 
 * set the FirstDayOfMonth to be displayed. In ISO format.
 * 
 * xDate = Month of which to retrieve the first day   //FDOM = First Day Of (Current) Month
 * 
*/
function setFDOM(xDate) {  
    FDOM = new Date();    // // yyyy + mm + 01 => determine whether this is a Su, Mo, etc.     console.log('197. local format today: ' + FDOM);    //    FDOM = FDOM.getUTCDay(); alert('welke dag?: ' + FDOM);//0=Su, 1=Mo, 2=Tu, 3=We etc.
    FDOMWeekDayNr = FDOM.getUTCDay();
    FDOMWeekDay = setFDOMWeekDay(FDOMWeekDay);
    console.log('182. FDOMWeekday = ' + FDOMWeekDay);    //fillInnerHTMLDates();                                       console.log('193. correct? FDOM = ' + FDOM);
    return FDOM;
}
/*
** Determine what day (Monday, Friday etc.) the FDOM, First Day of Month, is
**
*/
function setFDOMWeekDay(FDOMWeekDay) {
    console.log('291.  FDOMWeekDay = ' + FDOMWeekDay);
    FDOMWeekDay = arrDayNames[FDOMWeekDay];
    console.log('292. setFDOMWeekDay = ' + FDOMWeekDay);
    return FDOMWeekDay;
    
}

/*
 * 
 * fill out the remaining five week numbers in the calendar control.
 * 
*/
function addWeekNumbers() {
    var weekNumber;
    weekNumber = setWeekNumber();
    console.log('todo : 42: ' + weekNumber);
    console.log('todo: if weekNumber == 52, then next weeknumber = 1: ' + weekNumber);
    document.getElementById('idStartingWeekNumber').innerHTML = setWeekNumber();
    var element = document.getElementById("0_6");
    element.classList.add("clsWeekNumber");
    /*var i;
    for (i < 6; weekNumber +1 ; i++) {
        console.log('week number: ' + i);
        if (weekNumber == 51) {
            weekNumber = 0
        }
    }*/
    document.getElementById('0_13').innerHTML = (weekNumber + 1);
    document.getElementById('0_13').classList.add('clsWeekNumber');
    document.getElementById('0_20').innerHTML = (weekNumber + 2);
    document.getElementById('0_20').classList.add('clsWeekNumber');
    document.getElementById('0_27').innerHTML = (weekNumber + 3);
    document.getElementById('0_27').classList.add('clsWeekNumber');
    document.getElementById('0_34').innerHTML = (weekNumber + 4);
    document.getElementById('0_34').classList.add('clsWeekNumber');
    document.getElementById('0_41').innerHTML = (weekNumber + 5);
    document.getElementById('0_41').classList.add('clsWeekNumber');
}

/*
 * 
 * convert the month into monthname, or backwards, into monthnumber 
 *
*/
function monthConvert(monthToConvert) {

    var monthString;
    var monthInteger;

    if (typeof monthToConvert == 'number') {
        monthConvertedValue = arrMonthName[monthToConvert];
    } else {
        monthConvertedValue = arrMonthName.indexOf(monthToConvert);
    }
    return monthConvertedValue;
}

/*
 * 
 * 
 *
 */
function employeeChangeStatus() {

    alert('change my status please');

}


/*
 * to fill a range of cells with content
 *
 *
 */
function rangeFiller() {

}

/*
 * determine what weeknumber we have: 
 *
 *
 */
function setWeekNumber() {
    currentDate = new Date();
    startDate = new Date(currentDate.getFullYear(), 0, 1);
    var days = Math.floor((currentDate - startDate) /
        (24 * 60 * 60 * 1000));

    var weekNumber = Math.ceil(days / 7);    // Display the calculated result          //console.log("staffplanner_main, 109: Week number of " + currentDate + " is :   " + weekNumber);

    return weekNumber;
}

/*
 * determine what weeknumber we have: 
 * temporary function, used for filling the calendar control when navigating through months/years
 *
 */
function setWeekNumberRefill(startRefillDate) {
    //startRefillDate should beni n ISO format
    currentDate = new Date();
    startDate = new Date(currentDate.getFullYear(), 0, 1);
    var days = Math.floor((currentDate - startDate) /
        (24 * 60 * 60 * 1000));

    var weekNumber = Math.ceil(days / 7);    // Display the calculated result          //console.log("staffplanner_main, 109: Week number of " + currentDate + " is :   " + weekNumber);

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

/*
 * ...what exactly we need this on efor?? ewi
 *
 *
 */
function endOfWeek(date) {

    var lastday = date.getDate() - (date.getDay() - 1) + 6;
    return new Date(date.setDate(lastday));

}

/*
* set the cell in the table where to start printing out the dates of the current month in the first week of the calendarcontrol; 
*
*/
function setStartCellPrintDates(startDay) {	//alert('87. which cell to start printing dates, 01 of current month. Su=0, Mo=1, Tu=2, Start with day: ' + startDay);
    switch (startDay) {
        case 'Su' || 'su' || 'Sunday' || 0 || '0':
            startXY = '3_6';
            break;
        case 'Mo' || 'mo' || 'Monday' || 1 || '1':
            startXY = '3_7';
            break;
        case 'Tu' || 'tu' || 'Tuesday' || 2 || '2':
            startXY = '3_8';
            break;
        case 'We' || 'we' || 'Wednesday' || 3 || '3':
            startXY = '3_9';
            break;
        case 'Th' || 'th' || 'Thursday' || 4 || '4':
            startXY = '3_10';
            break;
        case 'Fr' || 'fr' || 'Friday' || 5 || '5':
            startXY = '3_11';
            break;
        case 'Sa' || 'sa' || 'Saturday' || 6 || '6':
            startXY = '3_12';
            break;
        default:
            console.log('11156');

    }
    return startXY;
}

/*
 * 
 *
 *
 */
function addCSSClass(applyOnRange, className) {
    document.getElementById(applyOnRange).classList.add('clsDates');
}

/*
 * 
 *
 *
 */
function navigateYear(spanNumber) {
    
    var selectedYear = parseInt(document.getElementById('idSelectedYear').innerText);

    selectedYear = selectedYear + spanNumber;
    uxYearISOCurrent = selectedYear;
    document.getElementById('idSelectedYear').innerText = uxYearISOCurrent;    //console.log('477. fill out calendar control for date: ' + uxYearISOCurrent + '-' + uxMonthISOCurrent + '-01');    //convert uxMonthISOCurrent to the correct format... ja aj... nee...meaning: yyyy-mm-dd
    let uxMonthNISOCurrent = (uxMonthISOCurrent + 1).toString();    //uxMonthNISOCurrent = uxMonthNISOCurrent.toString();    //console.log('491. month NISO: ' + uxMonthNISOCurrent+ ', '+ uxMonthISOCurrent);
    cntChar = uxMonthNISOCurrent.length;
    if (cntChar == 1) {
        uxMonthNISOCurrent = '0' + uxMonthNISOCurrent;
        console.log('0001. Month NISO = '+ uxMonthNISOCurrent);
    }
    var loadDateISO = uxYearISOCurrent + '-' + uxMonthNISOCurrent + '-' + '01';    //console.log('491 lodate date ISO: ' + loadDateISO);
    fillCalCtrl(loadDateISO);
}

function navigateMonth(spanNumber) {
    
    selectedMonth = document.getElementById('idSelectedMonth').innerText;//    alert(selectedMonth);
    if (typeof (selectedMonth === "string")) {
        selectedMonth = monthConvert(selectedMonth)        //console.log('471. selected Month: '+selectedMonth);
    };

    if (selectedMonth < 0 ) { alert('-month does not exist'); }

    if (selectedMonth == 0 && spanNumber == -1) {   //        console.log('477. selected Month: ' + selectedMonth);
        selectedMonth = 11;
        navigateYear(-1);
    } else if (selectedMonth == 11 && spanNumber == 1) {  //        console.log('481. selected Month: ' + selectedMonth);
        selectedMonth = 0;//        console.log('483');
        navigateYear(1);
    } else {  //        console.log('486. selected Month: ' + selectedMonth);
        selectedMonth = selectedMonth + spanNumber;
    }    //console.log('499. selected month: ' + selectedMonth);

    uxMonthISOCurrent = selectedMonth;//ISO format : yyyy-mm ..... correct?
    selectedMonthByName = monthConvert(selectedMonth);   
    document.getElementById('idSelectedMonth').innerHTML = selectedMonthByName;
    setMonthNav(selectedMonth);    //console.log('selected month: '+selectedMonth);    //console.log('calendar control: current FDOM = ' + FDOM);    //console.log('484. a / selectedMonth = ' + a + ' / ' + selectedMonth);    //var b = document.getElementById('idSelectedMonth').innerText;

    //console.log('513. YYYY-Month to be viewed in calendar control: ' + uxYearISOCurrent + '-' + uxMonthISOCurrent + '(' + uxMonthNameCurrent + ')');

    var loadDateISO = uxYearISOCurrent + '-' + uxMonthISOCurrent + '-' + '01';//    console.log('522 lodate date ISO: ' + loadDateISO);

    //convert uxMonthISOCurrent to the correct format... ja aj... nee...meaning: yyyy-mm-dd
    let uxMonthNISOCurrent = (uxMonthISOCurrent + 1).toString();    //uxMonthNISOCurrent = uxMonthNISOCurrent.toString();    //console.log('491. month NISO: ' + uxMonthNISOCurrent+ ', '+ uxMonthISOCurrent);
    cntChar = uxMonthNISOCurrent.length;
    if (cntChar == 1) {
        uxMonthNISOCurrent = '0' + uxMonthNISOCurrent;
    }
    var loadDateISO = uxYearISOCurrent + '-' + uxMonthNISOCurrent + '-' + '01';    //console.log('491 lodate date ISO: ' + loadDateISO);

    fillCalCtrl(loadDateISO);
    
}

/*
 * 
 *
 *
 */
function isInt(value) {
    return !isNaN(value) && (function (x) { return (x | 0) === x; })(parseFloat(value))
}

/*
 * 
 *
 *
 */
function navigateWeek() {

}

/*
 * Formats a date into ISO format 
 * date     : date to be formatted
 * format   : format of the date to be formatted
 */
function ISOFormat(date_format) {
    //dateformat contains to date to be formatted , and the current format of that date. Local, other, etc. use array/split()
    const arrDate = [];
    cDate = arrDate[0];
    alert('535. ' + cDate);
    return dateISO;

}

/*
 * to fill out the remaing dates in the calendar control : 
 * which is on row 3, column 6 till 47. For six weeks, 6 * 7 days =  42 days 47 -/- 42 = 5 . 5+1=6th column ja ja
 *
 * startInCellID =  the cell in which the FOCM_ISO will be put (First Of Current Month)
 */
function addOneDay(startInCellID) {
    // 3_9 till 3-47 => 6 weeks * 7 days = 42 days to be filled in in the calendar control

    //console.log('8. startInCellID: ' + startInCellID);
    //console.log("9. FOCSM_ISO: " + FOCM_ISO);

    startWithDate = FOCM_ISO;//so , do not start with the current date. do not start with today

    let startColumn;
    let daysToViewFromPreviousMonth;
    let endColumnCellID = 47;  //cell id => 3_9, or use a counter: 7 days * 6 weeks, representing the calendar control

    const arrCounter = startInCellID.split('_');
    startColumn = arrCounter[1];//    console.log('23. startColumn = ' + startColumn);
    daysToViewFromPreviousMonth = (startColumn - 6);//TODO: why there is a -6 ????????? willy le carrot!!!    console.log('24. daysToViewFromPreviousMonth = ' + daysToViewFromPreviousMonth);

    let dateObj = new (Date);
    dateObj = new Date(FOCM_ISO);//    console.log('29. converted FOCM_ISO to locale date: ' + dateObj);
    dateObj.setDate(dateObj.getDate() + - daysToViewFromPreviousMonth);//    console.log('31 dateObj : ' + dateObj);

    //fill an array with 7 days * 6 weeks dates, starting with dateObj,
    let conversion2ISO;
    const array42Days = [];
    for (let i = 1; i <= 42; i++) {
        conversion2ISO = (dateObj.toISOString().substring(5, 10));
        array42Days.push(conversion2ISO);
        dateObj.setDate(dateObj.getDate() + 1);
    }

    //array42Days.forEach(functionPrintThis);
    //console.log('38. array42Days[] = ' + array42Days);
    //put the array values into the html:
    let elementID;
    let rowY = '3_';
    let counter1;
    let counter1ToString;
    startColumn = '6';//    console.log('44. startColumn = ' + startColumn);

    for (let i = 0; i < 42; i++) {

        //1st value from array:
        dateInnerHTML = array42Days[i];//        console.log('49. i=' + i + ' - dateInnerHTML: ' + dateInnerHTML);

        //set elementID:
        counter1 = (i + Number(startColumn));
        counter1ToString = counter1.toString();
        elementID = rowY + counter1ToString;        //console.log('48. i=' + i + ': ' + counter1ToString);        //dateToISO = (dateObj.toISOString()).substring(0, 10);       console.log('53 element ID = ' + elementID);

        document.getElementById(elementID).innerHTML = dateInnerHTML;
    }
}


/*
 * set today's date in ISO format. and split it into separate year - month - day , as YYYY - MM - DD
 *
*/
function convertToISO(xDate) {
    console.log('536-START. xDate = ' + xDate); //x = 'Fri Jun 23 2023 16:29:15 GMT+0100 (Central European Standard Time)';

    dateToday = dateToday.toISOString().substring(0, 10);
    xDate = xDate.toISOString().substring(0, 10);

    console.log('541 wrx. Todays date in ISO = ' + xDate);/*
    Date TodayISO = xDate.toISOString();
    Day TodayISO = x.getDay();
    console.log('70 test. Date TodayISO = ' + Date TodayISO);*/

    return (xDate);
}

function setCurrentDate() {

    dateToday = new (Date);
    DateTodayISO = convertToISO(dateToday);
    
}


/*
 * adds a name to the document.getElementByName name= 'HAR' // HAR represents the id of a coworker.
 * 
*/
function addSetAttributeName(startCell, endCell, nameFunction, attributeName, param1) {

    console.log("007 set name attribute");

    //for range defined by startCell till endCell , do:
    if (attributeName == null) {
        attributeName = 'onclick';
    }

    const arrayStartPosition = startCell.split('_'); //start position: x row, y column
    const arrayEndPosition = endCell.split('_'); //end position: x row, y column

    let startRow;
    let endRow;
    let startColumn;
    let endColumn;

    //startRow = arrayStartPosition[0];
    startRow = Number(arrayStartPosition[0]);
    endRow = Number(arrayEndPosition[0]);
    startColumn = Number(arrayStartPosition[1]);
    endColumn = Number(arrayEndPosition[1]);	//console.log('96. startRow = ' + startRow + ', endRow = ' + endRow);	//console.log('97. startColumn = ' + startColumn + ', endColumn = ' + endColumn);

    let i = 1;
    let k = 1;
    let cellRowColumn;
    for (i = startRow; i <= endRow; i++) {   //per row//console.log('104. i=' + i + '(startRow=' + startRow +')');

        for (k = startColumn; k <= endColumn; k++) {
            cellRowColumn = i + '_' + k;	//console.log('107. cell: ' + cellRowColumn);			//document.getElementById('5_6').setAttribute(attributeName, `changeColor("verander mijn kleurtje")`);			console.log('107. add onclick event');	//var x = document.getElementById('5_7');
            document.getElementById(cellRowColumn).setAttribute("name", param1);
        }
    }
}

/*
 * 
 * put the date of first day of the month (eg 1st of August) in the right cell, underneath the appropriate day
 * 
*/
function setFirstOfCurrentMonth() {	//let FOCM_ISO;//First of Current Month - ISO format
    let dateISO;
    let dateSubString;    //FOCM_DayName = new (Date);    /*date5 = new (Date);    dateISO = date5.toISOString();*/
    dateISO = new (Date);
    dateISO = dateISO.toISOString();
    const arrayDateInfo = dateISO.split("T");
    dateSubString = arrayDateInfo[0];//	console.log(dateSubString);
    let sub5;
    sub5 = dateSubString.toString();
    sub5 = sub5.substring(0, 7);
    FOCM_ISO = sub5 + '-01'; //console.log('115. FOCM_ISO = ' + FOCM_ISO);
    const dateObj = new Date(FOCM_ISO); //console.log('74. converted to locale date: ' + dateObj);
    FOCM_DayName = dateObj.getDay();//0=SU, 1=Mo, 2=Tu etc.
    //console.log('118. FOCM_DayName: ' + FOCM_DayName);
    FOCM_DayName = arrDayNames[FOCM_DayName]; //console.log('119. FOCM_DayName: ' + FOCM_DayName);

    startPrintingInCellID = setStartCellPrintDates(FOCM_DayName);
    //console.log('122. start printing dates in cell: ' + startPrintingInCellID);
    //startPrintingInCellID = 5 + Number(FOCM_DayName);    console.log('124. Start printing in cell id: ' + startPrintingInCellID);
    //console.log('125. todo: next line, make it dynamically, willy carrot');

    document.getElementById(startPrintingInCellID).innerHTML = FOCM_ISO.substring(5, 10);
    addOneDay(startPrintingInCellID);
}

/*
 * edit the Schedule, if checkbox Sunday/Monday etc., then fill out this day 
 * throughout the whole calendarcontrol for the corresponding coworker
 *
*/
function editSchedule(elementIdentifier, fillDay, rowID_Coworker) {
    //elementIdentifier and fillDay are parameters passed/coded into the call to this function. 
    alert('48: fill day: ' + fillDay + ', element by ID or by Name: ' + elementIdentifier);
    //if (fillDay == null) {

    let x = document.getElementById(elementIdentifier).checked;
    alert(x);
    if (x == true) {
        alert('set all seelcted days in the calendar control  here');
    }

    //for range Calendarcontrol month show, do => check if day is equal to fillDay, if yes=> then color Green, de cell of the corresponding
    // range = row_6 till row_47, where row represents the days for the corresponding coworker

    //add name="HAR" to html for range Harold/Mitche/Nick/Erik
    //for each getElementbyName='HAR' => check if this day (current year + mm + dd) 

}

/*
 * adds onclick events to a (range of) cells
 * 
*/
function addAttributeToElementID(elementID, attributeName) {


}

/*
 * 
 * settings for visual UX only. Not of any functional nor technical use. Function is executed after all 
 * all other info is inserted/implemented
 * 
*/
function additionsInterface() {
    //alert('82 additions for UX only. Eg adding month name in row');
}


/*
 * 
 * settings for visual UX only.Not of any functional nor technical use.Function is executed after all
 * all other info is inserted / implemented
 *  XML TEST HERE:
*/
function xmlTest() {
    viewCoworkers = new XMLHttpRequest();
}

/*
 *
 * settings for visual UX only.Not of any functional nor technical use.Function is executed after all
 * all other info is inserted / implemented
 *  XML TEST HERE:
*/
function viewEmployeesXML() {
    const xhttp = new XMLHttpRequest();
    const coworkersUrl = "C:/ewi_websites/personeelsplanner/data/coworkers.xml";

    xhttp.onload = function () {
        alert('35. working?');
        document.getElementById("viewCoworkersXML").innerHTML = this.responseText;
    }
    xhttp.open("GET", coworkersUrl);
    xhttp.send();
}

