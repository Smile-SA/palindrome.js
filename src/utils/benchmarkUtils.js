import ApexCharts from 'apexcharts';

/**
 * stats.js main function
 * @returns {{REVISION: number, domElement: HTMLDivElement, dom: HTMLDivElement, getValues: (function(): {mem: number, ms: number, fps: number}), showPanel: showPanel, setMode: showPanel, addPanel: (function(*): *), update: update, end: (function(): number), begin: begin}}
 * @constructor
 */
export var Stats = function () {
    var mode = 0;
    let fps = 0, ms = 0, mem = 0;
    var container = document.createElement('div');
    container.style.cssText = 'position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000';
    container.setAttribute("id","performanceMetering");
    container.addEventListener('click', function (event) {
        event.preventDefault();
        showPanel(++mode % container.children.length);
    }, false);

    function addPanel(panel) {
        container.appendChild(panel.dom);
        return panel;
    }

    function showPanel(id) {
        for (var i = 0; i < container.children.length; i++) {
            container.children[i].style.display = i === id ? 'block' : 'none';
        }
        mode = id;
    }

    var beginTime = (performance || Date).now(), prevTime = beginTime, frames = 0;
    var fpsPanel = addPanel(new Stats.Panel('FPS', '#0ff', '#002'));
    var msPanel = addPanel(new Stats.Panel('MS', '#0f0', '#020'));
    if (self.performance && self.performance.memory) {
        var memPanel = addPanel(new Stats.Panel('MB', '#f08', '#201'));
    }
    showPanel(0);
    return {
        REVISION: 16,
        dom: container,
        addPanel: addPanel,
        showPanel: showPanel,
        begin: function () {
            beginTime = (performance || Date).now();
        },
        end: function () {
            frames++;
            fps = ms = mem = 0;
            var time = (performance || Date).now();
            msPanel.update(time - beginTime, 200);
            ms = time - beginTime;
            if (time >= prevTime + 1000) {
                fpsPanel.update((frames * 1000) / (time - prevTime), 100);
                fps = (frames * 1000) / (time - prevTime)
                prevTime = time;
                frames = 0;
                if (memPanel) {
                    var memory = performance.memory;
                    mem = memory.usedJSHeapSize / 1048576;
                    memPanel.update(memory.usedJSHeapSize / 1048576, memory.jsHeapSizeLimit / 1048576);
                }
            }
            return time;
        },
        update: function () {
            beginTime = this.end();
        },
        getValues: function () {
            return {
                'fps': fps,
                'ms': ms,
                'mem': mem
            };
        },
        // Backwards Compatibility
        domElement: container,
        setMode: showPanel
    };
};

/**
 * stats.js utility
 * @param name
 * @param fg
 * @param bg
 * @returns {{dom: HTMLCanvasElement, update: update}}
 * @constructor
 */
Stats.Panel = function (name, fg, bg) {
    var min = Infinity, max = 0, round = Math.round;
    var PR = round(window.devicePixelRatio || 1);
    var WIDTH = 80 * PR, HEIGHT = 48 * PR,
        TEXT_X = 3 * PR, TEXT_Y = 2 * PR,
        GRAPH_X = 3 * PR, GRAPH_Y = 15 * PR,
        GRAPH_WIDTH = 74 * PR, GRAPH_HEIGHT = 30 * PR;
    var canvas = document.createElement('canvas');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    canvas.style.cssText = 'width:80px;height:48px';
    var context = canvas.getContext('2d');
    context.font = 'bold ' + (9 * PR) + 'px Helvetica,Arial,sans-serif';
    context.textBaseline = 'top';
    context.fillStyle = bg;
    context.fillRect(0, 0, WIDTH, HEIGHT);
    context.fillStyle = fg;
    context.fillText(name, TEXT_X, TEXT_Y);
    context.fillRect(GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT);
    context.fillStyle = bg;
    context.globalAlpha = 0.9;
    context.fillRect(GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT);
    return {
        dom: canvas,
        update: function (value, maxValue) {
            min = Math.min(min, value);
            max = Math.max(max, value);
            context.fillStyle = bg;
            context.globalAlpha = 1;
            context.fillRect(0, 0, WIDTH, GRAPH_Y);
            context.fillStyle = fg;
            context.fillText(round(value) + ' ' + name + ' (' + round(min) + '-' + round(max) + ')', TEXT_X, TEXT_Y);
            context.drawImage(canvas, GRAPH_X + PR, GRAPH_Y, GRAPH_WIDTH - PR, GRAPH_HEIGHT, GRAPH_X, GRAPH_Y, GRAPH_WIDTH - PR, GRAPH_HEIGHT);
            context.fillRect(GRAPH_X + GRAPH_WIDTH - PR, GRAPH_Y, PR, GRAPH_HEIGHT);
            context.fillStyle = bg;
            context.globalAlpha = 0.9;
            context.fillRect(GRAPH_X + GRAPH_WIDTH - PR, GRAPH_Y, PR, round((1 - (value / maxValue)) * GRAPH_HEIGHT));
        },
    };
};


