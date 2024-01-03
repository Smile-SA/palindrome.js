import { sphereHoverInit } from "../threeJSUtils/ThreeJSBasicObjects";
import { displayGrid } from "../threeJSUtils/ThreeJSBasicObjects";
import { showBenchmarkHistory } from "./benchmarkUtils";
import { WorkerPool } from "./workersUtils";

/**
 * Initializes global variables
 * @param {*} palindromeParameters 
 * @param {*} threeJSParameters 
 * @returns web workers pools
 */
export var initVariables = function (palindromeParameters, threeJSParameters) {
    let { conf, metricParameters, layerParameters, parentElement } = palindromeParameters;
    let { renderer, labelsRenderer, scene, camera, stats } = threeJSParameters;    
    //distance between planes is expressed in positive number
    conf.zPlaneMultilayer = -conf.zPlaneMultilayer;

    if (localStorage.getItem('benchmarkResults')) {
        conf.testBothVersions = (localStorage.getItem('testBothVersions') === 'true');
        conf.webWorkersRendering = (localStorage.getItem('webWorkersRendering') === 'true');
    }
    // rendering
    if (conf.displayGrid) {
        displayGrid(conf.gridSize, conf.gridDivisions, scene);
    }

    if (conf.displayValuesOnSphereHover) {
        //sphere hovering effect init
        sphereHoverInit(meshs, camera, scene, conf);
    }
    //metrics
    metricParameters["displayUnits"] = conf.displayMetricsLabelsUnit;
    metricParameters["characterFont"] = conf.metricsLabelsCharacterFont;
    metricParameters["labelSize"] = conf.metricsLabelsSize;
    metricParameters["labelColor"] = conf.metricsLabelsColor;
    metricParameters["labelBackground"] = conf.metricsLabelsBackground;
    metricParameters["labelBold"] = '';
    metricParameters["labelItalic"] = '';
    if (conf.metricsLabelsBold) {
        metricParameters["labelBold"] = 'bold'
    }
    if (conf.metricsLabelsItalic) {
        metricParameters["labelItalic"] = 'Italic'
    }
    // layers
    layerParameters["characterFont"] = conf.layersLabelsCharacterFont;
    layerParameters["labelSize"] = conf.layersLabelsSize;
    layerParameters["labelColor"] = conf.layersLabelsColor;
    layerParameters["labelBackground"] = conf.layersLabelsBackground;
    layerParameters["labelBold"] = '';
    layerParameters["labelItalic"] = '';
    if (conf.layersLabelsBold) {
        layerParameters["labelBold"] = 'bold'
    }
    if (conf.layersLabelsItalic) {
        layerParameters["labelItalic"] = 'Italic'
    }

    //3D related
    if (conf.metricsLabelsRenderingMode === "3D") {
        metricParameters['labelSize'] = metricParameters['labelSize'] * 1.8;
    }
    if (conf.layersLabelsRenderingMode === "3D") {
        layerParameters['labelSize'] = layerParameters['labelSize'] * 1.8;
    }
    parentElement.appendChild(renderer.domElement);
    parentElement.appendChild(labelsRenderer.domElement);
    if (conf.benchmark === 'Active') {
        //screen blocker
        let blocker = document.createElement("div");
        blocker.id = "benchmarkInteractionBlocker";
        blocker.style.position = "fixed";
        blocker.style.padding = "0";
        blocker.style.margin = "0";
        blocker.style.top = "0";
        blocker.style.left = "0";
        blocker.style.width = "100%";
        blocker.style.height = "100%";
        blocker.style.zIndex = 0;
        blocker.style.background = "rgba(0,0,0,0.25)";
        blocker.style.textAlign = "left";
        blocker.style.fontFamily = "arial";
        blocker.style.color = "rgb(0,0,0)";
        blocker.style.fontSize = "12pt";
        let counter = document.createElement("span");
        blocker.appendChild(counter);
        counter.style.zIndex = 1;
        parentElement.appendChild(blocker);
        //count down
        let sec = conf.testDuration * 60;
        let timer = setInterval(function () {
            if (conf.webWorkersRendering) {
                counter.innerHTML = "<pre style='background-color: rgba(255,255,255,0.8); position: absolute; left: 0px; top:0; width: 100%; padding-bottom: 80px; margin: 0px;'>" + "<span style='position: absolute; left:80px'>\n  Benchmark for <span style='color:#c90036; font-weight: bold'>Web Workers</span> version started, please do not touch your PC.    \n" + "  <b><span style='color:#c90036'>" + ("0" + Math.floor(sec / 60)).slice(-2) + ':' + ("0" + (sec - Math.floor(sec / 60) * 60)).slice(-2) + "</span></b> minute(s) remaining.    \n" + "</span></pre>";
            } else {
                counter.innerHTML = "<pre style='background-color: rgba(255,255,255,0.8); position: absolute; left: 0px; top:0; width: 100%; padding-bottom: 80px; margin: 0px;'>" + "<span style='position: absolute; left:80px'>\n  Benchmark for <span style='color:#c90036; font-weight: bold'>default</span> version started, please do not touch your PC.    \n" + "  <b><span style='color:#c90036'>" + ("0" + Math.floor(sec / 60)).slice(-2) + ':' + ("0" + (sec - Math.floor(sec / 60) * 60)).slice(-2) + "</span></b> minute(s) remaining.    \n" + "</span></pre>";
            }
            sec--;
            if (sec < 0) {
                clearInterval(timer);
            }
        }, 1000);
        //monitoring fps, mem, ms
        parentElement.appendChild(stats.dom);
        stats.dom.style.top = "21px"
        stats.dom.style.left = "10px"

    }

    let benchmarkHistory = JSON.parse(localStorage.getItem("benchmarkHistory"));

    if (conf.clearHistory) {
        if (benchmarkHistory) {
            localStorage.removeItem("benchmarkHistory");
        }

    }
    if (conf.showResultsHistory) {
        if (benchmarkHistory) {
            showBenchmarkHistory(parentElement, benchmarkHistory);
        } else {
            console.error("There is no history data to display!");
        }
    }

    // creating pools for layer, sides and frames
    let layers_pool, sides_pool, frames_pool, httpRequests_pool;
    layers_pool = new WorkerPool(conf.resourcesLevel);
    sides_pool = new WorkerPool(conf.resourcesLevel);
    frames_pool = new WorkerPool(conf.resourcesLevel);
    httpRequests_pool = new WorkerPool("worker.js", conf.resourcesLevel);


    return [layers_pool, sides_pool, frames_pool, httpRequests_pool];
}