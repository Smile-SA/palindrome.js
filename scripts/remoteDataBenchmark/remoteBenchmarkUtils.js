// common-benchmark.js
const puppeteer = require('puppeteer');
const asciiTable = require('ascii-table');

async function launchBrowser(options = {}) {
    return await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        ...options
    });
}

function waitForBenchmarkResults(page, count = 1) {
    return new Promise((resolve) => {
        const benchmarkResults = [];
        const onConsoleListener = async (msg) => {
            if (msg.type() === 'log') {
                for (const arg of msg.args()) {
                    const jsonArg = await arg.jsonValue();
                    if (Array.isArray(jsonArg) && jsonArg.length === 2 && 
                        jsonArg.every(e => e.type === 'benchmarkInitialData' || e.type === 'benchmarkDataUpdate')) {
                        benchmarkResults.push(jsonArg);
                        if (benchmarkResults.length === count) {
                            page.off('console', onConsoleListener);
                            resolve(benchmarkResults);
                        }
                    }
                }
            }
        };
        page.on('console', onConsoleListener);
    });
}

function prettyPrintResults(benchmarkResults, ucName, includeInitialData = false) {
    let benchInitTable;
    if (includeInitialData) {
        benchInitTable = new asciiTable('Benchmark for initial data results | ' + ucName);
        benchInitTable.setHeading('Time Spent (MS)', 'Used JS Heap Size (MB)', 'Total JS Heap Size (MB)', 'Is Backend Used');
    }

    const benchUpdateTable = new asciiTable('Benchmark for updated data results | ' + ucName);
    benchUpdateTable.setHeading('Time Spent (MS)', 'Used JS Heap Size (MB)', 'Total JS Heap Size (MB)', 'Is Backend Used', 'Benchmark Duration (MS)');

    for (const res of benchmarkResults) {
        for (const singleRes of res) {
            if (singleRes.type === 'benchmarkDataUpdate') {
                benchUpdateTable.addRow(
                    singleRes.timeSpentMS.toFixed(2),
                    singleRes.memoryUsage.usedJSHeapSizeMB,
                    singleRes.memoryUsage.totalJSHeapSizeMB,
                    singleRes.isBackend,
                    singleRes.benchmarkDuration
                );
            }
            if (includeInitialData && singleRes.type === 'benchmarkInitialData') {
                benchInitTable.addRow(
                    singleRes.timeSpentMS.toFixed(2),
                    singleRes.memoryUsage.usedJSHeapSizeMB,
                    singleRes.memoryUsage.totalJSHeapSizeMB,
                    singleRes.isBackend
                );
            }
        }
    }
    
    if (includeInitialData) {
        console.log(benchInitTable.toString());
    }

    console.log(benchUpdateTable.toString());
}

module.exports = {
    launchBrowser,
    waitForBenchmarkResults,
    prettyPrintResults
};
