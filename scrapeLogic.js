const puppeteer = require("puppeteer");
require("dotenv").config();

const sribbitsURL = 'https://analytics.oracleswap.io/pair/0x0257781e4a628274040e88ed1540d55058dd9f3b'
const sToadzURL = "https://sparklesnft.com/collection/songbird/stoadz"
const ribbitsURL ='https://sologenic.org/trade?market=5249424249545300000000000000000000000000%2BrPmb5BPBAbE9jmNaFXNPH5kZEPDpRxaY77%2FXRP&network=mainnet'
const sbcURL = 'https://sparklesnft.com/collection/songbird/songbirdcity/'
const llURL = 'https://sparklesnft.com/collection/songbird/luxurylofts/'
const xIouURL = 'https://sologenic.org/trade?market=78546F61647A0000000000000000000000000000%2BrpRW1FumRWhhaLmoYwS1SqEXsnCccvpsAU%2FXRP&network=mainnet'
const xxlIouURL = 'https://sologenic.org/trade?market=78546F61647A58584C0000000000000000000000%2BrhiagNCMcF342muHW6oMgdsf9uutCWv5Vw%2FXRP&network=mainnet'
const stsoURL = 'https://flaremetrics.io/songbird'
const ftsoURL = 'https://flaremetrics.io/'


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



      var one = ''
      var two = ''



    //   const sToadzData = await page.$$(".flex.items-center.justify-center.gap-x-2")
 
    //   for (let i = 0; i < data.length; i++) {
    //     const element = data[i];
    //     const output = await element.$eval("p", element => element.textContent)
    //     if (i === 1) {
    //       one = output
    //     } else if (i === 4) {
    //       two = output
    //     }     
    // }
     
      
  //   const sribbitsPage = await page.evaluate(() => {        
  //     return document.querySelector("div.sc-bdVaJa.KpMoH.css-flugrv").innerText;
  //  });



    const data = await page.$$(".jss55")// jss55

    for (let i = 0; i < data.length; i++) {
          const element = data[i];
          const output = await element.$eval("p", element => element.textContent)
          one = output     
      }
    //evaluate(() => {
      //const price = document.querySelector(".price").innerText;
      //return price;
  //});
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
    const logStatement = `The result is ${one}`;
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
