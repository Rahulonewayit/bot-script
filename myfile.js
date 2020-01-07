var http = require('http');
var webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const {Builder, By, Key, until} = require('selenium-webdriver');
var chromePath = require('chromedriver').path;

process.env["PATH"] += "/usr/local/bin/chromedriver";

var options = new chrome.Options();

// chromeCapabilities.set('chromeOptions', chrome_options);

console.log('step 1');

var driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
driver.get("http://www.google.com");



// (async function example() {
// let driver = await new webdriver.Chrome('/usr/local/bin/chromedriver',chrome_options=chrome_options);
//
// console.log('step 2');
// try {
//   await driver.get('https://search.google.com/search-console/welcome');
//   console.log('step 3');
//   // var myCoverageMetaData = await driver.findElement(By.css("div.jXeDnc")).getText();
//   //
//   // console.log('hello '+myCoverageMetaData);
//
//   } finally {
// }
//
// })();
// let service = new chrome.ServiceBuilder('/usr/bin/chromedriver').build();
// //let service = new chrome.ServiceBuilder(chromePath).build();
// chrome.setDefaultService(service);
//
// let driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
//
//
// driver.get('https://search.google.com/search-console/welcome');




// var chromeCapabilities = webdriver.Capabilities.chrome();
//
// var chromeOptions = {
//     //'args': ['--headless', '--disable-gpu', '--disable-dev-shm-usage']
// };
//
// chromeCapabilities.set('chromeOptions', chromeOptions);
// (async function example() {
// let driver = await new webdriver.Builder().withCapabilities(chromeCapabilities).build();
// try {
// console.log("sdfsdf");
// return false;
//
//   //await driver.get('https://search.google.com/search-console/welcome');
//   // console.log(driver);
//   //  var myCoverageMetaData = await driver.findElement(By.css("div.jXeDnc")).getText();
//   //  console.log('hello '+myCoverageMetaData);
//
//   } finally {
// }
//
// })();

// var chrome = require('selenium-webdriver/chrome');
// var path = require('chromedriver').path;
//
//
// console.log(path);
//
//
// var service = new chrome.ServiceBuilder(path).build();
// chrome.setDefaultService(service);
//
//
// var driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
// driver.get('https://search.google.com/search-console/welcome');
//
//
//
//
