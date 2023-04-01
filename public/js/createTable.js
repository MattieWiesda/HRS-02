/*==================================================================================================================*/
/* Copyright Mosaedata.nl																							*/
/* Erik Wijsen                																						*/
/* Van den Berghstraat 47																							*/
/* 6221 XB Maastricht         																						*/
/*==================================================================================================================*/


/*
 * Clears of fills cells. Clears=> remove content for CSS purposes only. Fill: add location of cell, ROW/COLUMN
 * v2.0
 *  
*/
function clearCells() {
	alert('9');
}

/*
 * Generates a table that will be appended after the table for Year / Month
 * 
 * 
*/
function generateTable(idTable, nrRows, nrColumns) {	// add a horizontal line first, to DIV tableGeneral: insertDOMElement

	const drawHr = document.createElement("hr");//TODO:  replace with function enerating DOM Element
	document.getElementById("tableGeneral").appendChild(drawHr);	//TODO: insertDOMElement("hr", "id22", "tableGeneral");//is added at the bottom of page... todo: 

	const generateTable = document.createElement("table");
	
	if (nrRows==0){ 
		console.log ('err e0015');
	}

	generateTable.id = idTable;
	generateTable.innerText = "HRScheduler:";
	document.getElementById("tableGeneral").appendChild(generateTable);

	addRow(idTable, nrRows, nrColumns);

	document.getElementById('timeTableWeek').style.visibility = 'hidden';

}

/*
 * Adding rows, columns to a table
 *
*/
function addRow(idTable, nrRows, nrCells) {

	let table = document.getElementById(idTable);

	for (let i = 0; i < nrRows; i++) {
		let row = table.insertRow(i);
		row.id = i;
		addCell((row.id), nrCells);
	}
}

/*
 * adds cells and puts a counter in these cells
 * Todo: remove cell filler
 * 
*/
function addCell(idRow, nrCells) {

	rowNr = document.getElementById(idRow);
	let cell;
	for (let i = 0; i < nrCells; i++) {
		cell = rowNr.insertCell(i);
		cell.id = idRow + '_' + i;		//cell.innerHTML = (idRow + ':' + i);//rowfiller  //console.log('TODO: remove this line...but not yet... :-)  ')
		fillInnerHTML(i, idRow, i);
	}
}

/*
 * adds onclick events to a (range of) cells
 * 
*/
function addSetAttribute(startCell, endCell, nameFunction, attributeName) {
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
	for (i = startRow; i <= endRow; i++) {   //per row// 		console.log('104. i=' + i + '(startRow=' + startRow +')');

		for (k = startColumn; k <= endColumn; k++) { 
			cellRowColumn = i + '_' + k;//			console.log('107. cell: ' + cellRowColumn);			//document.getElementById('5_6').setAttribute(attributeName, `changeColor("verander mijn kleurtje")`);			console.log('107. add onclick event');	//var x = document.getElementById('5_7');
			document.getElementById(cellRowColumn).classList.add('clsRed');			//cellIDPush = toString(cellRowColumn);			//console.log ('111. createTable.js :' + cellIDPush); not used
			document.getElementById(cellRowColumn).setAttribute("onclick", `changeColor("verander mijn kleurtje nu", "` + cellRowColumn + `")`);// also the selected date will be put into the cell
		}
	}
}

