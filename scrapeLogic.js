const puppeteer = require("puppeteer");
require("dotenv").config();

const ribbitsURL ='https://sologenic.org/trade?market=5249424249545300000000000000000000000000%2BrPmb5BPBAbE9jmNaFXNPH5kZEPDpRxaY77%2FXRP&network=mainnet'


const waitForIt = delay => new Promise(resolve => setTimeout(resolve, delay));

const scrapeLogic = async (res) => {
  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
  try {
    const page = await browser.newPage();

    await page.goto(ribbitsURL)
    await waitForIt(5000)
      //"https://developer.chrome.com/");


    const ribbitsPage = await page.evaluate(() => {
      const price = document.querySelector("p.price").getAttribute('title');
      return price;
  });
  //#content-scroll > div > div.mobile_content > div:nth-child(2) > div > div:nth-child(1) > p
    // // Set screen size
    // await page.setViewport({ width: 1080, height: 1024 });

    // // Type into search box
    // await page.type(".search-box__input", "automate beyond recorder");

    // // Wait and click on first result
    // const searchResultSelector = ".search-box__link";
    // await page.waitForSelector(searchResultSelector);
    // await page.click(searchResultSelector);

    // // Locate the full title with a unique string
    // const textSelector = await page.waitForSelector(
    //   "text/Customize and automate"
    // );
    // const fullTitle = await textSelector.evaluate((el) => el.textContent);

    // Print the full title
    const logStatement = `The result is ${ribbitsPage}`;
    console.log(logStatement);
    res.send(logStatement);
  } catch (e) {
    console.error(e);
    res.send(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeLogic };
