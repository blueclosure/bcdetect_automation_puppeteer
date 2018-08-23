const bc_puppeteer = require('./lib/puppeteer-bcdetect');

const bcconfig = require("./config.json");
if (!bcconfig.bcdetect_install_dir){
  console.error("Missing bcdetect_install_dir in config.json, please edit and enter the full path of BCDetect directory.");
  process.exit();
}

if (!bcconfig.bcdetect_home_dir)
  bcconfig.bcdetect_home_dir = require('./lib/bcdetect-utils.js').getBCHomePath();

(async () => {

    const browser = await bc_puppeteer.launch(bcconfig);
    const page = await browser.newPage();
// Add your Scripting here:

    await page.goto('http://www.domxss.com/domxss/01_Basics/00_simple_noHead.html?13133862');
    //await page.goto('http://127.0.0.1:5000/dom?');
    await page.evaluate('_rw_.fuzzPage();');
    //await browser.close();
})();
