const express = require('express');
const cheerio = require('cheerio');
const request = require("request");
const GoogleSpreadsheet = require('google-spreadsheet');
const async = require('async');
const router = express.Router();


router.get('/', function(req, res, next) {
  request({uri: "https://ebookbazaar.com/book/sangeet-de-maulik-taat-sunita-rani",}, function(error, response, body) {
    const $ = cheerio.load(body);
    // var result = $('h2.title').html();
    // const bodyReqWW = '<h2 class="title"><div>Hello world</div></h2>';
    var result = $('#imm_info h1').html();
    res.send(result);
  });
});



var doc = new GoogleSpreadsheet('1Km5DWlXgJ0qYnmpur9BOjHM03kJdbamoZfswK9L5fGA');
var sheet;

router.get('/google-sheet', function(req, res, next) {
    // res.json('hello my wolrd');

    async.series([
  function setAuth(step) {
    // see notes below for authentication instructions!
    // var creds = require('./google-generated-creds.json');
    // OR, if you cannot save the file locally (like on heroku)
    var creds = {
      client_email: 'demo1wayit@gmail.com',
      private_key: 'AIzaSyDdBITrHN4MRiZ_CXil8x2Q_crpOsIoFvM'
    }

    doc.useServiceAccountAuth(creds, step);
  },
  function getInfoAndWorksheets(step) {
    doc.getInfo(function(err, info) {
      console.log('Loaded doc: '+info.title+' by '+info.author.email);
      sheet = info.worksheets[0];
      console.log('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
      step();
    });
  },
  function workingWithRows(step) {
    // google provides some query options
    sheet.getRows({
      offset: 1,
      limit: 20,
      orderby: 'col2'
    }, function( err, rows ){
      console.log('Read '+rows.length+' rows');

      // the row is an object with keys set by the column headers
      rows[0].colname = 'new val';
      rows[0].save(); // this is async

      // deleting a row
      rows[0].del();  // this is async

      step();
    });
  },
  function workingWithCells(step) {
    sheet.getCells({
      'min-row': 1,
      'max-row': 5,
      'return-empty': true
    }, function(err, cells) {
      var cell = cells[0];
      console.log('Cell R'+cell.row+'C'+cell.col+' = '+cell.value);

      // cells have a value, numericValue, and formula
      cell.value == '1'
      cell.numericValue == 1;
      cell.formula == '=ROW()';

      // updating `value` is "smart" and generally handles things for you
      cell.value = 123;
      cell.value = '=A1+B2'
      cell.save(); //async

      // bulk updates make it easy to update many cells at once
      cells[0].value = 1;
      cells[1].value = 2;
      cells[2].formula = '=A1+B1';
      sheet.bulkUpdateCells(cells); //async

      step();
    });
  },
  function managingSheets(step) {
    doc.addWorksheet({
      title: 'my new sheet'
    }, function(err, sheet) {

      // change a sheet's title
      sheet.setTitle('new title'); //async

      //resize a sheet
      sheet.resize({rowCount: 50, colCount: 20}); //async

      sheet.setHeaderRow(['name', 'age', 'phone']); //async

      // removing a worksheet
      sheet.del(); //async

      step();
    });
  }
], function(err){
    if( err ) {
      console.log('Error: '+err);
    }
});


























});

module.exports = router;