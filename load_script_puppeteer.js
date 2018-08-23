const bc_puppeteer = require('./lib/puppeteer-bcdetect');
const fs = require('fs');

const bcconfig = require("./config.json");
if (!bcconfig.bcdetect_install_dir){
  console.error("Missing bcdetect_install_dir in config.json, please edit and enter the full path of BCDetect directory.");
  process.exit();
}

if(!process.argv[2]){
 console.error(`Usage:\nnode ${process.argv[1]} path/to/script.js\nExample: node ${process.argv[1]} scripts/script_goto.js`);
 process.exit(); 
} else{
	var script_content = fs.readFileSync(script_filename)+'';
}
if (!bcconfig.bcdetect_home_dir)
  bcconfig.bcdetect_home_dir = require('./lib/bcdetect-utils.js').getBCHomePath();

(async () => {

    const browser = await bc_puppeteer.launch(bcconfig);
    const page = await browser.newPage();
    
    await eval("(async ()=> {\n" +script_content+";\n})()");
    // script example:
    //await page.goto('http://www.domxss.com/domxss/01_Basics/00_simple_noHead.html?13133862'
    //await page.evaluate('_rw_.fuzzPage();');
    //await browser.close();
})();
