import BasePage from "../../BaseClasses/BasePage.js";
import { By, Key } from "selenium-webdriver";

class PolytechPage extends BasePage {
  async openHomePage() {
    await super.open("https://mospolytech.ru/");
  }

  async shutdown() {
    await super.quit();
  }

  async openSchedulesPageFromHomePage() {
    await this.clickElement(
      By.xpath(
        '//ul[@class="user-nav__list"]//a[@href="/obuchauschimsya/raspisaniya/"]'
      )
    );
    await this.driver.sleep(1500);
  }

  async openSchedulesViewer() {
    this.primaryWindow = await this.driver.getWindowHandle();
    await this.clickElement(By.xpath('//a[@href="https://rasp.dmami.ru/"]'));
    await this.driver.sleep(3000);
  }

  async enterGroupNumber() {
    const windows = await this.driver.getAllWindowHandles();
    for (const handle of windows) {
      if (handle !== this.primaryWindow) {
        await this.driver.switchTo().window(handle);
      }
    }

    await this.sendKeys(By.xpath('//input[@class="groups"]'), "221-321");
    await this.driver
      .findElement(By.xpath('//input[@class="groups"]'))
      .sendKeys(Key.ENTER);
    await this.driver.sleep(3000);
  }

  async checkIfGroupExists() {
    const groupExists = !!(await this.driver.findElement(
      By.xpath('//div[@id="221-321"]')
    ));
    return groupExists;
  }

  async selectSchedule() {
    await this.clickElement(By.xpath('//div[@id="221-321"]'));
    await this.driver.sleep(1000);
  }

  async checkIfCurrentDayIsHighlighted() {
    const todayIndex = new Date().getDay();
    return (
      await this.driver
        .findElement(
          By.xpath(
            `//div[@class="schedule-week"]/child::div[position()=${todayIndex}]`
          )
        )
        .getAttribute("class")
    ).includes("schedule-day_today");
  }
}

export default PolytechPage;
