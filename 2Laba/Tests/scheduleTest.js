import PolytechPage from "../PageClasses/polytechpage.js";
import { describe, it, before, after } from "mocha";
import { assert } from "chai";

describe("Schedule Functionality Tests", async () => {
  const page = new PolytechPage();

  before(async function () {
    this.timeout(20000);
    await page.openHomePage();
  });

  after(async () => {
    await page.shutdown();
  });

  it("opens schedule page", async () => {
    await page.openSchedulesPageFromHomePage();
  }).timeout(20000);

  it("launches the schedule viewer", async () => {
    await page.openSchedulesViewer();
  }).timeout(20000);

  it("enters group number in input field", async () => {
    await page.enterGroupNumber();
  }).timeout(20000);

  it("confirms the presence of the group in search results", async () => {
    assert.equal(await page.checkIfGroupExists(), true);
  }).timeout(20000);

  it("selects the group schedule", async () => {
    await page.selectSchedule();
  }).timeout(20000);

  it("checks if current day is highlighted on the schedule", async () => {
    assert.equal(await page.checkIfCurrentDayIsHighlighted(), true);
  }).timeout(20000);
});
