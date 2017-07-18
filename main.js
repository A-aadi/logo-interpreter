var fs = require("fs");
var async = require("asyncawait/async");
var await = require("asyncawait/await");

var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome');

var By = webdriver.By,
    until = webdriver.until;

var opts = new chrome.Options();
const outputDir = "./" + process.argv[3]+"/"
opts.setUserPreferences({"download.default_directory": outputDir});

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .setChromeOptions(opts)
    .withCapabilities(webdriver.Capabilities.chrome())
    .build();

driver.get("http://localhost:4000");

const interprete = () => {
  const inputFileNames = getInputFileList();
  inputFileNames.forEach((fileName) => {
      const code = fs.readFileSync(fileName, 'utf-8');
      getImageAndScreenShot(code, fileName);
  });
};

const getInputFileList = () => fs.readFileSync(process.argv[2], 'utf-8').split('\n');


function writeScreenshot(data, name) {
    name = name || 'default.png';
    fs.writeFileSync(outputDir + name, data, 'base64');
};

const getImageAndScreenShot = (code, inputFileName) => {

    driver.findElement(By.id("step-code")).sendKeys(code);
    driver.findElement(By.id("run-code")).click();

    driver.wait(until.elementLocated(By.id('sb-link-extras')), 1000);
    driver.findElement(By.id('sb-link-extras')).click();

    driver.wait(until.elementLocated(By.id('screenshot')), 1000);
    driver.findElement(By.id('screenshot')).click();

    driver.takeScreenshot().then(function(data) {
        writeScreenshot(data, inputFileName.split(".")[0] + '_screenshot.png');
    });
};

interprete();

driver.quit();