/**
 * collect benchmark data
 *
 * @param {*} stats
 * @param {number} duringTime
 * @param {*} statsVariables
 * @param {*} conf
 */
export var collectStatsData = async function (stats, duringTime, statsVariables, conf) {
    let {displayMessage, displayBenchmark, statsData, startDate, parentElement} = statsVariables;
    let currentDate = new Date,
        endDate = new Date(startDate.getTime() + duringTime * 60000);
    if (startDate.getTime() <= currentDate.getTime() && endDate.getTime() >= startDate.getTime() && currentDate.getTime() <= endDate.getTime()) {
        let r = await stats.getValues();
        if (displayMessage) {
            console.info("A " + duringTime + " minute(s) benchmark has been started ...");
            displayMessage = false;
        }
        if (r.fps !== undefined && r.fps > 0) {
            statsData.fps.value.push(parseFloat(r.fps.toFixed(2)));
            statsData.fps.rendering.push({value: parseFloat(r.fps.toFixed(2)), time: new Date().getSeconds()});
            statsData.fps.length += 1;
        }
        if (r.ms !== undefined && r.ms > 0) {
            statsData.ms.value.push(parseFloat(r.ms.toFixed(2)));
            statsData.ms.rendering.push({value: parseFloat(r.ms.toFixed(2)), time: new Date().getSeconds()});
            statsData.ms.length += 1;
        }
        if (r.mem !== undefined && r.mem > 0) {
            statsData.mem.value.push(parseFloat(r.mem.toFixed(2)));
            statsData.mem.rendering.push({value: parseFloat(r.mem.toFixed(2)), time: new Date().getSeconds()});
            statsData.mem.length += 1;
        }

    } else if (displayBenchmark) {
        let previousVersion, previousData, previousResults;
        let results = {
            'Average FPS rendered': (((statsData.fps.value).reduce((a, b) => a + b, 0)) / statsData.fps.length).toFixed(2),
            'Average Milliseconds needed to render a frame': (((statsData.ms.value).reduce((a, b) => a + b, 0)) / statsData.ms.length).toFixed(2),
            'Average MBytes of allocated memory': statsData.mem.length === 0 ? "N/A" : (((statsData.mem.value).reduce((a, b) => a + b, 0)) / statsData.mem.length).toFixed(2),
            'Minute(s) of test': duringTime,
        }
        let versionString = conf.webWorkersRendering ? 'Web workers' : 'Basic';
        statsVariables.displayBenchmark = false;
        displayBenchmark = false;

        if (conf.testBothVersions) {
            //Getting first version results
            console.log(versionString + ' version test finished.');
            localStorage.setItem('benchmarkResults', JSON.stringify(results));
            localStorage.setItem('testBothVersions', false);
            localStorage.setItem('webWorkersRendering', !conf.webWorkersRendering);
            localStorage.setItem('version', versionString);
            localStorage.setItem('previousData', JSON.stringify(statsData));
            conf.testBothVersions = false;
            //Reload to execute the other version of Palindrome.js
            localStorage.setItem('reloadTime', new Date().toISOString());
            document.location.reload();
        } else {
            //Getting second version results in case of two versions test OR getting results of the only version to test in the case of a single test
            console.log(versionString + ' version test finished.');
            conf.benchmark === 'Inactive';
            previousResults = JSON.parse(localStorage.getItem('benchmarkResults'));
            previousResults = previousResults ? Object.values(previousResults) : null;
            previousVersion = localStorage.getItem('version');
            previousData = JSON.parse(localStorage.getItem('previousData'));
            //parentElement.removeChild(stats.dom);
            localStorage.removeItem('benchmarkResults');
            localStorage.removeItem('testBothVersions');
            localStorage.removeItem('webWorkersRendering');
            localStorage.removeItem('version');
            localStorage.removeItem('previousData');
            const previousResultsFormatted = {
                'Average FPS rendered': previousResults[0],
                'Average Milliseconds needed to render a frame': previousResults[1],
                'Average MBytes of allocated memory': previousResults[2],
                'Minute(s) of test': previousResults[3],
            }
            if (process.env.IS_BENCHMARK) {
                const fileResults = {};
                fileResults[`${previousVersion}_version_results`] = previousResultsFormatted;
                fileResults[`${versionString}_version_results`] = results;
                fileResults['palindrome_config'] = conf;
                const fileContent = JSON.stringify(fileResults, null, 2);
                const fileName = process.env.OUTPUT_FILENAME ? process.env.OUTPUT_FILENAME : "benchmarkResults";
                exportBenchMarkResultsToFile(fileContent, fileName, "text/plain");
            }
            await createModal(Object.keys(results), Object.values(results), previousResults, duringTime, parentElement, versionString, previousVersion, statsData, previousData);            
            // mutate benchmark control to Inactive
            conf.benchmark = 'Inactive';
            localStorage.removeItem('benchmarkResults');
            localStorage.removeItem('testBothVersions');
            localStorage.removeItem('webWorkers');
            localStorage.removeItem('version');
            localStorage.removeItem('previousData');
        }
        //Saving benchmark results into history (localStorage)
        let currentDate = new Date().toISOString();
        //if there is a previous history results, we append the current result to the history
        if (localStorage.getItem("benchmarkHistory")) {
            let history = JSON.parse(localStorage.getItem("benchmarkHistory"));
            history[currentDate] = {results, statsData, version: versionString};
            localStorage.setItem("benchmarkHistory", JSON.stringify(history));
        }
        //if there are no previous results, we create a new history
        else {
            let history = {};
            history[currentDate] = {results, statsData, version: versionString};
            localStorage.setItem("benchmarkHistory", JSON.stringify(history));
        }
        console.info(`Benchmark results after ${duringTime} minute(s) of execution.`);
        console.info(results);
    }
}

