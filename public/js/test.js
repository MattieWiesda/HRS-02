
function fillCalCtrl(fillCalCtrlDate) {
    //console.log('3 . fill calendar control, start with date: ' + fillCalCtrlDate);
    //console.log(uxMonthISOCurrent+'-' + uxMonthNameCurrent);
    //console.log('4. ' + fillCalCtrlDate);

    FOM = uxAddFirstOfSelectedMonth(fillCalCtrlDate);

    uxFillCalendarControl(startPrintingInCellID, FOM);
    console.log('000');

}

function uxAddFirstOfSelectedMonth(FOM) {
    //determine what day (Sa / Su / Mo the first of the selected month (eg: 2023-08-01) is, and put it in the calendar control
    console.log('001 FOM = ' + FOM);
    const dateObj = new Date(FOM);
    FOCM_DayName = dateObj.getDay();//0=SU, 1=Mo, 2=Tu etc.
    
    //console.log('002. converted to locale date: ' + dateObj);
    FOMDayName = dateObj.getDay();
    console.log('003. FOMDayName: ' + FOMDayName);    //FOCM_DayName = arrDayNames[FOCM_DayName]; 
    FOMDayName = arrDayNames[FOMDayName];
    console.log('004. FOMDayName: ' + FOMDayName);
    startPrintingInCellID = setStartCellPrintDates(FOMDayName);
    console.log('005. start printing dates in cell: ' + startPrintingInCellID);    //document.getElementById(startPrintingInCellID).innerHTML = FOCM_ISO.substring(5, 10);
    console.log('006. ' + FOM.substring(5, 10) + ' --FOM: ' + FOM);

    document.getElementById(startPrintingInCellID).innerHTML = FOM.substring(5, 10);
    document.getElementById(startPrintingInCellID).style.backgroundColor = "yellow";//todo : remove
    return FOM;
    //addOneDay(startPrintingInCellID);
    //uxFillCalendarControl(startPrintingInCellID, FOM);

}


/*
 * to fill out the remaing dates in the calendar control : 
 * which is on row 3, column 6 till 47. For six weeks, 6 * 7 days =  42 days 47 -/- 42 = 5 . 5+1=6th column ja ja
 *
 * startInCellID =  the cell in which the FOCM_ISO will be put (First Of Current Month)
 */
function uxFillCalendarControl(startInCellID, FOM) {    // 3_9 till 3-47 => 6 weeks * 7 days = 42 days to be filled in in the calendar control

    //startWithDate = FOCM_ISO;//so , do not start with the current date. do not start with today
    startWithDate = FOM;
    console.log('007 FOM: ' + FOM);
    let startColumn;
    let daysToViewFromPreviousMonth;
    let endColumnCellID = 47;  //cell id => 3_9, or use a counter: 7 days * 6 weeks, representing the calendar control

    const arrCounter = startInCellID.split('_');
    startColumn = arrCounter[1];//    console.log('23. startColumn = ' + startColumn);
    daysToViewFromPreviousMonth = (startColumn - 6);//TODO: why there is a -6 ????????? willy le carrot!!!    console.log('24. daysToViewFromPreviousMonth = ' + daysToViewFromPreviousMonth);

    console.log('008. Days to view from previous month: ' + daysToViewFromPreviousMonth);
    let dateObj = new (Date);
    dateObj = new Date(FOM);//    console.log('29. converted FOCM_ISO to locale date: ' + dateObj);
    dateObj.setDate(dateObj.getDate() + - daysToViewFromPreviousMonth);//    console.log('31 dateObj : ' + dateObj);

    //fill an array with 7 days * 6 weeks dates, starting with dateObj,
    let conversion2ISO;
    const array42Days = [];
    for (let i = 1; i <= 42; i++) {
        conversion2ISO = (dateObj.toISOString().substring(5, 10));
        array42Days.push(conversion2ISO);
        dateObj.setDate(dateObj.getDate() + 1);
    }

    //put the array values into the html:
    let elementID;
    let rowY = '3_';
    let counter1;
    let counter1ToString;
    startColumn = '6';//the first column where the dates have to be put in the calendar control.

    if (uxMonthISOPrevious == 11) {
        cuxMonthISOPrevious = 12;
    } else {
        (cuxMonthISOPrevious = uxMonthISOPrevious + 1);
    }

    if (uxMonthISOCurrent == 11) {
        cuxMonthISOCurrent = 12;
    } else {
        (cuxMonthISOCurrent = uxMonthISOCurrent + 1);
    }

    if (uxMonthISONext == 11) {
        cuxMonthISONext = 12;
    } else {
        (cuxMonthISONext = uxMonthISONext + 1);
    }

    for (let i = 0; i < 42; i++) {
        //1st value from array:
        dateInnerText = array42Days[i];

        addColorToMonth = dateInnerText.split("-");//console.log('101. month: ' + addColorToMonth[0]);

        console.log('102. . i=' + i + ' - dateInnerText: ' + dateInnerText);
        
        //s et elementID:
        counter1 = (i + Number(startColumn));
        counter1ToString = counter1.toString();
        elementID = rowY + counter1ToString;        //console.log('48. i=' + i + ': ' + counter1ToString);        //dateToISO = (dateObj.toISOString()).substring(0, 10);       console.log('53 element ID = ' + elementID);
        //console.log('009. Days to view from previous  month: ' + daysToViewFromPreviousMonth);
        document.getElementById(elementID).innerHTML = dateInnerText;

        if (cuxMonthISOPrevious == Number(addColorToMonth[0])) {
           document.getElementById(elementID).style.backgroundColor = '#FFFFCC';
        }

        if (cuxMonthISOCurrent == Number(addColorToMonth[0])) {
            document.getElementById(elementID).style.backgroundColor = '#FFFF66';
        }

        if (cuxMonthISONext == Number(addColorToMonth[0])) {
            document.getElementById(elementID).style.backgroundColor = '#FFFFCC';
        }
    }
    uxWeekStartsWithDate = uxYearISOCurrent + '-'+ document.getElementById('3_6').innerText;//console.log('124. week starts with date: ' + uxWeekStartsWithDate);
    uxSetWeek(uxWeekStartsWithDate);
    uxAddMonth();
}

