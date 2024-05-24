import { Builder, Browser, By } from "selenium-webdriver";
import assert from "assert";

let driver = new Builder().forBrowser(Browser.CHROME).build();

let total = 5;
let remaining = 5;

await lambdaTest();

async function lambdaTest() {
  try {
    await driver.get("https://lambdatest.github.io/sample-todo-app/");
    await driver.manage().window().maximize();
    await driver.sleep(1000);

    let headerText = await driver.findElement(By.xpath("//h2")).getText();
    assert.equal(headerText, "LambdaTest Sample App");

    for (let i = 1; i <= total; i++) {
      let remainingElement = await driver.findElement(
        By.className("ng-binding")
      );
      let text = await remainingElement.getText();
      let expectedText = `${remaining} of ${total} remaining`;
      assert.equal(text, expectedText);

      let listInputElement = await driver.findElement(By.name(`li${i}`));

      assert.equal(await listInputElement.isSelected(), false);

      await listInputElement.click();
      remaining -= 1;
      await driver.sleep(1000);

      assert.equal(await listInputElement.isSelected(), true);
    }

    await driver
      .findElement(By.xpath("//input[@type='text']"))
      .sendKeys("New Item");

    await driver.findElement(By.id("addbutton")).click();

    let remainingElement = await driver.findElement(By.className("ng-binding"));
    let text = await remainingElement.getText();
    let expectedText = `1 of 6 remaining`;
    assert.equal(text, expectedText);

    let item = await driver.findElement(
      By.xpath("//input[@name='li6']/following-sibling::span")
    );
    let itemText = await item.getText();
    assert.equal(itemText, "New Item");

    let listInputElement = await driver.findElement(By.name(`li6`));

    assert.equal(await listInputElement.isSelected(), false);

    await listInputElement.click();
    await driver.sleep(1000);

    assert.equal(await listInputElement.isSelected(), true);

    remainingElement = await driver.findElement(By.className("ng-binding"));
    text = await remainingElement.getText();
    expectedText = `0 of 6 remaining`;
    assert.equal(text, expectedText);
  } catch (err) {
    driver.takeScreenshot().then(function (image) {
      require("fs").writeFileSync("screenshot_error.png", image, "base64");
    });
    console.error("Тест упал по причине ошибки: %s", err);
  } finally {
    /" закрываем веб-драйвер "/;
    await driver.quit();
  }
}