/*
 * 
 * 
 * 
*/
function changeColor(showTxt, cellIDPush) {
	
	let colorBackground = document.getElementById(cellIDPush).style.backgroundColor;

	if (colorBackground == "") {
		colorBackground = "red";
	}

	let infoAvailable; //boolean? ja, but..., if there's info in the cell: yes, if not: no
	let copyDate;

	infoAvailable = document.getElementById(cellIDPush).innerText;	//alert(infoAvailable);	//const arrayDateSplit = [];  //alert('121 todo: if not null, then remove txt info');
	console.log('133. color background: ' + colorBackground + ', info in txztbox: ' + infoAvailable);

	var array = cellIDPush.split('_'); // what about assigning values, arrays, assignign values to arrays		//copyDate = arrayDateSplit[1];
	copyDate = array[1];
	copyDate2 = ('4_' + copyDate); //todo
	copyDate = ('3_' + copyDate);//todo which is row number 3 and the appropriate column of the date clicked for:		//alert(copyDate);
	console.log('146 . rij column: ' + copyDate2);
	//row 4 => color green, 100%
	if (colorBackground == "yellow" && infoAvailable != null) {
		document.getElementById(cellIDPush).style.backgroundColor = "red";
		document.getElementById(cellIDPush).innerText = '';
		//set Task as 'not completed' by changing it's background color to... nothing, or...transparant...?
		document.getElementById(copyDate2).style.backgroundColor = "";
		document.getElementById(copyDate2).innerText = '';
	} else {
		(document.getElementById(cellIDPush).style.backgroundColor = "yellow");
		document.getElementById(cellIDPush).innerText = document.getElementById(copyDate).innerText;
		//Task completed? : 
		document.getElementById(copyDate2).style.backgroundColor = "green";
		document.getElementById(copyDate2).innerText = '100%';

	}
}

/*
* Generates a table that will be appended and inserted into a DOM id. eg <div id='123'>
* v2.0
*/
function generateTableV20(idTable, nrRows, nrColumns) {	// add a horizontal line first, to DIV tableGeneral:

	const drawHr = document.createElement("hr");
	document.getElementById("tableGeneral").appendChild(drawHr);
	generateHR('idHR2',  );
	const generateTable = document.createElement("table");

	if (nrRows == 0) {
		console.log('err e0015');
	}

	generateTable.id = idTable;
	generateTable.innerText = "24. Table ewi:";
	document.getElementById("tableGeneral").appendChild(generateTable);

	addRow(idTable, nrRows, nrColumns);

}

/*
* Generates a horizontal line
*
*/
function generateHR(idHR, location) {	// add a horizontal line first, to DIV tableGeneral:

	const drawHr = document.createElement("hr");
	document.getElementById("tableGeneral").appendChild(drawHr);
}

/*
 * Inserts/generates a DOM element.
 * 
 * location: getElementByID, or append to body. 
 * 
*/
function insertDOMElement(DOMElement, idElement, location, addToIdElement) {	// add a horizontal line first, to DIV tableGeneral:

	if (addToIdElement == null) {
		addToIdElement = "idHRSBody"
	}	
	DOMElement = document.createElement(DOMElement);
	DOMElement.id = idElement;
	document.getElementById(addToIdElement).appendChild(DOMElement);	/*WORKS: const drawElement = document.createElement(DOMElement);    document.getElementById("idHRSBody").appendChild(drawElement);*/ 	//alert('76 element added: ' + DOMElement + ', Id name= ' + idElement);
}

/*
 * 
 * add a combobox to select task to be planned
 * Todo: make this a dynamical procedures. you willy carrot. 
 * 
*/
function addCboSelect(idCell) {
	//todo : read from file - write to file
	const cboSelectTask = document.createElement("select");
	const selectTaskDescription = "Landscaping";

	cboSelectTask.id = "idSelectTask";
	cboSelectTask.name = "nameSelectTask";
	cboSelectTask.append(selectTaskDescription);
	document.getElementById(idCell).appendChild(cboSelectTask);
	//todo : dynamic
	var x = document.getElementById('idSelectTask');
	var option1 = document.createElement('option');
	var option2 = document.createElement('option');
	var option3 = document.createElement('option');
	var option4 = document.createElement('option');
	var option5 = document.createElement('option');


	option1.innerText = 'Nightshift 23.00 - 07.00';
	x.add(option1);
	option2.innerText = 'Shop 9.00 - 18.00';
	x.add(option2);
	option3.innerText = 'Service 1: 06.00 - 10.00';
	x.add(option3);
	option4.innerText = 'Service 2: 18.00 - 22.00';
	x.add(option4);
	option5.innerText = 'Guest transfer';
	x.add(option5);

	document.getElementById(idCell).classList.add('clsNullDataDisplay');

}

