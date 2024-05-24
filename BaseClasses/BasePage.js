import { Browser, Builder } from "selenium-webdriver";
import { writeFileSync } from "fs";
class BasePage {
  constructor() {
    this.driver = new Builder().forBrowser(Browser.CHROME).build();
  }

  async open(url) {
    await this.driver.get(url);
  }

  async maximize() {
    await this.driver.manage().window().maximize();
  }

  async clickElement(locator) {
    await this.driver.findElement(locator).click();
  }

  async sendKeys(locator, text) {
    await this.driver.findElement(locator).sendKeys(text);
  }

  async getText(locator) {
    return await this.driver.findElement(locator).getText();
  }

  async sleep(time) {
    await this.driver.sleep(time);
  }

  async takeScreenshot(filename) {
    const image = await this.driver.takeScreenshot();
    writeFileSync(filename, image, "base64");
  }

  async quit() {
    await this.driver.quit();
  }
}

export default BasePage;