/**
 * Create modal elements : modal div, content div, background, closing button
 * @param {Boolean} isHistory show or not the history panel
 * @returns {[]} 
 */
function createModalElements(isHistory) {
    let modalDiv = document.createElement("div");
    modalDiv.setAttribute("id", "benchmarkModal");
    modalDiv.style.fontFamily = "sans-serif";
    modalDiv.style.display = "block";
    modalDiv.style.position = "fixed";
    modalDiv.style.zIndex = "1";
    modalDiv.style.paddingTop = "100px";
    modalDiv.style.paddingBottom = "100px";
    modalDiv.style.left = "0";
    modalDiv.style.top = "0";
    modalDiv.style.width = "100%";
    modalDiv.style.height = "100%";
    modalDiv.style.overflow = "auto";
    modalDiv.style.backgroundColor = "rgb(0,0,0)";
    modalDiv.style.backgroundColor = "rgba(0,0,0,0.4)";

    let modalContent = document.createElement("div");
    modalContent.style.backgroundColor = "#fefefe";
    modalContent.style.margin = "auto";
    modalContent.style.padding = "20px";
    modalContent.style.border = "1px solid #888";
    modalContent.style.width = "80%";
    modalContent.style.height = "700px";
    modalContent.style.overflow = "auto";

    let span;

    let style = document.createElement('style');
    style.innerHTML = `
        .close:hover,.close:focus 
            {
                color: 'black';
                text-decoration: none;
                cursor: pointer;
            }
    `;
    if (!isHistory) {
        span = document.createElement("span");
        span.setAttribute("class", "close");
        span.innerHTML = "&times;";
        span.style.color = "#aaaaaa";
        span.style.float = "right";
        span.style.fontSize = "28px";
        span.style.fontWeight = "bold";
        //if we click outside the modal, the modal will close
        window.onclick = function (event) {
            if (event.target === modalDiv) {
                closeModal(modalDiv);
            }
        }
        //if we click on the closing button, the modal will close
        span.onclick = () => closeModal(modalDiv);

    }
    return [modalDiv, modalContent, span, style];
}

