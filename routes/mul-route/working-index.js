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
    await driver.get('https://search.google.com/search-console/welcome');
    // await driver.wait(until.elementLocated(By.css("a.devsite-user-signin.devsite-top-button.button.gc-analytics-event"))).click();
    await driver.wait(until.elementLocated(By.css("div.aXBtI.Wic03c div.Xb9hP input.whsOnd.zHQkBf"))).sendKeys('apps.1wayit@gmail.com');
    //
    await driver.wait(until.elementLocated(By.id("identifierNext"))).click();

    await sleep.sleep(50);

    var myDataMeta = await driver.findElement(By.css("div.qL2dyd.dzkZrb")).getText();
    console.log('hello got it');
    console.log(myDataMeta);

    await driver.wait(until.elementLocated(By.css("div.sfS3Pd div.cp8g2d a.Lhhaec"))).click();

    // await driver.wait(until.elementLocated(By.css("div.sfS3Pd div.cp8g2d a.Lhhaec"))).click();
    // await driver.wait(until.elementLocated(By.css("div.yIS0Lc div.V3oFR div.nnLLaf"))).click();

    console.log('click on warning');
    await sleep.sleep(5);

    var myDataMeta = await driver.findElement(By.css("div.CtOYUe.I4chsf.VJARVc.RtPpqe table.i3WFpf tbody tr.nJ0sOc.wNFy3d.wPS5Pc td.XgRaPc.AB6Eee.QNcORc.csDJwd.LoCYSb.Bj8DDb.sbEvHd span.zRhise")).getText();

    console.log(myDataMeta);




  } finally {
    // await driver.quit();
  }
})();




module.exports = router;
