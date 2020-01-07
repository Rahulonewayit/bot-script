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
    await driver.wait(until.elementLocated(By.css("div.aXBtI.Wic03c div.Xb9hP input.whsOnd.zHQkBf"))).sendKeys('apps.1wayit@gmail.com');
    await driver.wait(until.elementLocated(By.id("identifierNext"))).click();
    await driver.wait(until.elementLocated(By.css("div.aCsJod.oJeWuf div.aXBtI.I0VJ4d.Wic03c div.Xb9hP input.whsOnd.zHQkBf"))).sendKeys('1Wayit@apple');



    await sleep.sleep(4);

    console.log("login success");

    // await driver.wait(until.elementLocated(By.css("div.dG5hZc div.qhFLie div.U26fgb.O0WRkf.zZhnYe.e3Duub.C0oVfc.FliLIb.DL0QTb.M9Bg4d"))).click();

    // var myDataMeta = await driver.findElement(By.css("div.YSwOac div.Uj2co.rtreXb.r054Wd div.xm01He li:nth-child(2)")).getText();
    await driver.findElement(By.css("header.gb_sa.gb_Za.gb_Pe.gb_Nd.gb_Cc div.gb_Md.gb_3d.gb_Ud.gb_rc div.gb_Rc.gb_Zc.gb_0c div.gb_qc")).click();
    await sleep.sleep(5);
    await driver.findElement(By.css("div.rFrNMe.Ax4B8.PACruf.Lsmgje.zKHdkd div.aCsJod.oJeWuf div.aXBtI.Wic03c div.Xb9hP input.whsOnd.zHQkBf")).click();
    await driver.findElement(By.css("div.iPVm1b.cgo1ib div.utePyc")).click();
    //
    await sleep.sleep(2);
    // var myDataMeta = await driver.findElement(By.css("div.qL2dyd.dzkZrb")).getText();
    //
    // // console.log('hello got it');
    // // console.log(myDataMeta);
    //
    await driver.wait(until.elementLocated(By.css("nav.j2F0y div:nth-child(4) div.sfS3Pd span div:nth-child(2) a.Lhhaec"))).click();
    // // //
    await sleep.sleep(2);
    // // // // console.log('sssssssss');
    // // //
    // await sleep.sleep(5);
    var myDataMeta = await driver.findElement(By.css("span.QZAqyd span.AcJAxb span.UwdJ1c")).getText();
    var myFinalDataMeta = parseInt(myDataMeta[myDataMeta.length -1]);
    for (i = 1; i <= myFinalDataMeta; i++) {
      var myDataMeta = await driver.findElement(By.css("div.CtOYUe.I4chsf.VJARVc.RtPpqe table.i3WFpf tbody tr:nth-child("+i+") td.XgRaPc.AB6Eee.QNcORc.csDJwd.LoCYSb.Bj8DDb.sbEvHd span.zRhise")).getText();
        console.log(myDataMeta);
    }


  } finally {
    // await driver.quit();
  }
})();




module.exports = router;