/*
 * 
 * Add weeknumbers to the ux: 
 * this function is supposed to replace function setWeek(){};
*/
function uxSetWeek(startWithDate) {
    let weekNumber = uxSetWeekNumber(startWithDate);//    console.log('134. week number = ' + weekNumber);
    document.getElementById('0_6').innerText = weekNumber;//console.log('88. week: ' + weekNumber);

    //2nc week:
    uxWeekStartsWithDate = uxYearISOCurrent + '-' + document.getElementById('3_13').innerText;
    weekNumber = uxSetWeekNumber(uxWeekStartsWithDate);//    console.log('144. week number = ' + weekNumber);
    document.getElementById('0_13').innerText = weekNumber;
    
    //3rd week:
    uxWeekStartsWithDate = uxYearISOCurrent + '-' + document.getElementById('3_20').innerText;
    weekNumber = uxSetWeekNumber(uxWeekStartsWithDate);
    document.getElementById('0_20').innerText = weekNumber;
    //5th week:
    uxWeekStartsWithDate = uxYearISOCurrent + '-' + document.getElementById('3_27').innerText;
    weekNumber = uxSetWeekNumber(uxWeekStartsWithDate);
    document.getElementById('0_27').innerText = weekNumber;
    //6th week:
    uxWeekStartsWithDate = uxYearISOCurrent + '-' + document.getElementById('3_34').innerText;
    weekNumber = uxSetWeekNumber(uxWeekStartsWithDate);
    document.getElementById('0_34').innerText = weekNumber;
    //6th week:
    uxWeekStartsWithDate = uxYearISOCurrent + '-' + document.getElementById('3_41').innerText;
    weekNumber = uxSetWeekNumber(uxWeekStartsWithDate);
    document.getElementById('0_41').innerText = weekNumber;

}


