const puppeteer = require('puppeteer');

async function fetchJavaScriptContent(req, res) {
  const url = req.query.url;
  const options = req.query.options;
  console.log(options)
  let isStagingUrl = url.includes("staging");
  let device = 'desktop';
  const browser = await puppeteer.launch({
    headless: 'true',
    // executablePath: 'google-chrome-stable',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
    ignoreHTTPSErrors: true, dumpio: false, waitUntil: 'networkidle0'
  });
  const page = await browser.newPage();
  if (isStagingUrl) {
    await page.authenticate({ 'username': 'webmd', 'password': 'staging' });
  }
  if (device == 'mobile') {
    const iphone = KnownDevices['iPhone 6'];
    await page.emulate(iphone);
  }
  await page.setDefaultNavigationTimeout(0);
  await page.goto(url);

  // for everything
  const divContent = await page.evaluate(() => {
    var div;
    console.log(option);
    if (option !== undefined) {
      switch (option) { 
        case "conspon":
          div = document.querySelector('div.conspon');
          break;
        case "scripts":
          document.querySelectorAll('script[type="text/javascript"]').forEach((script, index) => {
            div[index] = script.outerHTML ? script.outerHTML : "Not a Script";
          });
          break;
        default:
          div = document.documentElement.outerHTML;
      }
    } else
      div = document.documentElement.outerHTML;

    return div ? div : "Not a div";
  });

  // for conspon div
  // const divContent = await page.evaluate(() => {
  //   const div = document.querySelector('div.conspon');
  //   return div ? div.outerHTML : "Not a div";
  // });

  // for script tags
  // const divContent = await page.evaluate(() => {
  //   const div = document.querySelectorAll('script[type="text/javascript"]');
  //   let divContent = {};
  //   div.forEach((script, index) => {
  //     divContent[index] = script.outerHTML ? script.outerHTML : "Not a Script";
  //   });
  //   return JSON.stringify(divContent, null, 2);
  // });

  await browser.close();
  res.send(divContent);
}

module.exports = {
  fetchJavaScriptContent
}