// //adding Puppeteer library
// const pt = require('puppeteer');
// pt.launch().then(async browser => {
// //browser new page
// const p = await browser.newPage();
// //set viewpoint of browser page
// await p.setViewport({ width: 1000, height: 500 })
// //launch URL
// await p.goto('https://sponsored.webmd.com/peyronies-treatment-option/treatment-option')
// //capture screenshot
// await p.screenshot({
// path: 'webmd.png'
// });
// //browser close
// await browser.close()
// })

// fetchWebsiteSource.test.js


// *************************** test 2 *************************//

// const puppeteer = require('puppeteer');

// const url = 'https://sponsored.webmd.com/peyronies-treatment-option/treatment-option';

// async function fetchWebsiteSource(url) {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   await page.goto(url);
//   const html = await page.content();

//   await browser.close();

//   return html;
// }

// // Test case using Jest (you can use any test framework of your choice)
// async function doIt() {
//    // Replace with the URL of the website you want to fetch

//   try {
//     const source = await fetchWebsiteSource(url);
//     console.log('Source data:', source);
//     expect(source).toContain('<html'); // Example assertion, customize as per your needs
//   } catch (error) {
//     console.error('Error fetching source:', error);
//     throw error; // Fail the test on error
//   }
// }

// doIt()


// *************************** test 3 *************************//


// const puppeteer = require('puppeteer');

// async function run() {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto("https://sponsored.webmd.com/peyronies-treatment-option/treatment-option");

//     // let sourceL = await page.content();
//     // OR the faster method that doesn't wait for images to load:
//     let sourceL = await page.content({"waitUntil": "domcontentloaded"});

//     console.log(sourceL);
//     browser.close();
// }

// run();


// ############################# test 4 #################################// 

// const puppeteer = require('puppeteer');

// async function fetchScriptContent(url) {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   await page.goto(url);

//   // Evaluate in the context of the page to extract script content
//   const scriptContent = await page.evaluate(() => {
//     // Select all script tags and map their content
//     const scripts = Array.from(document.querySelectorAll('script'));
//     return scripts.map(script => script.textContent);
//   });

//   await browser.close();

//   return scriptContent;
// }

// // Usage example
// const url = 'https://sponsored.webmd.com/peyronies-treatment-option/treatment-option'; // Replace with the URL of the website
// fetchScriptContent(url)
//   .then(scriptContent => {
//     console.log('Script content:', scriptContent);
//   })
//   .catch(error => {
//     console.error('Error fetching script content:', error);
//   });



// ################################# Test 5 ###########################//

const puppeteer = require('puppeteer');

async function fetchJavaScriptContent(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  // Evaluate in the context of the page to extract JavaScript content
  const javascriptContent = await page.evaluate(() => {
    // Select script tags with type="text/javascript" and map their content
    const scripts = Array.from(document.querySelector('.conspon'));
    return scripts.map(script => script.textContent);
  });

  const divContent = await page.evaluate(() => {
    const div = document.querySelector('div.conspon');
    return div ? div.outerHTML : 'Div not found';
  });

  await browser.close();

  return divContent;
}

const url = 'https://sponsored.webmd.com/vertebrogenic-pain'; // Replace with the URL of the website
fetchJavaScriptContent(url)
  .then(divContent => {
    console.log('JavaScript content:', divContent);
  })
  .catch(error => {
    console.error('Error fetching JavaScript content:', error);
  });