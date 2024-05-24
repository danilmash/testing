import LambdaPage from "../PageClasses/LambdaPage.js";
import { describe, before, after, it } from "mocha";
import { assert } from "chai";
import { By } from "selenium-webdriver";

const handleErrors = (action, handler) => {
  return async () => {
    try {
      await action();
    } catch (error) {
      console.error(error);
      if (handler) {
        await handler();
      }
    }
  };
};

describe("LambdaTest", function () {
  let total = 5;
  let remaining = 5;
  let page;

  before(async function () {
    this.timeout(20000);
    page = new LambdaPage();
    await page.open();
  });

  after(async function () {
    await page.quit();
  });

  it(
    "Check the header",
    handleErrors(
      async function () {
        let headerText = await page.getText(page.header);
        assert.equal(headerText, "LambdaTest Sample App");
      },
      async function () {
        await page.takeScreenshot("error");
      }
    )
  );

  it(
    "Validates remaining tasks",
    handleErrors(
      async function () {
        for (let i = 1; i <= total; i++) {
          let text = await page.getText(page.remainingText);
          let expectedText = `${remaining} of ${total} remaining`;
          assert.equal(text, expectedText);

          let isSelected = await page.toggleItem(i);
          assert.isTrue(isSelected);

          remaining -= 1;
        }
      },
      async function () {
        await page.takeScreenshot("error");
      }
    )
  ).timeout(15000);

  it(
    "Adds and validates a new item",
    handleErrors(async function () {
      await page.addNewItem("New Item");
      remaining++;
      total++;
      let expectedText = `${remaining} of ${total} remaining`;
      assert.isTrue(
        await page.checkRemainingText(expectedText),
        "Remaining tasks mismatch expected value"
      );
      let itemText = await page.getText(
        By.xpath(`//input[@name='li6']/following-sibling::span`)
      );
      assert.equal(itemText, "New Item");

      let isSelected = await page.toggleItem(6);
      assert.isTrue(isSelected);
      remaining--;

      expectedText = `${remaining} of ${total} remaining`;
      assert.isTrue(
        await page.checkRemainingText(expectedText),
        "Remaining tasks mismatch expected value"
      );
    })
  ).timeout(15000);
});