/*
 * fills the cells with content
 *
*/
function fillInnerHTML(content, idRow, idColumn){
	if (idRow == 7 && idColumn == 7) {
		document.getElementById(idRow + '_' + idColumn).innerHTML = content;
	} else if (idRow == 7 && idColumn == 45) {
		//alert('112');//todo : remove adding 'STOP' , remove filling column 45
		document.getElementById(idRow + '_' + idColumn).innerHTML = content;
	} else if (idRow == 0 && idColumn == 4) {
		document.getElementById(idRow + '_' + idColumn).innerHTML = 'week:';
	} else if (idRow == 1 && idColumn == 4) {
		document.getElementById(idRow + '_' + idColumn).innerHTML = 'Month:';
	} else if (idRow == 2 && idColumn == 4) {
		document.getElementById(idRow + '_' + idColumn).innerHTML = 'Day:';
	} else if (idRow == 3 && idColumn == 4) {
		document.getElementById(idRow + '_' + idColumn).innerHTML = 'date:';
	} else if (idRow == 4 && idColumn == 0) {
		document.getElementById(idRow + '_' + idColumn).innerHTML = '';//addCboSelectTask
	} else if (idRow == 5 && idColumn == 0) {
		document.getElementById(idRow + '_' + idColumn).innerHTML = 'Harold';
	} else if (idRow == 6 && idColumn == 0) {
		document.getElementById(idRow + '_' + idColumn).innerHTML = 'Mitchel'; //document.getElementById('6').style.backgroundColor = "yellow"; //todo : visualize a line or color so a coworker doesn't lose track in the horizontal view that might be too long
	} else if (idRow == 7 && idColumn == 0) {
		document.getElementById(idRow + '_' + idColumn).innerHTML = 'Nicholas';
	}else if (idRow == 8 && idColumn == 0) {
		document.getElementById(idRow + '_' + idColumn).innerHTML = 'Matteo';
	} else if (idColumn == 1 || idColumn == 2 || idColumn == 3 || idColumn == 5) {
		//console.log('64: for columns 1,2,3 and 5=> empty content');
		console.log('268. todo what??');
	} else if (idRow == 2 && idColumn == 6) {
		document.getElementById(idRow + '_' + idColumn).innerHTML = 'Su';
	} else if (idRow == 2 && idColumn == 7) {
		document.getElementById(idRow + '_' + idColumn).innerHTML = 'Mo';
	} else if (idRow == 2 && idColumn == 8) {
		document.getElementById(idRow + '_' + idColumn).innerHTML = 'Tu';
	} else if (idRow == 2 && idColumn == 9) {
		document.getElementById(idRow + '_' + idColumn).innerHTML = 'We';
	} else if (idRow == 2 && idColumn == 10) {
		document.getElementById(idRow + '_' + idColumn).innerHTML = 'Th';
	} else if (idRow == 2 && idColumn == 11) {
		document.getElementById(idRow + '_' + idColumn).innerHTML = 'Fr';
	} else if (idRow == 2 && idColumn == 12) {
		document.getElementById(idRow + '_' + idColumn).innerHTML = 'Sa';
	} else if (idRow == 2 && idColumn == 13) {
		document.getElementById(idRow + '_' + idColumn).innerHTML = 'Su';
	} else if (idRow == 2 && idColumn == 14) {
		document.getElementById(idRow + '_' + idColumn).innerHTML = 'Mo';
	} else if (idRow == 2 && idColumn == 15) {
		document.getElementById(idRow + '_' + idColumn).innerHTML = 'Tu';
	} else if (idRow == 2 && idColumn == 16) {
		document.getElementById(idRow + '_' + idColumn).innerHTML = 'We';
	} else if (idRow == 2 && idColumn == 17) {
		document.getElementById(idRow + '_' + idColumn).innerHTML = 'Th';
	} else if (idRow == 2 && idColumn == 18) {
		document.getElementById(idRow + '_' + idColumn).innerHTML = 'Fr';
	} else if (idRow == 2 && idColumn == 19) {
		document.getElementById(idRow + '_' + idColumn).innerHTML = 'Sa';
	} else if (idRow == 2 && idColumn == 20) {
		document.getElementById(idRow + '_' + idColumn).innerHTML = 'Su';
	} else if (idRow == 2 && idColumn == 21) {
		document.getElementById(idRow + '_' + idColumn).innerHTML = 'Mo';
	} else if (idRow == 2 && idColumn == 22) {
		document.getElementById(idRow + '_' + idColumn).innerHTML = 'Tu';
	} else if (idRow == 2 && idColumn == 23) {
		document.getElementById(idRow + '_' + idColumn).innerHTML = 'We';
	} else if (idRow == 2 && idColumn == 24) {
		document.getElementById(idRow + '_' + idColumn).innerHTML = 'Th';
	} else if (idRow == 2 && idColumn == 25) {
		document.getElementById(idRow + '_' + idColumn).innerHTML = 'Fr';
	} else if (idRow == 2 && idColumn == 26) {
		document.getElementById(idRow + '_' + idColumn).innerHTML = 'Sa';
	} else if (idRow == 2 && idColumn == 27) {
		document.getElementById(idRow + '_' + idColumn).innerHTML = 'Su';
	} else if (idRow == 2 && idColumn == 28) {
		document.getElementById(idRow + '_' + idColumn).innerHTML = 'Mo';
	} else if (idRow == 2 && idColumn == 29) {
		document.getElementById(idRow + '_' + idColumn).innerHTML = 'Tu';
	} else if (idRow == 2 && idColumn == 30) {
		document.getElementById(idRow + '_' + idColumn).innerHTML = 'We';
	} else if (idRow == 2 && idColumn == 31) {
		document.getElementById(idRow + '_' + idColumn).innerHTML = 'Th';
	} else if (idRow == 2 && idColumn == 32) {
		document.getElementById(idRow + '_' + idColumn).innerHTML = 'Fr';
	} else if (idRow == 2 && idColumn == 33) {
		document.getElementById(idRow + '_' + idColumn).innerHTML = 'Sa';
	} else if (idRow == 2 && idColumn == 34) {
		document.getElementById(idRow + '_' + idColumn).innerHTML = 'Su';
	} else if (idRow == 2 && idColumn == 35) {
		document.getElementById(idRow + '_' + idColumn).innerHTML = 'Mo';
	} else if (idRow == 2 && idColumn == 36) {
		document.getElementById(idRow + '_' + idColumn).innerHTML = 'Tu';
	} else if (idRow == 2 && idColumn == 37) {
		document.getElementById(idRow + '_' + idColumn).innerHTML = 'We';
	} else if (idRow == 2 && idColumn == 38) {
		document.getElementById(idRow + '_' + idColumn).innerHTML = 'Th';
	} else if (idRow == 2 && idColumn == 39) {
		document.getElementById(idRow + '_' + idColumn).innerHTML = 'Fr';
	} else if (idRow == 2 && idColumn == 40) {
		document.getElementById(idRow + '_' + idColumn).innerHTML = 'Sa';
	} else if (idRow == 2 && idColumn == 41) {
		document.getElementById(idRow + '_' + idColumn).innerHTML = 'Su';
	} else if (idRow == 2 && idColumn == 42) {
		document.getElementById(idRow + '_' + idColumn).innerHTML = 'Mo';
	} else if (idRow == 2 && idColumn == 43) {
		document.getElementById(idRow + '_' + idColumn).innerHTML = 'Tu';
	} else if (idRow == 2 && idColumn == 44) {
		document.getElementById(idRow + '_' + idColumn).innerHTML = 'We';
	} else if (idRow == 2 && idColumn == 45) {
		document.getElementById(idRow + '_' + idColumn).innerHTML = 'Th';
	} else if (idRow == 2 && idColumn == 46) {
		document.getElementById(idRow + '_' + idColumn).innerHTML = 'Fr';
	} else if (idRow == 2 && idColumn == 47) {
		document.getElementById(idRow + '_' + idColumn).innerHTML = 'Sa';
	} else if (idRow == 3 && idColumn == 0) {

	}
}