/**
 * Close benchmark results modal and deletes interaction blocker
 * @param {*} modalDiv the modal div that displays benchmark results
 */
const closeModal = (modalDiv) => {
    modalDiv.parentNode.removeChild(modalDiv);
    const benchmarkInteractionBlocker = document.getElementById("benchmarkInteractionBlocker");
    if(benchmarkInteractionBlocker){
        benchmarkInteractionBlocker.parentNode.removeChild(benchmarkInteractionBlocker);
    }
    const monitoringDisplay = document.getElementById("performanceMetering");
    monitoringDisplay.parentNode.removeChild(monitoringDisplay);
}

/**
 * Create benchmark HTML table
 *
 * @param {*} labels list that contains the titles of the columns
 * @param {*} content list that contains the content of each column
 * @param {*} previousContent list that contains the previous content of each column, if there is a previous test
 * @param {number} time duration of the benchmark
 * @param {*} parentElement the parent HTML DOM element
 * @param {*} version current palindrome version of test
 * @param {*} previousVersion previous palindrome version of test, if there is a previous test
 * @param {*} data all the data collected of the current version
 * @param {*} previousData all the previous data collected of the previous version, if there is a previous test
 */
export var createModal = async function (labels, content, previousContent, time, parentElement, version, previousVersion, data, previousData) {
    let isBothVersions = !!previousData;
    let everySecondResult_previous, title, yaxisTitle;
    if (isBothVersions) {
        //if we test basic vs web workers then we're going to display just the most variable parameter which is milliseconds needed to render a frame
        const previousDataGroupedBySeconds = groupBySeconds(previousData, "ms");
        everySecondResult_previous = groupByEverySecond(previousDataGroupedBySeconds);
        title = {text: 'Milliseconds needed to render a frame per second'};
        yaxisTitle = {text: 'Milliseconds needed to render a frame'};
    }
    //group our stats data by each second, so for each second we have all the data collected
    const currentDataGroupedBySeconds = groupBySeconds(data, "ms");
    let everySecondResult_current = groupByEverySecond(currentDataGroupedBySeconds);
    const currentFpsDataGroupedBySeconds = groupBySeconds(data, "fps");
    let everyFpsSecondResult_current = groupByEverySecond(currentFpsDataGroupedBySeconds);
    const currentMemDataGroupedBySeconds = groupBySeconds(data, "mem");
    let everyMemSecondResult_current = groupByEverySecond(currentMemDataGroupedBySeconds);
    //padding : make sure all out grouped arrays have the same length, to have a synched curves drawing
    [everySecondResult_current, everyFpsSecondResult_current, everyMemSecondResult_current] = padData(everySecondResult_current, everyFpsSecondResult_current, everyMemSecondResult_current);
    let modalElements = createModalElements(false);
    let modalDiv = modalElements[0];
    let modalContent = modalElements[1];
    let span = modalElements[2];
    let style = modalElements[3];
    parentElement.appendChild(style);
    let p = document.createElement("p");
    p.innerHTML = `Benchmark results after ${time} minute(s) of execution (${version} version).`;
    p.style.fontWeight = "bold";
    modalContent.appendChild(span);
    modalContent.appendChild(p);
    let table = createDOMTable(labels, content);
    table.setAttribute("id", `table-${version}`);
    modalContent.appendChild(table);
    title = {text: 'Benchamark statistics'};
    yaxisTitle = {text: 'Values'};
    let series;
    //if we test both versions, we are going to display the Milliseconds needed to render a frame, in both versions (comparative mode)
    if (isBothVersions) {
        series = [
            {
                name: `Milliseconds needed to render a frame (${previousVersion} version)`,
                data: everySecondResult_previous,
            },
            {name: `Milliseconds needed to render a frame (${version} version)`, data: everySecondResult_current,},
        ];
        //otherwise we display the three parameters
    } else {
        series = [
            {name: `Milliseconds needed to render a frame (${version} version)`, data: everySecondResult_current,},
            {name: `Frames rendered (${version} version)`, data: everyFpsSecondResult_current,},
            {name: `MBytes of allocated memory (${version} version)`, data: everyMemSecondResult_current,},
        ];
    }
    let options = {
        chart: {
            type: 'area',
            width: '100%',
            height: '400px',
            toolbar: {tools: {selection: false, zoom: false, zoomin: false, zoomout: false, pan: false, reset: false}}
        },
        title, series,
        xaxis: {title: {text: 'Time in seconds'}, type: 'numeric',},
        yaxis: {type: 'numeric', title: yaxisTitle,},
        dataLabels: {enabled: false},
        stroke: {curve: 'smooth',},
    }
    if (isBothVersions) {
        p = document.createElement("p");
        p.innerHTML = `Benchmark results after ${time} minute(s) of execution (${previousVersion} version).`;
        p.style.fontWeight = "bold";
        modalContent.appendChild(p);
        table = createDOMTable(labels, previousContent);
        table.setAttribute("id", `table-${previousVersion}`);
        modalContent.appendChild(table);
    }
    let curveHolder = document.createElement("div");
    curveHolder.style.marginTop = "40px";
    let center = document.createElement("center");
    center.appendChild(curveHolder);
    modalContent.appendChild(center);
    let chart = new ApexCharts(curveHolder, options);
    modalDiv.appendChild(modalContent);
    parentElement.appendChild(modalDiv);
    chart.render();
}

