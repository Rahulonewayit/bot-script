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

async function insertError(my_val)
{
    var resData = await SeleniumRecord.findOne({error_value: my_val.error_value}).exec();
      if(resData)
      {
            var myInputData = {
              error_value : my_val.error_value,
              getCardsOnList : resData.getCardsOnList,
              addChecklistToCard : resData.addChecklistToCard
            }
            await getaddTrelloError(myInputData,my_val.error_sub_value);
            return myInputData;
      }else{
            await insertTrelloError(my_val,my_val.error_sub_value)
          return 'save';
      }
}

async function saveDataInDb(myInputData)
{
    const user = new SeleniumRecord({
                  _id: new mongoose.Types.ObjectId(),
                    error_value : myInputData.error_value,
                    getCardsOnList : myInputData.getCardsOnList,
                    addChecklistToCard : myInputData.addChecklistToCard
                  });
    await user.save();
    return true;
}

async function insertTrelloError(input,error_sub_value)
{
  console.log('save data input');
  await trello.addCard(input.error_value, 'google console', input.getCardsOnList).then((cards) => {
              saveDataInDb({error_value:input.error_value,getCardsOnList:input.getCardsOnList,addChecklistToCard:cards.id});
              trello.addChecklistToCard(cards.id,error_sub_value);
      });
}

async function getaddTrelloError(input,error_sub_value)
{
  console.log('my val '+error_sub_value);
  await trello.getCardsOnList(input.getCardsOnList).then((cards) => {
      trello.addChecklistToCard(input.addChecklistToCard,error_sub_value);
  });
}



router.get('/', function(req, res, next) {
    res.json('my index page');
});


(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {

    await driver.get('https://search.google.com/search-console/welcome');
    await driver.wait(until.elementLocated(By.css("div.aXBtI.Wic03c div.Xb9hP input.whsOnd.zHQkBf"))).sendKeys('apps.1wayit@gmail.com');
    await driver.wait(until.elementLocated(By.id("identifierNext"))).click();
    await driver.wait(until.elementLocated(By.css("div.aCsJod.oJeWuf div.aXBtI.I0VJ4d.Wic03c div.Xb9hP input.whsOnd.zHQkBf"))).sendKeys('1Wayit@apple');



    await sleep.sleep(5);

    console.log("login success");

    await driver.findElement(By.css("header.gb_sa.gb_Za.gb_Pe.gb_Nd.gb_Cc div.gb_Md.gb_3d.gb_Ud.gb_rc div.gb_Rc.gb_Zc.gb_0c div.gb_qc")).click();
    await sleep.sleep(2);
    await driver.findElement(By.css("div.rFrNMe.Ax4B8.PACruf.Lsmgje.zKHdkd div.aCsJod.oJeWuf div.aXBtI.Wic03c div.Xb9hP input.whsOnd.zHQkBf")).click();




    await driver.findElements(By.css("div.s3ARzb.eejsDc.ddc5Hb div.MkjOTb.oKubKe.zpVKtf")).then(elements => {

      // console.log(elements.length);

      const forLoop = async _ => {
        for (i = 1; i <= elements.length; i++) {

          // console.log(i);
          await sleep.sleep(2);
          await driver.findElement(By.css("div.rFrNMe.Ax4B8.PACruf.Lsmgje.zKHdkd div.aCsJod.oJeWuf div.aXBtI.Wic03c div.Xb9hP input.whsOnd.zHQkBf")).click();
          var company_name = await driver.findElement(By.css("div.tWfTvb div.u3WVdc.jBmls div.s3ARzb.eejsDc.ddc5Hb div:nth-child("+i+") div div.iPVm1b.cgo1ib div.utePyc")).getText();
          company_name = company_name.replace('Domain property', '');

          await driver.findElement(By.css("div.tWfTvb div.u3WVdc.jBmls div.s3ARzb.eejsDc.ddc5Hb div:nth-child("+i+") div.iPVm1b.cgo1ib div.utePyc")).click();

          await sleep.sleep(2);


          await driver.wait(until.elementLocated(By.css("div.sfS3Pd div.cp8g2d a.Lhhaec"))).click();
          await sleep.sleep(2);
          var myCoverageMetaData = await driver.findElement(By.css("div.CtOYUe.I4chsf.VJARVc.RtPpqe table.i3WFpf tbody tr:nth-child(2) td.XgRaPc.AB6Eee.QNcORc.csDJwd.LoCYSb.Bj8DDb.sbEvHd span.zRhise span")).getText();
          // insertError(myCoverageMetaData);

          await insertError({error_value: company_name+' Coverage',error_sub_value: myCoverageMetaData ,getCardsOnList: '5a181330dd40811fb5cdbda5'});

          // console.log('company_name '+company_name);

          await driver.wait(until.elementLocated(By.css("nav.j2F0y div:nth-child(4) div.sfS3Pd span div:nth-child(2) a.Lhhaec"))).click();
          await driver.navigate().refresh();
          await sleep.sleep(2);
          var myDataMeta = await driver.findElement(By.css("div.VgjuZe div.utnMJd span.QZAqyd span.AcJAxb span.UwdJ1c")).getText();

          if(parseInt(myDataMeta[myDataMeta.length -1]))
          {
            for (j = 1; j <= parseInt(myDataMeta[myDataMeta.length -1]); j++) {
                var myDataMetaMobile = await driver.findElement(By.css("div.CtOYUe.I4chsf.VJARVc.RtPpqe table.i3WFpf tbody tr:nth-child("+j+") td.XgRaPc.AB6Eee.QNcORc.csDJwd.LoCYSb.Bj8DDb.sbEvHd span.zRhise")).getText();
                await insertError({error_value: company_name+' Mobile Usability',error_sub_value: myDataMetaMobile ,getCardsOnList: '5a181330dd40811fb5cdbda5'});
                // console.log(myDataMetaMobile);
              }

          }



        }

      }
      forLoop();
    });
  } finally {
  }
})();




module.exports = router;