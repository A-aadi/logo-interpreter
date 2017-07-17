
var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome');


var By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .withCapabilities(webdriver.Capabilities.chrome())
    .build();


driver.get("http://localhost:4000");


driver.findElement(By.id("step-code")).sendKeys("fd 100");
driver.findElement(By.id("run-code")).click();



driver.wait(until.elementLocated(By.id('sb-link-extras')), 5000);
driver.findElement(By.id('sb-link-extras')).click();

driver.wait(until.elementLocated(By.id('screenshot')), 5000);
driver.findElement(By.id('screenshot')).click();