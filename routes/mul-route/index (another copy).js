const express = require('express');
const cheerio = require('cheerio');
const request = require("request");
const GoogleSpreadsheet = require('google-spreadsheet');
const async = require('async');
const webdriver = require('selenium-webdriver');
const {Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const ip = require('ip');
const trelloNode = require('trello-node-api')('28df62567338bd5ede6bc84fa6ef59a9', '98119a05870d300a5d5463fd777eb526fff0267c899c7b22dfe669f53b6e0d36');
const publicIp = require('public-ip');
var Trello = require("trello");
var trello = new Trello("28df62567338bd5ede6bc84fa6ef59a9", "98119a05870d300a5d5463fd777eb526fff0267c899c7b22dfe669f53b6e0d36");
const router = express.Router();


let driver = new webdriver.Builder().forBrowser('chrome').build();
driver.get('https://cloud.google.com/identity-platform/docs/resources').then(function(){
    // driver.wait(until.elementLocated(By.css("ul.card-showcase li:nth-child(2)"))).click().then(function(){
    driver.wait(until.elementLocated(By.css("a.devsite-user-signin"))).click().then(function(){
      driver.wait(until.elementLocated(By.name("identifier"))).sendKeys('demo1wayit@gmail.com').then(function(){
      // driver.wait(until.elementLocated(By.id("identifierId"))).sendKeys('demo1wayit@gmail.com').then(function(){
        driver.wait(until.elementLocated(By.id("identifierNext"))).click().then(function(){
          driver.wait(until.elementLocated(By.name("password"))).sendKeys('demo1wayit@gmail.com').then(function(){
            // driver.wait(until.elementLocated(By.id("passwordNext"))).click().then(function(){
    // driver.findElement(By.css("h2[id='account_creation_and_deletion_limits']")).getText().then((creation_and_deletion) => {
            // trello.addCard(creation_and_deletion, 'google console', '5a181330dd40811fb5cdbda5', function (error, trelloCard) {
            //         if (error) {
            //             console.log('Could not add card:', error);
            //         }
            //         else {
            //             console.log('Added card:', trelloCard);
            //         }
            //     });
              // });
            }).catch(function(err) {
              console.log(err);
          });
        });
      });
    });
}).catch(function(e) {
    console.log(e);
});

router.get('/', function(req, res, next) {
    // var mystr = "hello my world";
    // var array = mystr.split(" ");
    // res.json(array);
});

//
// router.get('/', function(req, res, next) {
//   request({uri: "https://ebookbazaar.com/book/sangeet-de-maulik-taat-sunita-rani",}, function(error, response, body) {
//     const $ = cheerio.load(body);
//     var result = $('#imm_info h1').html();
//     res.send(result);
//   });
// });


// router.get('/testing', function(req, res, next) {
//   (async () => {
//       var myPublicIp = ip.address();
//       res.send('public = '+await publicIp.v4()+' private = '+myPublicIp);
//       res.send('public = '+await publicIp.v6()+' private = '+myPublicIp);
//   })();
// });





























// var creds = require('./client_secret.json');

var creds = {
  client_email: 'apps.1wayit@gmail.com',
  private_key: 'AIzaSyD3Roh2uL-OgdjB-ov7bI_hXSaf92QNZio'
}

var doc = new GoogleSpreadsheet('1Km5DWlXgJ0qYnmpur9BOjHM03kJdbamoZfswK9L5fGA');
var sheet;

router.get('/google-sheet', function(req, res, next) {

  doc.useServiceAccountAuth(creds, function (err) {
    // Get all of the rows from the spreadsheet.
    doc.getRows(1, function (err, rows) {
      res.status(200).json(rows);
    });
  });

});










module.exports = router;
