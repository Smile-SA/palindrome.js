import axios from "axios";
import { reconciliateJson } from './reconciliatorUtils.js';
import jmespath from 'jmespath';
import { constructDataStructure } from "../tsdbConnector/dataStructureConstructor.js";
import { InfluxDBFluxClient } from "../tsdbConnector/clients/InfluxdbFlux.js";
import { PrometheusClient } from "../tsdbConnector/clients/Prometheus.js";
import { Logger } from "./logger.js";

/**
 * Returning "fetching data..." span that can be displayed while data is being fetched
 */
export const loadingText = (conf) => {
    let loading = document.createElement("div");
    const svg = document.createElement("img");
    svg.setAttribute("src", 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIHN0eWxlPSJzaGFwZS1yZW5kZXJpbmc6IGF1dG87IGRpc3BsYXk6IGJsb2NrOyBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDsiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48Zz48Y2lyY2xlIHI9IjIwIiBmaWxsPSIjZThlOGU4IiBjeT0iNTAiIGN4PSIzMCI+CiAgPGFuaW1hdGUgYmVnaW49Ii0wLjVzIiB2YWx1ZXM9IjMwOzcwOzMwIiBrZXlUaW1lcz0iMDswLjU7MSIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGF0dHJpYnV0ZU5hbWU9ImN4Ij48L2FuaW1hdGU+CjwvY2lyY2xlPgo8Y2lyY2xlIHI9IjIwIiBmaWxsPSIjNjk2OTY5IiBjeT0iNTAiIGN4PSI3MCI+CiAgPGFuaW1hdGUgYmVnaW49IjBzIiB2YWx1ZXM9IjMwOzcwOzMwIiBrZXlUaW1lcz0iMDswLjU7MSIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGF0dHJpYnV0ZU5hbWU9ImN4Ij48L2FuaW1hdGU+CjwvY2lyY2xlPgo8Y2lyY2xlIHI9IjIwIiBmaWxsPSIjZThlOGU4IiBjeT0iNTAiIGN4PSIzMCI+CiAgPGFuaW1hdGUgYmVnaW49Ii0wLjVzIiB2YWx1ZXM9IjMwOzcwOzMwIiBrZXlUaW1lcz0iMDswLjU7MSIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGF0dHJpYnV0ZU5hbWU9ImN4Ij48L2FuaW1hdGU+CiAgPGFuaW1hdGUgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGR1cj0iMXMiIGtleVRpbWVzPSIwOzAuNDk5OzAuNTsxIiBjYWxjTW9kZT0iZGlzY3JldGUiIHZhbHVlcz0iMDswOzE7MSIgYXR0cmlidXRlTmFtZT0iZmlsbC1vcGFjaXR5Ij48L2FuaW1hdGU+CjwvY2lyY2xlPjxnPjwvZz48L2c+PCEtLSBbbGRpb10gZ2VuZXJhdGVkIGJ5IGh0dHBzOi8vbG9hZGluZy5pbyAtLT48L3N2Zz4=');
    svg.setAttribute('style', 'transform: scale(0.2);');
    svg.style.position = 'absolute';
    svg.style.left = "50%";
    svg.style.top = "50%";
    svg.style.transform = "translate(-50%, -50%) scale(0.2)";

    loading.setAttribute("id", "remote-data-source-loader");
    loading.appendChild(svg);
    loading.style.position = "absolute";
    loading.style.top = "0";
    loading.style.left = "0";
    loading.style.width = "100%";
    loading.style.height = "100%";

    return loading;
}

/**
 * Creates popup for remote data source url
 * @param {*} parentElement the Palindrome.js container
 */
export const createBadUrlPopup = (parentElement) => {
    let modalDiv = document.createElement("div");
    modalDiv.setAttribute("id", "url-input");
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
    modalContent.style.width = "30%";
    modalContent.style.height = "20%";
    modalContent.style.borderRadius = "25px";

    const span = document.createElement("span");
    span.setAttribute("class", "close");
    span.innerHTML = "&times;";
    span.style.color = "#aaaaaa";
    span.style.float = "right";
    span.style.fontSize = "28px";
    span.style.fontWeight = "bold";

    modalContent.appendChild(span);

    const title = document.createElement('p');
    title.innerHTML = "❌ Sorry, we couldn't find any external data from <a src='http://localhost:9000'>http://localhost:9000</a>.";
    title.style = 'margin-left: 10%; margin-right: 10%; margin-top: 4.5%; font-size: 16px; align-text: center';
    modalContent.appendChild(title);


    let style = document.createElement('style');
    style.innerHTML = `
        .close:hover, .close:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
        }
    `;

    const closeFetchModal = (event) => {
        if (event.target === modalDiv || event.target === span) {
            modalDiv.style.display = "none";
        }
    }
    window.addEventListener('click', closeFetchModal);
    span.addEventListener('click', closeFetchModal);

    modalDiv.appendChild(modalContent);
    parentElement.appendChild(style);
    parentElement.appendChild(modalDiv);

}

/**
 * Splits the input data into two separate structures: one for the backend and one for the frontend.
 * The backend structure contains metrics and layers that need to be reconciled, while the frontend structure contains only the reconciled metrics and layers.
 * @param {*} schemaData - The input data containing metrics and layers.
 * 
 * @returns {Object} An object containing two properties: 'dataToBackend' and 'dataToFrontend'.
 * dataToBackend - The data structure for the backend, containing metrics and layers that need to be fetched from TSDB.
 * dataToFrontend - The data structure for the frontend, containing only the metrics and layer that need to be reconciled in frontend.
 */
const splitData = (schemaData) => {
    const data = JSON.parse(JSON.stringify(schemaData));
    const reconMetrics = [];
    const reconLayers = [];
    for (const layer of data.layers) {
        for (const metricKey of layer.metrics) {
            let metric;
            if (typeof metricKey === 'string') {
                metric = data.metrics.find((e) => e.id === metricKey);
            }
            else if (typeof metricKey === 'object') {
                metric = metricKey;
            }
            const dataProvider = data.dataProviders.find((e) => e.id === metric.dataProviderId);
            if (metric && dataProvider.type === 'apiEndpoint') {

                data.metrics = data.metrics.filter((e) => e.id !== metric.id);
                layer.metrics = layer.metrics.filter((e) => e !== metric.id);

                reconMetrics.push(metric);
                const reconLayer = reconLayers.find(rl => rl.name === layer.name);
                if (reconLayer) {
                    reconLayer.metrics.push(metricKey);
                }
                else {
                    reconLayers.push({
                        metrics: [metricKey],
                        name: layer.name,
                        options: layer.options
                    });
                }
            }
        }
    }
    const dataToFrontend = {
        metrics: reconMetrics,
        layers: reconLayers
    };

    return {
        dataToBackend: data,
        dataToFrontend
    }
}

/**
 * Merges frontend and backend data structures
 * @param {*} target the frontend or the backend data structure
 * @param {*} source the frontend or the backend data structure 
 * @returns {Object} an object containing the merged data structure.
 */
const mergeData = (target, source) => {
    for (const key in source) {
        if (key in target) {
            target[key]["metrics"] = { ...target[key].metrics, ...source[key].metrics };
        }
        else {
            target[key] = source[key];
        }
    }
    return target;
};

/**
 * Checks if there is metrics defined inside the layers defintions
 * @param {*} data 
 * @returns {Boolean}
 */
export const isMetricDefinedInsideLayer = (data) => {
    for (const layer of data.layers) {
        const layerMetrics = layer.metrics;
        for (const metric of layerMetrics) {
            if (typeof metric === "object") {
                return true;
            }
        }
    }
    return false;
}


/**
 * Fetches data from external api (in frontend) or/and from tsdbs (in backend)
 * @param {*} data the schema defined by the user
 * @returns {Object} the Palindrome.js data structure
 */
export const fetchFromDataProviders = async (data, webWorkersHttp, workersPool) => {
    const { dataToBackend, dataToFrontend } = splitData(data);
    const reconciledDataStructure = await reconciliateJson(dataToFrontend, data.dataProviders, webWorkersHttp, workersPool);
    if (dataToBackend.metrics.length > 0 || isMetricDefinedInsideLayer(dataToBackend)) {
        let response;
        if (data.options.useBackend === true) {
            response = (await axios.post('http://localhost:9009/query', dataToBackend)).data;
        } else {
            response = await constructDataStructure(dataToBackend);
        }
        const dataStructure = mergeData(response, reconciledDataStructure);
        return dataStructure;
    }
    return reconciledDataStructure;
}

export const groupMetricsByFetchPace = (data) => {
    const fetchIntervals = {};

    const addMetricToInterval = (metric, layerName, dataProvider, remoteDataFetchPace) => {
        if (!fetchIntervals[remoteDataFetchPace]) {
            fetchIntervals[remoteDataFetchPace] = [];
        }
        fetchIntervals[remoteDataFetchPace].push({
            ...metric,
            layer: layerName,
            dataProvider,
        });
    };


    for (const layer of data.layers) {
        for (const metric of layer.metrics) {
            if (typeof metric === 'object') {
                const dataProvider = data.dataProviders.find((e) => e.id === metric.dataProviderId);
                if (metric.remoteDataFetchPace) {
                    addMetricToInterval(metric, layer.name, dataProvider, metric.remoteDataFetchPace);
                }
                else if (dataProvider.remoteDataFetchPace) {
                    addMetricToInterval(metric, layer.name, dataProvider, dataProvider.remoteDataFetchPace);
                }
                else if (data.options.remoteDataFetchPace) {
                    addMetricToInterval(metric, layer.name, dataProvider, data.options.remoteDataFetchPace);
                }
            }
            else if (typeof metric === 'string') {
                const metricObject = data.metrics.find(e => e.id === metric);
                const dataProvider = data.dataProviders.find((e) => e.id === metricObject.dataProviderId);
                if (metricObject.remoteDataFetchPace) {
                    addMetricToInterval(metricObject, layer.name, dataProvider, metricObject.remoteDataFetchPace);
                }
                else if (dataProvider.remoteDataFetchPace) {
                    addMetricToInterval(metricObject, layer.name, dataProvider, dataProvider.remoteDataFetchPace);
                }
                else if (data.options.remoteDataFetchPace) {
                    addMetricToInterval(metricObject, layer.name, dataProvider, data.options.remoteDataFetchPace);
                }
            }
        }
    }
    return fetchIntervals;
}

export const initializeFetchIntervals = (fetchIntervals, data, options, webWorkersHttp, workersPool, useCaseTitle) => {
    const intervals = [];

    const durations = [];
    const memoryUsageHistory = [];

    if (options.benchmarkDataUpdate) {
        setTimeout(() => {
            let usedJSHeapSizeSum = 0;
            let totalJSHeapSizeSum = 0;
            for (const memoryElem of memoryUsageHistory) {
                usedJSHeapSizeSum += typeof memoryElem === 'object' ? memoryElem.usedJSHeapSizeMB : 0;
                totalJSHeapSizeSum += typeof memoryElem === 'object' ? memoryElem.totalJSHeapSizeMB : 0;
            }

            const result = {
                "timeSpentMS": durations.reduce((acc, curr) => acc + curr) / durations.length,
                "type": "benchmarkDataUpdate",
                "memoryUsage": {
                    'usedJSHeapSizeMB': (usedJSHeapSizeSum / memoryUsageHistory.length).toFixed(2),
                    'totalJSHeapSizeMB': (totalJSHeapSizeSum / memoryUsageHistory.length).toFixed(2)
                },
                "isBackend": options.useBackend,
                "benchmarkDuration": options.benchmarkDuration
            };

            const benchmarkDataUpdateIter = parseInt(localStorage.getItem('palindrome:benchmarkDataUpdateIter'));
            if (benchmarkDataUpdateIter === 0) {
                localStorage.setItem('palindrome:benchmarkDataUpdateIter', 1);
                localStorage.setItem('palindrome:result', JSON.stringify(result));
                window.location.reload();
            } else if (benchmarkDataUpdateIter === 1) {
                const fullResults = [JSON.parse(localStorage.getItem('palindrome:result')), result]
                Logger.log(fullResults);
                localStorage.removeItem('palindrome:benchmarkDataUpdateIter');
                localStorage.removeItem('palindrome:result');
            }
        }, options.benchmarkDuration);
    }

    for (const interval in fetchIntervals) {
        const intervalId = setInterval(async () => {
            if (options.benchmarkDataUpdate) {
                const begin = performance.now();
                const updatedMetrics = await updateMetrics(fetchIntervals[interval], options.useBackend, webWorkersHttp, workersPool);
                durations.push(performance.now() - begin);
                const memoryUsage = performance.memory
                    ? {
                        usedJSHeapSizeMB: parseFloat((performance.memory.usedJSHeapSize / (1024 * 1024)).toFixed(2)),
                        totalJSHeapSizeMB: parseFloat((performance.memory.totalJSHeapSize / (1024 * 1024)).toFixed(2)),
                    }
                    : 'Memory API not supported in this browser';
                memoryUsageHistory.push(memoryUsage);
                updateDataStructure(updatedMetrics, data);
            }
            else {
                const updatedMetrics = await updateMetrics(fetchIntervals[interval], options.useBackend, webWorkersHttp, workersPool);
                updateDataStructure(updatedMetrics, data);
            }
        }, parseInt(interval));

        intervals.push(intervalId);
    }
    const existingIntervals = JSON.parse(localStorage.getItem(`palindrome:${useCaseTitle}:setIntervalIds`)) || [];
    localStorage.setItem(`palindrome:${useCaseTitle}:setIntervalIds`, JSON.stringify([...existingIntervals, ...intervals]));
}


export const updateMetrics = async (metricsToUpdate, useBackend, webWorkersHttp, workersPool) => {
    let apiData;
    const getValue = (metricItem) => metricItem.jmesPath ? jmespath.search(apiData, metricItem.jmesPath) : metricItem;
    const getRange = (metricItem) => typeof metricItem === 'string' ? jmespath.search(apiData, metricItem) : metricItem;

    const getTsdbValue = async (metricItem, dataProvider) => {
        let tsdbData;
        if (typeof metricItem === 'string') {
            if (useBackend === true) {
                tsdbData = (await axios.post(`http://localhost:9009/${dataProvider.type}/singleQuery`, {
                    query: metricItem,
                    url: dataProvider.url,
                    token: dataProvider.token,
                    org: dataProvider.org
                })).data;
            }
            else {
                if (dataProvider.type === 'influxdb') {
                    const influxDBClient = new InfluxDBFluxClient(dataProvider.url, dataProvider.token, dataProvider.org);
                    tsdbData = await influxDBClient.executeQuery(metricItem);
                }
                else if (dataProvider.type === 'prometheus') {
                    const prometheusClient = new PrometheusClient(dataProvider.url);
                    tsdbData = await prometheusClient.executeQuery(metricItem);
                }
            }
            return parseFloat(tsdbData[tsdbData.length - 1]);
        }

        return metricItem;
    }
    const updatedMetrics = [];
    for (const metric of metricsToUpdate) {
        const { label, value, ranges, unit, dataProvider, layer, id } = metric;
        if (dataProvider.type === 'apiEndpoint') {
            if (webWorkersHttp === true) {
                apiData = await httpWorkerFetch(dataProvider.url, workersPool);
            }
            else {
                apiData = (await axios.get(dataProvider.url)).data;
            }
            const updatedMetric = {
                current: getValue(value),
                label: getValue(label),
                unit: getValue(unit),
                min: getRange(ranges[0]),
                med: getRange(ranges[1]),
                max: getRange(ranges[2]),
                layer: layer,
                id
            };
            updatedMetrics.push(updatedMetric);
        }
        else {
            const { label, query, ranges, unit, dataProvider, layer, id } = metric;
            const updatedMetric = {
                label: label,
                unit: unit,
                layer: layer,
                current: await getTsdbValue(query, dataProvider),
                min: await getTsdbValue(ranges[0], dataProvider),
                med: await getTsdbValue(ranges[1], dataProvider),
                max: await getTsdbValue(ranges[2], dataProvider),
                id
            };
            updatedMetrics.push(updatedMetric);
        }
    }
    return updatedMetrics;
}


export const httpWorkerFetch = (url, workersPool) => {
    if (url[0] === '/') {
        url = window.origin + url;
    }
    return new Promise((resolve, reject) => {

        const httpWorker = workersPool.getWorker();
        httpWorker.onmessage = function (e) {
            if (e.data.subject === 'httpRequest') {
                resolve(e.data.data);
                workersPool.releaseWorker(httpWorker);
            }
        }

        httpWorker.onerror = function (error) {
            reject(error);
            worker.terminate();
        };

        httpWorker.postMessage({
            subject: "httpRequest",
            url
        });

    });
}

export const updateDataStructure = (updatedMetrics, dataStructure) => {
    for (const metric of updatedMetrics) {
        const { layer, label, min, med, max, current, unit, id } = metric;
        dataStructure[layer].metrics[id].label = label;
        dataStructure[layer].metrics[id].max = max;
        dataStructure[layer].metrics[id].min = min;
        dataStructure[layer].metrics[id].med = med;
        dataStructure[layer].metrics[id].current = current;
        dataStructure[layer].metrics[id].unit = unit;
    }
}

export const benchmarkInitialData = async (data, webWorkersHttp, workersPool) => {
    const begin = performance.now();
    await fetchFromDataProviders(data, webWorkersHttp, workersPool);
    const memoryUsage = performance.memory
        ? {
            usedJSHeapSizeMB: parseFloat((performance.memory.usedJSHeapSize / (1024 * 1024)).toFixed(2)),
            totalJSHeapSizeMB: parseFloat((performance.memory.totalJSHeapSize / (1024 * 1024)).toFixed(2)),
        }
        : 'Memory API not supported in this browser';

    const result = {
        timeSpentMS: performance.now() - begin,
        type: "benchmarkInitialData",
        memoryUsage,
        isBackend: data.options.useBackend
    };

    if (parseInt(localStorage.getItem('palindrome:benchmarkInitialDataIter')) === 0) {
        localStorage.setItem('palindrome:benchmarkInitialDataResult', JSON.stringify(result));
        location.reload();
    }
    else {
        const results = [result, JSON.parse(localStorage.getItem('palindrome:benchmarkInitialDataResult'))];
        localStorage.removeItem('palindrome:benchmarkInitialDataIter');
        localStorage.removeItem('palindrome:benchmarkInitialDataResult');
        return results;
    }
}