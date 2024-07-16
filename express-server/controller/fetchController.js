const puppeteer = require('puppeteer');
const KnownDevices = puppeteer.KnownDevices;

async function fetchJavaScriptContent(req, res) {
  const { url, options, device } = req.query;
  console.log(`URL: ${url}, Options: ${options}, Device: ${device}`);
  let isStagingUrl = url.includes("staging");
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
  try {
    await page.setDefaultNavigationTimeout(0);
    await page.goto(url);

    const divContent = await page.evaluate((options) => {
      const mainDocument = document.documentElement.outerHTML;
      var div = null;
      console.log(`Options: ${options}`);
      if (options !== undefined) {
        switch (options) {
          case "conspon":
            div = document.querySelector('div.conspon');
            break;
          case "scripts":
            document.querySelectorAll('script[type="text/javascript"]').forEach((script, index) => {
              div[index] = script.outerHTML ? script.outerHTML : "Not a Script";
            });
            break;
          default:
            div = mainDocument;
        }
      } else
        div = mainDocument;
      return div ? div : "Not a div";
    }, options);

    await browser.close();
    res.send(divContent);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred');
  } finally {
    await browser.close();
  }
}

module.exports = {
  fetchJavaScriptContent
}