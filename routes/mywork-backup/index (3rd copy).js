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


// 1Wayit@apple
// 1wayit.com
// Admin@786


(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('https://cloud.google.com/compute/docs/apis');
    // await driver.wait(until.elementLocated(By.css("a.devsite-user-signin.devsite-top-button.button.gc-analytics-event"))).click();

    //
    // var links = await driver.findElement(By.css("div.c12 div.card ul.card-showcase li:nth-child(2)")).getText();
    // var myuser = await driver.findElement(By.css("div.c12 div.card ul.card-showcase li:nth-child(2) a.no-logo h3")).getText();


    // for (i = 1; i < 7; i++) {

      driver.findElements(By.css("div.c12 div.card ul.card-showcase li")).then(elements => console.log(elements.length));

  //     console.log(myuser);
  // }

      // console.log(myuser);


      // for(var i=0; i<elem.length; i++){
      //     console.log(driver.findElements(By.css("h")).get(i).getText());
      // }



      // inputs.forEach(function (input) {
      //     // input.sendKeys(password)
      //     console.log(input.getText());
      // })
    // })

    // .getText();

    // h3.hide-from-toc

    // var result = linksssssss('li').html();


    // console.log(linksssssss);

    // for(let link of links) {
    //     text = await link.getText();
    //     console.log(text);
    // }

     // return driver.quit();

  //   then(function(elements){
  //   elements.forEach(function (element) {
  //         element.getText().then(function(text){
  //             console.log(text);
  //         });
  //     });
  // });

 //    .getAttribute('li').then(function(classes){
 //    console.log(classes);
 // });

    // console.log(myDataMeta);
    // await driver.wait(until.elementLocated(By.css("div.aXBtI.Wic03c div.Xb9hP input.whsOnd.zHQkBf"))).sendKeys('apps.1wayit@gmail.com');
    // await driver.wait(until.elementLocated(By.id("identifierNext"))).click();
    // await sleep.sleep(30);
    // var myDataMeta = await driver.findElement(By.css("div.qL2dyd.dzkZrb")).getText();
    // console.log('hello got it');
    // console.log(myDataMeta);
    // await driver.wait(until.elementLocated(By.css("div.sfS3Pd div.cp8g2d a.Lhhaec"))).click();
    // await sleep.sleep(5);
    // var myDataMeta = await driver.findElement(By.css("div.CtOYUe.I4chsf.VJARVc.RtPpqe table.i3WFpf tbody tr.nJ0sOc.wNFy3d.wPS5Pc td.XgRaPc.AB6Eee.QNcORc.csDJwd.LoCYSb.Bj8DDb.sbEvHd span.zRhise")).getText();
    // console.log(myDataMeta);




  } finally {
    // await driver.quit();
  }
})();




module.exports = router;
