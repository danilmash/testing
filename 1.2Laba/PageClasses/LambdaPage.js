import BasePage from "../../BaseClasses/BasePage.js";
import { By } from "selenium-webdriver";
class LambdaPage extends BasePage {
  constructor() {
    super();
    this.url = "https://lambdatest.github.io/sample-todo-app/";
    this.remainingText = By.className("ng-binding");
    this.inputField = By.xpath("//input[@type='text']");
    this.addButton = By.id("addbutton");
    this.header = By.xpath("//h2");
  }

  async open() {
    await super.open(this.url);
    super.sleep(1000);
  }

  async item(index) {
    return 1;
  }

  async checkRemainingText(expected) {
    let text = await super.getText(this.remainingText);
    return text == expected;
  }

  async toggleItem(index) {
    let listInputElement = By.name(`li${index}`);
    await super.clickElement(listInputElement);
    await super.sleep(1000);
    return await this.driver.findElement(listInputElement).isSelected();
  }

  async addNewItem(text) {
    await super.sendKeys(this.inputField, text);
    await super.clickElement(this.addButton);
    await super.sleep(1000);
  }
}

export default LambdaPage;
