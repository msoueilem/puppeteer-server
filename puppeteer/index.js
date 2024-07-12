const puppeteer = require('puppeteer');

async function fetchJavaScriptContent(url) {
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

  // for conspon div
  const divContent = await page.evaluate(() => {
    const div = document.querySelector('div.conspon');
    return div ? div.outerHTML : "Not a div";
  });

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
  return divContent;
}

const url = 'https://sponsored.staging.webmd.com/vertebrogenic-pain';
fetchJavaScriptContent(url)
  .then(divContent => {
    console.log('JavaScript content:', divContent);
  })
  .catch(error => {
    console.error('Error fetching JavaScript content:', error);
  });