/**
 * Fires when we want to show all benchmark history
 * @param {Object} history the history object that will be shown
 * @param {*} parentElement the HTML parent element
 */
export var showBenchmarkHistory = function (parentElement, history) {
    let modalElements = createModalElements(true);
    let modalDiv = modalElements[0];
    let modalContent = modalElements[1];
    let style = modalElements[3];
    parentElement.appendChild(style);
    let historyKeys = Object.keys(history);
    let title = {text: 'Benchamark statistics'};
    let yaxisTitle = {text: 'Values'};
    //creates history display
    for (let e of historyKeys) {
        let p = document.createElement("p");
        p.innerHTML = `${new Date(e).toLocaleString('en-GB', {timeZone: 'UTC'})} : Benchmark results after ${history[e].results["Minute(s) of test"]} minute(s) of execution (${history[e].version} version).`;
        p.style.fontWeight = "bold";
        modalContent.appendChild(p);
        let table = createDOMTable(Object.keys(history[e].results), Object.values(history[e].results));
        table.setAttribute("class", `table-history`);
        modalContent.appendChild(table);
        const currentDataGroupedBySeconds = groupBySeconds(history[e].statsData, "ms");
        let everySecondResult_current = groupByEverySecond(currentDataGroupedBySeconds);
        const currentFpsDataGroupedBySeconds = groupBySeconds(history[e].statsData, "fps");
        let everyFpsSecondResult_current = groupByEverySecond(currentFpsDataGroupedBySeconds);
        const currentMemDataGroupedBySeconds = groupBySeconds(history[e].statsData, "mem");
        let everyMemSecondResult_current = groupByEverySecond(currentMemDataGroupedBySeconds);
        //padding : make sure all out grouped arrays have the same length, to have a synched curves drawing
        [everySecondResult_current, everyFpsSecondResult_current, everyMemSecondResult_current] = padData(everySecondResult_current, everyFpsSecondResult_current, everyMemSecondResult_current);
        let series = [
            {
                name: `Milliseconds needed to render a frame (${history[e].version} version)`,
                data: everySecondResult_current,
            },
            {name: `Frames rendered (${history[e].version} version)`, data: everyFpsSecondResult_current,},
            {name: `MBytes of allocated memory (${history[e].version} version)`, data: everyMemSecondResult_current,},
        ];

        let options = {
            chart: {
                type: 'area',
                width: '100%',
                height: '400px',
                redrawOnParentResize: true,
                toolbar: {
                    tools: {
                        selection: false,
                        zoom: false,
                        zoomin: false,
                        zoomout: false,
                        pan: false,
                        reset: false
                    }
                }
            },
            title, series,
            xaxis: {title: {text: 'Time in seconds'}, type: 'numeric',},
            yaxis: {type: 'numeric', title: yaxisTitle,},
            dataLabels: {enabled: false},
            stroke: {curve: 'smooth',},
        }
        let curveHolder = document.createElement("div");
        curveHolder.style.marginTop = "40px";
        let center = document.createElement("center");
        center.appendChild(curveHolder);
        modalContent.appendChild(curveHolder);
        let chart;
        setTimeout(() => {
            chart = new ApexCharts(curveHolder, options);
            chart.render();
        }, 0)
        let hr = document.createElement("hr");
        modalContent.appendChild(hr);
    }
    modalDiv.appendChild(modalContent);
    parentElement.appendChild(modalDiv);
}