/*
 * 
 * fill out the remaining five week numbers in the calendar control.
 * 
*/
function uxAddWeekNumbers() {
    var weekNumber;
    weekNumber = setWeekNumber();//    console.log('151. todo : 42: ' + weekNumber);    console.log('152. todo: if weekNumber == 52, then next weeknumber = 1: ' + weekNumber);
    document.getElementById('idStartingWeekNumber').innerHTML = setWeekNumber();
    var element = document.getElementById("0_6");
    element.classList.add("clsWeekNumber");
    
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

function viewVariables() {
    /*
    console.log('126. ' + uxMonthISOCurrent);
    console.log('126. ' + uxMonthNameCurrent);
    console.log('126. ' + uxMonthISOPrevious);
    console.log('126. ' + uxMonthNamePrevious);
    console.log('126. ' + uxMonthISONext);
    console.log('126. ' + uxMonthNameNext);*/

}

function uxSetWeekNumber(FOM) {

        //define a date object variable with date inside it
    //var date1 = new Date("10/09/2023");
    var date1 = new Date(FOM);

        //find the year of the entered date  
        var oneJan =  new Date(date1.getFullYear(), 0, 1);

        // calculating number of days in given year before the given date   
        var numberOfDays =  Math.floor((date1 - oneJan) / (24 * 60 * 60 * 1000));

        // adding 1 since to current date and returns value starting from 0   
        var result = Math.ceil(( date1.getDay() + 1 + numberOfDays) / 7);

    //display the calculated result         
    //console.log("194. FOM = " + FOM);
    //console.log("195.  Week Number of date (" + date1 + ") is: <br>" + result);
    return result;
  
}

/*
 *
 * add the name of the month into the UserInterface
 *
 */
function uxAddMonth() {
    // FIRST : erase all data: 

    eraseDataInTableRange('1_6', '1_47');

    let valueCellID;
    let nextCellID;
    let prnMonthName;

    //add month:
    //Always add the appropriate value for cell ID : 1_6:   
    //get value of cell ID 3_6, this is where the first date in teh calendar control will be printed. 

    valueCellID = document.getElementById('3_6').innerText;

    //determine what month name belongs to this date: 

    valueCellIDArray = valueCellID.split('-');
    valueCellID = valueCellIDArray[0];    console.log(valueCellID);
    valueCellID = parseInt(valueCellID);    console.log(valueCellID);
    prnMonthName = (arrMonthName[valueCellID - 1]).substring(0, 3);

    document.getElementById('1_6').innerText = prnMonthName;//    console.log('250. value to be converted to month name: ' + prnMonthName);

    //After value is put into 1_6, look the next different value of MonthName.
    
    let columnCnt = 7; //start counting the columns containing a dat in the calendar control : 
    nextCellID = '3_' + columnCnt;  //    console.log('260. next cell ID = ' + nextCellID);
    for (i = 1; i < 46 && columnCnt < 48; i++ ) {
        valueCellID = document.getElementById(nextCellID).innerText;//        console.log('262. valueCellID = ' + i + ': ' + valueCellID); console.log('263. next Cell ID = ' + nextCellID);
        valueCellIDArray = valueCellID.split('-');
        valueCellID = valueCellIDArray[0];
        valueCellID = parseInt(valueCellID);
        prnMonthNameNext = (arrMonthName[valueCellID - 1]).substring(0, 3);        //console.log('262. prnMonthNameNext = ' + prnMonthNameNext);
        if (prnMonthName == prnMonthNameNext) {
            //console.log('270 prnMonthName = ' + prnMonthName + ', volgende: ' + prnMonthNameNext);
        } else {
            setCellID = '1_' + columnCnt;//   console.log('273 Column count: ' + columnCnt);
            document.getElementById(setCellID).innerText = prnMonthNameNext;
            prnMonthName = prnMonthNameNext;
        }
        prnMonthName = prnMonthNameNext;
        columnCnt++;
        nextCellID++;
        nextCellID = '3_' + columnCnt;//        console.log('281. next Cell ID = ' + nextCellID);        console.log('282. column count = ' + columnCnt);        //console.log('270 prnMonthName = ' + prnMonthName + ', volgende: ' + prnMonthNameNext + ', kolom: ' + columnCnt);
    }
    //console.log('end loop');
}

/*
 * erase data in the given range
 *
 * this function is supposed to replace function: setWeekNumber(){}
 *
 */
function eraseDataInTableRange(startCell, endCell, cntX, cntY) {

    const arrayStartPosition = startCell.split('_'); //start position: x row, y column
    const arrayEndPosition = endCell.split('_'); //end position: x row, y column
    let startRow;
    let endRow;
    let startColumn;
    let endColumn;

    startRow = Number(arrayStartPosition[0]); //startRow = arrayStartPosition[0];
    endRow = Number(arrayEndPosition[0]);
    startColumn = Number(arrayStartPosition[1]);
    endColumn = Number(arrayEndPosition[1]);	//console.log('96. startRow = ' + startRow + ', endRow = ' + endRow);	//console.log('97. startColumn = ' + startColumn + ', endColumn = ' + endColumn);

    let i = 1;
    let k = 1;
    let cellRowColumn;
    for (i = startRow; i <= endRow; i++) {   //per row//console.log('104. i=' + i + '(startRow=' + startRow +')');

        for (k = startColumn; k <= endColumn; k++) {
            cellRowColumn = i + '_' + k;	//console.log('107. cell: ' + cellRowColumn);			//document.getElementById('5_6').setAttribute(attributeName, `changeColor("verander mijn kleurtje")`);			console.log('107. add onclick event');	//var x = document.getElementById('5_7');
            document.getElementById(cellRowColumn).innerText = '';

        }
    }
}
