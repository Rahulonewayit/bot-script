const express = require('express');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
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

const SeleniumRecord = require('../modules/selenium');


function trello_function(cardName,checkList)
{
    // let loopArr = new Array();
    var cardsPromise = trello.addCard(cardName, 'google console', '5a181330dd40811fb5cdbda5');
    cardsPromise.then((cards) => {
        for(var i =0; i< checkList.length; i++)
            trello.addChecklistToCard(cards.id,checkList[i]);

        return cards.id;
    });
}


async function insertError(cardName,my_val)
{

  // var count_myError = await SeleniumRecord.find({error_value: my_val}).exec();
  //   if(count_myError.length >= 1)
  //   {
  //         return 'error exists';
  //   }else{

      trello_function(cardName,my_val);
    //   const user = new SeleniumRecord({
    //                 _id: new mongoose.Types.ObjectId(),
    //                   error_value : my_val
    //                 });
    //   user.save();
    //     return 'user insert successfully';
    // }

}


router.get('/', function(req, res, next) {
    res.json('my index page');
});


(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {

    var company_name = '1wayit.com';

    await driver.get('https://search.google.com/search-console/welcome');
    await driver.wait(until.elementLocated(By.css("div.aXBtI.Wic03c div.Xb9hP input.whsOnd.zHQkBf"))).sendKeys('apps.1wayit@gmail.com');
    await driver.wait(until.elementLocated(By.id("identifierNext"))).click();
    await driver.wait(until.elementLocated(By.css("div.aCsJod.oJeWuf div.aXBtI.I0VJ4d.Wic03c div.Xb9hP input.whsOnd.zHQkBf"))).sendKeys('1Wayit@apple');



    await sleep.sleep(4);

    console.log("login success");

    await driver.findElement(By.css("header.gb_sa.gb_Za.gb_Pe.gb_Nd.gb_Cc div.gb_Md.gb_3d.gb_Ud.gb_rc div.gb_Rc.gb_Zc.gb_0c div.gb_qc")).click();
    await sleep.sleep(2);
    await driver.findElement(By.css("div.rFrNMe.Ax4B8.PACruf.Lsmgje.zKHdkd div.aCsJod.oJeWuf div.aXBtI.Wic03c div.Xb9hP input.whsOnd.zHQkBf")).click();
    await driver.findElement(By.css("div.iPVm1b.cgo1ib div.utePyc")).click();

    await sleep.sleep(2);


    await driver.wait(until.elementLocated(By.css("div.sfS3Pd div.cp8g2d a.Lhhaec"))).click();
    await sleep.sleep(2);
    var myCoverageMetaData = new Array();
    myCoverageMetaData[0] = await driver.findElement(By.css("div.CtOYUe.I4chsf.VJARVc.RtPpqe table.i3WFpf tbody tr:nth-child(2) td.XgRaPc.AB6Eee.QNcORc.csDJwd.LoCYSb.Bj8DDb.sbEvHd span.zRhise span")).getText();

    // insertError(company_name+' Coverage',myCoverageMetaData);




    await driver.wait(until.elementLocated(By.css("nav.j2F0y div:nth-child(4) div.sfS3Pd span div:nth-child(2) a.Lhhaec"))).click();
    await driver.navigate().refresh();
    await sleep.sleep(2);
    var myDataMeta = await driver.findElement(By.css("div.VgjuZe div.utnMJd span.QZAqyd span.AcJAxb span.UwdJ1c")).getText();

    var myFinalDataMeta = parseInt(myDataMeta[myDataMeta.length -1]);
    let loopArr_myFinalDataMeta_mobile_usability = new Array();

    for (i = 1; i <= myFinalDataMeta; i++) {
      loopArr_myFinalDataMeta_mobile_usability[i] = await driver.findElement(By.css("div.CtOYUe.I4chsf.VJARVc.RtPpqe table.i3WFpf tbody tr:nth-child("+i+") td.XgRaPc.AB6Eee.QNcORc.csDJwd.LoCYSb.Bj8DDb.sbEvHd span.zRhise")).getText();

    }
    // insertError(company_name+' mobile usability',loopArr_myFinalDataMeta_mobile_usability);
  } finally {
  }
})();




module.exports = router;
