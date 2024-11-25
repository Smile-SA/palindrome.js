const { launchBrowser, waitForBenchmarkResults, prettyPrintResults } = require('./remoteBenchmarkUtils');

(async () => {
    const browser = await launchBrowser();
    const page = await browser.newPage();

    await page.goto('http://localhost:1234/?data=remoteData');
    const normalBenchmarkResults = await waitForBenchmarkResults(page, 2);
    prettyPrintResults(normalBenchmarkResults, 'Use case: Remote Data', true);

    await page.goto('http://localhost:1234/?data=heavyRemoteData');
    const heavyBenchmarkResults = await waitForBenchmarkResults(page, 2);
    prettyPrintResults(heavyBenchmarkResults, 'Use case: Heavy Remote Data', true);

    await browser.close();
})();