/**
 * group data by second
 */
function groupByEverySecond(data) {
    let result = [];
    Object.values(data).forEach(second => {
        let valueSum = 0;
        second.forEach(element => {
            valueSum += element.value;
        });
        let timeAverage = valueSum / second.length;
        result.push(timeAverage.toFixed(2));
    })
    return result;
}

/**
 * create DOM HTML table elements
 * @param {Object} labels table headings
 * @param {Object} content table content
 */
function createDOMTable(labels, content) {
    let table = document.createElement("table");
    table.setAttribute("width", "100%");

    //First row
    let titles = document.createElement("tr");
    titles.style.border = "1px solid black";
    titles.style.backgroundColor = "#d0e4f2";
    table.appendChild(titles);
    labels.forEach(element => {
        let td = document.createElement("td");
        td.style.border = "1px solid black";
        td.style.padding = "10px";
        td.innerHTML = element;
        td.style.fontWeight = "bold";
        td.style.textAlign = "center";
        titles.appendChild(td);
    });
    //content row
    let data = document.createElement("tr");
    data.style.border = "1px solid black";
    table.appendChild(data);
    content.forEach(element => {
        let td = document.createElement("td");
        td.style.border = "1px solid black";
        td.style.padding = "10px";
        td.style.textAlign = "center";
        td.innerHTML = element;
        data.appendChild(td);
    });
    return table;
}

/**
 * group data by seconds
 * @param {object} data
 * @param {string} type
 * @returns {T}
 */
function groupBySeconds(data, type) {
    return data[type].rendering.reduce((group, element) => {
        const {time} = element;
        group[time] = group[time] ?? [];
        group[time].push(element);
        return group;
    }, {});
}

/**
 * make sure all out grouped arrays have the same length, to have a synched curves drawing
 * @param {array} data1
 * @param {array} data2
 * @param {array} data3
 * @returns {*[]}
 */
function padData(data1, data2, data3) {
    let maxLength_current = Math.max(data1.length, data2.length, data3.length);
    while (data1.length < maxLength_current) {
        data1.push(data1.at(-1));
    }
    while (data2.length < maxLength_current) {
        data2.push(data2.at(-1));
    }
    while (data3.length < maxLength_current) {
        data3.push(data3.at(-1));
    }
    return [data1, data2, data3];
}


export const exportBenchMarkResultsToFile = function (content, fileName, contentType) {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });

    a.href = URL.createObjectURL(file);
    a.download = fileName;
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
}


/**
 * Cleans up benchmark variables when browser restores after crash
 */
export const benchmarkCleanUp = () => {
    const reloadTimeString = localStorage.getItem('reloadTime', new Date().toISOString());
    if (reloadTimeString) {
        const reloadTime = new Date(reloadTimeString);
        if( Math.floor((new Date() - reloadTime) / (1000 * 60)) >= 1 ) {
            localStorage.removeItem('benchmarkResults');
            localStorage.removeItem('testBothVersions');
            localStorage.removeItem('webWorkers');
            localStorage.removeItem('version');
            localStorage.removeItem('previousData');
        }
    }
}