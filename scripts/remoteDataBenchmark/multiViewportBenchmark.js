const { launchBrowser, waitForBenchmarkResults, prettyPrintResults } = require('./remoteBenchmarkUtils');

const USE_CASES_NUMBER = 12;

(async () => {
    const browser = await launchBrowser({
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--max-active-webgl-contexts=60'],
        browserContext: {
            protocolTimeout: 240000
        }
    });

    const page = await browser.newPage();

    const backendResults = [];
    const frontEndResults = [];
    for (let i = 1; i <= USE_CASES_NUMBER; i++) {
        await page.goto(`http://localhost:1234/?data=benchmarkRemoteData${i}&webWorkersRendering=false`);
        const res = await waitForBenchmarkResults(page);
        for(const r of res[0]) {
            if (r.isBackend) {
                backendResults.push(r.timeSpentMS.toFixed(2));
            }
            else {
                frontEndResults.push(r.timeSpentMS.toFixed(2));
            }
        }
        prettyPrintResults(res, `Use case: Benchmark Remote Data ${i} | Multi viewports`);
    }
    await browser.close();
})();
