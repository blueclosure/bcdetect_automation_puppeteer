## BCDetect + Puppeteer library


In order to be able to remotely control/script BCDetect you'll need to have:

1. BCDetect installed.
2. Edit config.json

3. Open a shell, enter this directory and execute the following commands:
	npm install && \
	npm run launch_servers & \
	npm run launch_notifier

where launch_servers launch the local proxy and the FP analyzer,
and launch_notifier will register to the websocket and print the JSON when an issue is found.

4. open another shell, enter this directory and execute the following commands:
	npm start

which will launch BCDetect and the script.

And example of script content after launching the BCDetect preamble:
```
	await page.goto("http://www.domxss.com/domxss/01_Basics/00_simple_noHead.html?13133862");
// You should see a notification in the first shell
```
```
// How to call the fuzzer via script:
    await page.goto("http://www.domxss.com/domxss/01_Basics/04_script_src.html?2113009555");
    await page.evaluate('_rw_.fuzzPage();');
    ```
    
    ```
// to close the BCDetect browser
driver.quit();
	```
