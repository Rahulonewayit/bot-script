const express = require('express');
const cheerio = require('cheerio');
const request = require("request");
var sleep = require('sleep');
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


(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    // https://cloud.google.com/identity-platform/docs/resources
    await driver.get('https://search.google.com/search-console/welcome');
    // await driver.wait(until.elementLocated(By.css("a.devsite-user-signin.devsite-top-button.button.gc-analytics-event"))).click();
    await driver.wait(until.elementLocated(By.css("div.aXBtI.Wic03c div.Xb9hP input.whsOnd.zHQkBf"))).sendKeys('apps.1wayit@gmail.com');
    await driver.wait(until.elementLocated(By.id("identifierNext"))).click();
    await driver.wait(until.elementLocated(By.css("div.aXBtI.I0VJ4d.Wic03c div.Xb9hP input.whsOnd.zHQkBf"))).sendKeys('1Wayit@apple');
    await driver.wait(until.elementLocated(By.css("div.U26fgb.O0WRkf.zZhnYe.e3Duub.C0oVfc.FliLIb.DL0QTb.M9Bg4d span.CwaK9 span.RveJvd.snByac"))).click();

    // await sleep.sleep(20);


    // await driver.wait(until.elementLocated(By.css("div.aXBtI.I0VJ4d.Wic03c div.Xb9hP input.whsOnd.zHQkBf"))).sendKeys('1wayit.com');


        // 1Wayit@apple
        // 1wayit.com
        // Admin@786

    await sleep.sleep(60);
    console.log('hello g');
    var myDataMeta = await driver.findElement(By.css("div.qL2dyd.dzkZrb")).getText();

    console.log(myDataMeta);

    // await driver.wait(until.elementLocated(By.css("div.aXBtI.I0VJ4d.Wic03c div.Xb9hP input.whsOnd.zHQkBf"))).sendKeys('Admin@786');



    // let el = await driver.elementLocated(By.css("div.aXBtI.Wic03c div.Xb9hP input.whsOnd.zHQkBf"));
    //
    // await driver.wait(until.elementIsVisible(el),2000);
    // await el.sendKeys('demo1wayit@gmail.com');




    // await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
    // await driver.wait(until.titleIs('webdriver - Google Search'), 1000);

    // await driver.wait(until.elementLocated(By.css("div.aXBtI.I0VJ4d.Wic03c div.Xb9hP input.whsOnd.zHQkBf"))).sendKeys('Admin@786');

  } finally {
    // await driver.quit();
  }
})();

// driver.get('https://cloud.google.com/identity-platform/docs/resources').then(function(){
    // driver.wait(until.elementLocated(By.css("ul.card-showcase li:nth-child(2)"))).click().then(function(){
    //
    // driver.sleep(5000);
    // driver.wait(until.elementLocated(By.css("a.devsite-user-signin.devsite-top-button.button.gc-analytics-event"))).click().then(function(){
    //   driver.wait(until.elementLocated(By.css("div.aXBtI.Wic03c div.Xb9hP input.whsOnd.zHQkBf"))).sendKeys('demo1wayit@gmail.com').then(function(){
    //     driver.wait(until.elementLocated(By.id("identifierNext"))).click().then(function(){
    //         driver.wait(until.elementLocated(By.css("div.aXBtI.I0VJ4d.Wic03c div.Xb9hP input.whsOnd.zHQkBf"))).sendKeys('Admin@786').then(function(){
    //           driver.wait(until.elementLocated(By.id("passwordNext"))).click().then(function(){
    //
    //           }).catch(function(passerr) {
    //               console.log(passerr);
    //           });
    //         }).catch(function(err) {
    //             console.log(err);
    //         });
    //     });
    //   });
    // });
//     driver.wait(until.elementLocated(By.css("ul.card-showcase li:nth-child(2)"))).click().then(function(){
//       sleep.sleep(5)});
//
//         console.log("abc1");
//         sleep.sleep(5);
//         console.log("abc1");
// }).catch(function(e) {
//     console.log(e);
// });

router.get('/', function(req, res, next) {
    // var mystr = "hello my world"; aXBtI I0VJ4d Wic03c
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
