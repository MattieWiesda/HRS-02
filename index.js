// hrs_express
// HRS-01 Github / Private repository / Creative Commons NC
// https://github.com/readme/guides/open-source-licensing


const appExpress = require('express');
const appHRS = appExpress();            // : bring in the paths module:
const path = require('path'); // and after we're gonna load an html file
//const employees = require('/Employees');
const PORT = process.env.PORT || 5000;

appHRS.use(appExpress.static(path.join(__dirname, 'public')));

// create your endpoint/route handlers:
//the request and response objects are very important:
// http request properties: like url parameters,s query strings, any data that is send within the body
// or wlithin the http headers, all that stuff is included in the request
// the response object represents the http response , it's up to you to send back JSON data , or do 
// you want to render a template , or create a res redirect, you can do multiple things with this object. 
// we can parse incoming data with the Body parser that is included with Express

// ADDING A ROUTER: (we make it an arrow function, which means we're not gonna use the word function
// instead of function we use arrow => ja ja
appHRS.get('/', function (req, res) {
    //res.send('<h1>Hellos HRS Exprws</h1>');
    res.sendFile(path.join(__dirname, 'public', 'hrscheduler.html'));
});

/* and because we use only 1 expression?? , rs.json(employees), we can leave out the curyly bdraces: see below: 
appHRS.get('/api/employees', (req, res) => {
    res.json(employees);
});*/

appHRS.get('/api/employees', (req, res) => res.json(employees));

appHRS.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