/*
 * fills the cells with content
 * todo remove
*/
function obsoletefillInnerHTMLWeekNumbers(content, idRow, idColumn) {
	console.log('todo: put InnHTMl filler for weeknumbers in a for each loop');
}


/*
** The idCell is used to determine what the content of a cell will be
** for each cell, determine what content
** todo : remove
*/
function obsoletefillInnerHTML_idCell(idCell){
		
	alert('361');

}

/*
 * add layout 
 *
*/
function addLayout() {

	var element = document.getElementById('idStartingWeekNumber');
	element.classList.add('clsWeekNumber');
		
	element = document.getElementById('0_4');
	element.classList.add('clsWeekNumber');

	element = document.getElementById('1_6');
	element.classList.add('clsWeekStart');
	element.classList.add('clsWeekNumber');
	//console.log('408. todo: for each => add classes css');
	for (i = 4; i < 48; i++) {
		cellID = ('1_' + i);  
		document.getElementById(cellID).classList.add('clsDayNames');
	}
	
	addCSSClass('2_4', 'clsDates');

	// no opsmuk:
	document.getElementById('0_0').classList.add('clsNullDataDisplay');
	document.getElementById('1_0').classList.add('clsNullDataDisplay');
	document.getElementById('2_0').classList.add('clsNullDataDisplay');
	document.getElementById('3_0').classList.add('clsNullDataDisplay');

	document.getElementById('0_1').classList.add('clsNullDataDisplay');
	document.getElementById('0_2').classList.add('clsNullDataDisplay');
	document.getElementById('0_3').classList.add('clsNullDataDisplay');
	document.getElementById('0_5').classList.add('clsNullDataDisplay');
	document.getElementById('0_7').classList.add('clsNullDataDisplay');
	document.getElementById('0_8').classList.add('clsNullDataDisplay');
	document.getElementById('0_9').classList.add('clsNullDataDisplay');
	document.getElementById('0_10').classList.add('clsNullDataDisplay');
	document.getElementById('0_11').classList.add('clsNullDataDisplay');
	document.getElementById('0_12').classList.add('clsNullDataDisplay');
	document.getElementById('0_14').classList.add('clsNullDataDisplay');
	document.getElementById('0_15').classList.add('clsNullDataDisplay');
	document.getElementById('0_16').classList.add('clsNullDataDisplay');
	document.getElementById('0_17').classList.add('clsNullDataDisplay');
	document.getElementById('0_18').classList.add('clsNullDataDisplay');
	document.getElementById('0_19').classList.add('clsNullDataDisplay');
	document.getElementById('0_21').classList.add('clsNullDataDisplay');
	document.getElementById('0_22').classList.add('clsNullDataDisplay');
	document.getElementById('0_23').classList.add('clsNullDataDisplay');
	document.getElementById('0_24').classList.add('clsNullDataDisplay');
	document.getElementById('0_25').classList.add('clsNullDataDisplay');
	document.getElementById('0_26').classList.add('clsNullDataDisplay');
	document.getElementById('0_28').classList.add('clsNullDataDisplay');
	document.getElementById('0_29').classList.add('clsNullDataDisplay');
	document.getElementById('0_30').classList.add('clsNullDataDisplay');
	document.getElementById('0_31').classList.add('clsNullDataDisplay');
	document.getElementById('0_32').classList.add('clsNullDataDisplay');
	document.getElementById('0_33').classList.add('clsNullDataDisplay');
	document.getElementById('0_35').classList.add('clsNullDataDisplay');
	document.getElementById('0_36').classList.add('clsNullDataDisplay');
	document.getElementById('0_37').classList.add('clsNullDataDisplay');
	document.getElementById('0_38').classList.add('clsNullDataDisplay');
	document.getElementById('0_39').classList.add('clsNullDataDisplay');
	document.getElementById('0_40').classList.add('clsNullDataDisplay');
	document.getElementById('0_42').classList.add('clsNullDataDisplay');
	document.getElementById('0_43').classList.add('clsNullDataDisplay');
	document.getElementById('0_44').classList.add('clsNullDataDisplay');
	document.getElementById('0_45').classList.add('clsNullDataDisplay');
	document.getElementById('0_46').classList.add('clsNullDataDisplay');
	document.getElementById('0_47').classList.add('clsNullDataDisplay');

	document.getElementById('1_1').classList.add('clsNullDataDisplay');
	document.getElementById('1_2').classList.add('clsNullDataDisplay');
	document.getElementById('1_3').classList.add('clsNullDataDisplay');

	document.getElementById('2_1').classList.add('clsNullDataDisplay');
	document.getElementById('2_2').classList.add('clsNullDataDisplay');
	document.getElementById('2_3').classList.add('clsNullDataDisplay');

	document.getElementById('3_1').classList.add('clsNullDataDisplay');
	document.getElementById('3_2').classList.add('clsNullDataDisplay');
	document.getElementById('3_3').classList.add('clsNullDataDisplay');
	

	document.getElementById('4_1').classList.add('clsNullDataDisplay');
	document.getElementById('4_2').classList.add('clsNullDataDisplay');
	document.getElementById('4_3').classList.add('clsNullDataDisplay');
	document.getElementById('4_4').classList.add('clsNullDataDisplay');


	document.getElementById('5_1').classList.add('clsNullDataDisplay');
	document.getElementById('5_2').classList.add('clsNullDataDisplay');
	document.getElementById('5_3').classList.add('clsNullDataDisplay');
	document.getElementById('5_4').classList.add('clsNullDataDisplay');

	document.getElementById('0_5').classList.add('clsNullDataDisplay');
	document.getElementById('1_5').classList.add('clsNullDataDisplay');
	document.getElementById('2_5').classList.add('clsNullDataDisplay');
	document.getElementById('3_5').classList.add('clsNullDataDisplay');
	document.getElementById('4_5').classList.add('clsNullDataDisplay');
	document.getElementById('5_5').classList.add('clsNullDataDisplay');
	document.getElementById('6_5').classList.add('clsNullDataDisplay');
	document.getElementById('7_5').classList.add('clsNullDataDisplay');
	document.getElementById('8_5').classList.add('clsNullDataDisplay');

	document.getElementById('6_1').classList.add('clsNullDataDisplay');
	document.getElementById('6_2').classList.add('clsNullDataDisplay');
	document.getElementById('6_3').classList.add('clsNullDataDisplay');
	document.getElementById('6_4').classList.add('clsNullDataDisplay');

	document.getElementById('7_1').classList.add('clsNullDataDisplay');
	document.getElementById('7_2').classList.add('clsNullDataDisplay');
	document.getElementById('7_3').classList.add('clsNullDataDisplay');
	document.getElementById('7_4').classList.add('clsNullDataDisplay');

	document.getElementById('8_1').classList.add('clsNullDataDisplay');
	document.getElementById('8_2').classList.add('clsNullDataDisplay');
	document.getElementById('8_3').classList.add('clsNullDataDisplay');
	document.getElementById('8_4').classList.add('clsNullDataDisplay');

	//var rc1, rc2, content;
		
}
