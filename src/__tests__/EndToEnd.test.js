import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {

  let browser;
  let page;
  //jest.setTimeout(40000);

  beforeAll(async () => {
    jest.setTimeout(40000);
    browser = await puppeteer.launch(
/*       {
      headless: false,
      slowMo: 250, // slow down by 250ms
      ignoreDefaultArgs: ['--disable-extensions'] // ignores default setting that causes timeout errors
    } */
    );
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event');
  });

  afterAll(() => {
    browser.close();
  });

  test('An event element is collapsed by default', async () => {
    const eventDetails = await page.$('.event .eventDetails');
    expect(eventDetails).toMatchObject({});
  });

  test('User can expand an event to see its details', async () => {
    await page.click('.event .show-details-btn');
    const eventDetails = await page.$('.event .eventDetails');
    expect(eventDetails).toBeDefined();
  });

  test('User can collapse an event to hide its details', async () => {
    await page.click('.event .show-details-btn');
    const eventDetails = await page.$('.event .eventDetails');
    expect(eventDetails).toMatchObject({});
  });

});


describe('Filter events by City', () => {

  let browser;
  let page;
  //jest.setTimeout(40000);

  beforeAll(async () => {
    jest.setTimeout(40000);
    browser = await puppeteer.launch(
/*       {
      headless: false,
      slowMo: 500, // slow down by 250ms
      ignoreDefaultArgs: ['--disable-extensions'] // ignores default setting that causes timeout errors
    } */
    );
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
  });

  afterAll(() => {
    browser.close();
  });

  test('When user hasn’t searched for a city, show upcoming events from all cities', async () => {
    let inputClass = await page.waitForSelector('.city');
    let inputValue = await page.evaluate(x => x.value, inputClass);
    expect(inputValue).toBe('');
  });

  test('User should see a list of suggestions when they search for a city', async () => {
    await page.type('.city', 'Berlin');
    let CitySearch = await page.$('.suggestions li');
    expect(CitySearch).toBeDefined();
  });

  test('User can select a city from the suggested list', async () => {
    await page.reload();
    await page.type('.city', 'Berlin');
    await page.click('.suggestions li:first-child');
    let inputClass = await page.$('.city');
    let inputValue = await page.evaluate(x => x.value, inputClass);
    expect(inputValue).toBe('Berlin, Germany');
  });

});