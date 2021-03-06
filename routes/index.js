const express = require('express');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const request = require("request");
const GoogleSpreadsheet = require('google-spreadsheet');
const async = require('async');
const path = require('path');
var appRoot = require('app-root-path');
var myConfiGration = require(appRoot.path+"/config.json");
const webdriver = require('selenium-webdriver');
const { ServiceBuilder } = require('selenium-webdriver/chrome');
const {Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const ip = require('ip');
const publicIp = require('public-ip');
var Trello = require("trello");

var trello = new Trello(myConfiGration.apiKey,myConfiGration.oauthToken);
const router = express.Router();

var chromePath = require('chromedriver').path;

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



function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async function example() {
  let driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
  driver.manage().window().maximize();
  await driver.get('https://search.google.com/search-console/welcome');

  // driver.manage().window().setRect({width: 800, height: 800});
  // driver.manage().window().setSize(500, 500);
  try {

    await driver.get('https://search.google.com/search-console/welcome');

    await sleep(45000); // 5 seconds

    console.log("login success");


    try{
        await driver.findElement(By.css("header div:nth-child(2) div:nth-child(1) div:nth-child(1)")).click();
      }catch(e){
        console.log('Boot has been scraping google console successfully');
      }

    await sleep(2000);

    try{
        await driver.findElement(By.css("div.rFrNMe.Ax4B8.PACruf.Lsmgje.zKHdkd div.aCsJod.oJeWuf div.aXBtI.Wic03c div.Xb9hP input.whsOnd.zHQkBf")).click();
    }catch(e){
        console.log('Boot has been scraping google console successfully');
    }
    try{
      await driver.findElements(By.css("div.s3ARzb.eejsDc.ddc5Hb div.MkjOTb.oKubKe.zpVKtf")).then(elements => {
      const forLoop = async _ => {
        for (i = 1; i <= elements.length; i++) {

          await sleep(2000);
          try{
            await driver.findElement(By.css("div.rFrNMe.Ax4B8.PACruf.Lsmgje.zKHdkd div.aCsJod.oJeWuf div.aXBtI.Wic03c div.Xb9hP input.whsOnd.zHQkBf")).click();
          }catch(e){
              console.log('Boot has been scraping google console successfully');
          }
          var company_name = await driver.findElement(By.css("div.tWfTvb div.u3WVdc.jBmls div.s3ARzb.eejsDc.ddc5Hb div:nth-child("+i+") div div.iPVm1b.cgo1ib div.utePyc")).getText();
          company_name = company_name.replace('Domain property', '');

          await driver.findElement(By.css("div.tWfTvb div.u3WVdc.jBmls div.s3ARzb.eejsDc.ddc5Hb div:nth-child("+i+") div.iPVm1b.cgo1ib div.utePyc")).click();

          await sleep(2000);


          await driver.wait(until.elementLocated(By.css("div.sfS3Pd div.cp8g2d a.Lhhaec"))).click();
          await sleep(2000);
          await driver.navigate().refresh();
          var countmyCoverageMetaData = await driver.findElement(By.css("span.UwdJ1c")).getText();

          // console.log('hello '+parseInt(countmyCoverageMetaData[countmyCoverageMetaData.length -1]));

          await sleep(1000);
          await driver.navigate().refresh();

          if(i == 1)
          {
            var myCoverageMetaData = await driver.findElement(By.css("div.CtOYUe.I4chsf.VJARVc.RtPpqe table.i3WFpf tbody tr:nth-child(2) td.XgRaPc.AB6Eee.QNcORc.csDJwd.LoCYSb.Bj8DDb.sbEvHd span.zRhise span")).getText();
            await insertError({error_value: company_name+' Coverage',error_sub_value: myCoverageMetaData ,getCardsOnList: myConfiGration.card_id});
          }else {
            if(parseInt(countmyCoverageMetaData[countmyCoverageMetaData.length -1])) {
              for (cj = 1; cj <= parseInt(countmyCoverageMetaData[countmyCoverageMetaData.length -1]); cj++) {
                var myCoverageMetaData = await driver.findElement(By.css("div.CtOYUe.I4chsf.VJARVc.RtPpqe table.i3WFpf tbody tr:nth-child("+cj+") td.XgRaPc.AB6Eee.QNcORc.csDJwd.LoCYSb.Bj8DDb.sbEvHd span.zRhise span")).getText();
                await insertError({error_value: company_name+' Coverage',error_sub_value: myCoverageMetaData ,getCardsOnList: myConfiGration.card_id});
              }
            }
        }

          await sleep(1000);
          await driver.wait(until.elementLocated(By.css("div.sfS3Pd div:nth-child(2) a.Lhhaec"))).click();
          await driver.navigate().refresh();

          await driver.findElement(By.css("table.i3WFpf tbody tr td:nth-child(5) span span.Ncxbed")).then(async function(siteMapElement){
              var sitemapVal = await driver.findElement(By.css("table.i3WFpf tbody tr td:nth-child(1) span")).getText();
              await insertError({error_value: company_name+' Sitemaps',error_sub_value: sitemapVal ,getCardsOnList: myConfiGration.card_id});
          },function(err){
              console.log('Sitemap Element not found');
          });


          await driver.wait(until.elementLocated(By.css("nav.j2F0y div:nth-child(4) div.sfS3Pd span div:nth-child(2) a.Lhhaec"))).click();
          await driver.navigate().refresh();
          await sleep(2000);
          var myDataMeta = await driver.findElement(By.css("div.VgjuZe div.utnMJd span.QZAqyd span.AcJAxb span.UwdJ1c")).getText();

          if(parseInt(myDataMeta[myDataMeta.length -1]))
          {
            for (j = 1; j <= parseInt(myDataMeta[myDataMeta.length -1]); j++) {
                var myDataMetaMobile = await driver.findElement(By.css("div.CtOYUe.I4chsf.VJARVc.RtPpqe table.i3WFpf tbody tr:nth-child("+j+") td.XgRaPc.AB6Eee.QNcORc.csDJwd.LoCYSb.Bj8DDb.sbEvHd span.zRhise")).getText();
                await insertError({error_value: company_name+' Mobile Usability',error_sub_value: myDataMetaMobile ,getCardsOnList: myConfiGration.card_id});
              }
          }

        }
      }
      forLoop();
    });
  }catch(e){
      console.log('Boot has been scraping google console successfully');
  }
  } finally {

  }
})();




module.exports = router;
