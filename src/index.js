import * as THREE from 'three';
import { initThreeObjects } from './threeJSUtils/ThreeJSBasicObjects';
import { dataGenerator } from './utils/dataGenerator';
import { Stats, benchmarkCleanUp, collectStatsData, initializeRemoteDataBenchmark } from './utils/benchmarkUtils';
import { createLabels } from './utils/labelsUtils2D';
import { animateFrameDashedLine } from './utils/framesUtils';
import { initVariables } from './utils/initVariables';
import { cameraViewOptions, hasGeometry } from './utils/cameraUtils';
import { initMaterials } from './threeJSUtils/threeJSMaterialsInit';
import { setPreviousPalindrome } from "./utils/destructionUtils";
import { benchmarkInitialData, fetchFromDataProviders, groupMetricsByFetchPace, initializeFetchIntervals, loadingText } from "./utils/fetchUtils";
import { updateMeshes } from "./utils/renderingUtils";
import { applyLayerRotationToData, applyLayersSize } from './utils/layersUtils';
import { changeLayerMetricsBehavior, shiftMetricsToPositive } from './utils/metricsUtils2D';
import { renderDev } from '../dev/dev-index';
import { Logger } from './utils/logger';
import { WorkerPool } from './utils/workersUtils';

/**
 * @param {HTMLElement} parentElement parent element of three's renderer element
 * @param {*} conf model's configuration
 */
export default (function (parentElement, conf) {
    conf.testBothVersions = true;
    conf.testDuration = 1;
    /**
     * Main function
     *
     */
    async function run() {
        let data;
        let loading;
        let isDataReady = true;
        if (process.env.CI_BENCHMARK === 'remote_data') {
            initializeRemoteDataBenchmark(conf);
        }

        if (conf.validator) {
            conf.validator(conf.data);
        }

        if (conf.isRemoteData) {
            const httpRequestsPool = new WorkerPool(conf.resourcesLevel);
            const benchmarkDataUpdateIter = parseInt(localStorage.getItem('palindrome:benchmarkDataUpdateIter'));
            if (!benchmarkDataUpdateIter) { // To not repeate benchmarkInitialData on benchmarkDataUpdate
                if (conf.data.options.benchmarkInitialData) {
                    const benchmarkData = JSON.parse(JSON.stringify(conf.data));
                    if (!localStorage.getItem('palindrome:benchmarkInitialDataIter')) {
                        localStorage.setItem('palindrome:benchmarkInitialDataIter', 0);
                        benchmarkData.options.useBackend = false;
                    }
                    else if (parseInt(localStorage.getItem('palindrome:benchmarkInitialDataIter')) === 0) {
                        localStorage.setItem('palindrome:benchmarkInitialDataIter', 1);
                        benchmarkData.options.useBackend = true;
                    }
                    const results = await benchmarkInitialData(benchmarkData, conf.webWorkersHTTP, httpRequestsPool);
                    if (results) {
                        Logger.log(results);
                    }
                }
            }

            if (conf.data.options.benchmarkDataUpdate === true) {
                conf.data.options.liveData = true;
                if (!benchmarkDataUpdateIter) {
                    localStorage.setItem('palindrome:benchmarkDataUpdateIter', 0);
                    conf.data.options.useBackend = false;
                } 
                else if (benchmarkDataUpdateIter === 1) {
                    localStorage.setItem('palindrome:benchmarkDataUpdateIter', 1);
                    conf.data.options.useBackend = true;
                }
            }
            loading = loadingText(conf);
            parentElement.appendChild(loading);
            data = await fetchFromDataProviders(conf.data, conf.webWorkersHTTP, httpRequestsPool);
            loading.remove();

            if (!conf.data.options.liveData && conf.liveData === true) {
                conf.data.options.liveData = true;
                conf.data.options.remoteDataFetchPace = conf.remoteDataFetchPace;
            }

            const title = conf.title ? conf.title.toLowerCase().replaceAll(' ', '-') : '';
            if (conf.data.options.liveData === true) {
                fetchIntervals = groupMetricsByFetchPace(conf.data);
                for(const interval in fetchIntervals) {
                    const intervalMetrics = fetchIntervals[interval].map(e => e.id);
                    Logger.log(`Metrics`, intervalMetrics, `will be updated each`, parseInt(interval), `ms.`);
                }
                initializeFetchIntervals(fetchIntervals, data, conf.data.options, conf.webWorkersHTTP, httpRequestsPool, title);
            } 
            else if (conf.data.options.liveData === false) {
                const intervals = JSON.parse(localStorage.getItem(`palindrome:${title}:setIntervalIds`));
                if (intervals) {
                    for (const interval of intervals) {
                        clearInterval(interval);
                    }
                }
                localStorage.removeItem(`palindrome:${title}:setIntervalIds`);
            }
        }
        else {
            data = conf.data;
        }

        // Handling negative values
        shiftMetricsToPositive(data, conf);

        // Applying layer rotation in case of Flat camera
        applyLayerRotationToData(data, conf);
        newData = data;

        // Layer constraints behavior for percent
        changeLayerMetricsBehavior(data, conf);
        // Made specially for pyramid of Maslow's
        applyLayersSize(data);

        dataIterator = dataGenerator(data);

        // init materials
        [dashLineMaterial, lineMaterialTransparent, lineMaterial] = initMaterials(conf);
        let globalParams = { conf, labelDiv, metricParameters, scene, layerParameters, borderThickness, meshes };
        createLabels(data, globalParams);

        // Rendering palindrome
        if (isDataReady) {
            await render();
        }

        // Saving previous palindrome
        setPreviousPalindrome(renderer, scene, meshes, parentElement, frameId);
        if (!(conf.webWorkersRendering || conf.liveData)) {
            // Setting camera for default version
            cameraViewOptions(meshes, camera, conf);
        }
    }

    //init palindrome parameters
    benchmarkCleanUp();
    let initCamera = true;
    localStorage.setItem("palindrome:isInitComplete", false);
    let frameId;

    // Init benchmark stats parameters
    let stats = new Stats();
    let displayMessage = true;
    let displayBenchmark = true;
    let statsData = {
        fps: { value: [], length: 0, rendering: [] },
        ms: { value: [], length: 0, rendering: [] },
        mem: { value: [], length: 0, rendering: [] }
    }
    const startDate = new Date;
    let statsVariables = { displayMessage, displayBenchmark, statsData, startDate, parentElement };

    // Init global parameters
    // eslint-disable-next-line no-unused-vars
    let dataIterator, newData, dashLineMaterial, lineMaterialTransparent, lineMaterial, fetchIntervals = null;
    const meshes = {};
    const { scene, labelsRenderer, controls, renderer, camera } = initThreeObjects(conf);
    // eslint-disable-next-line no-unused-vars
    controls.addEventListener("change", event => {
        if (conf.keepControls) {
            const position = [controls.object.position.x, controls.object.position.y, controls.object.position.z];
            localStorage.setItem("palindrome:controls-" + conf.panelId, JSON.stringify(position));
        }
        else {
            localStorage.removeItem("palindrome:controls" + conf.panelId);
        }
    });

    const metricParameters = {}, layerParameters = {}, borderThickness = 4, labelDiv = [];

    const palindromeParameters = { conf, metricParameters, layerParameters, parentElement, meshes };
    const threeJSParameters = { renderer, labelsRenderer, scene, camera, stats };
    let [layers_pool, sides_pool, frames_pool] = initVariables(palindromeParameters, threeJSParameters);
    const clock = new THREE.Clock();

    // Calling main function
    run();

    /**
     * Update Palindrome data without re-creating a new instance
     * @param {Object} confUpdate conf object coming from Grafana
     */
    async function updateGrafanaData(confUpdate) {
        conf = confUpdate;
        conf.zPlaneMultilayer = -conf.zPlaneMultilayer;
        if(conf.isRemoteData) {
            newData = await fetchFromDataProviders(conf.data, conf.webWorkersHTTP, new WorkerPool(conf.resourcesLevel));
        }
        else {
            newData = confUpdate.data;
        }
        renderer.setSize(conf.innerWidth, conf.innerHeight);
        labelsRenderer.setSize(conf.innerWidth, conf.innerHeight);
        camera.aspect = conf.innerWidth / conf.innerHeight;
        camera.updateProjectionMatrix();
    }

    /**
     * Rendering loop
     */
    async function render() {
        if (conf.benchmark === 'Active') {
            stats.begin();
        }

        // Parameters needed to render items
        let updateMeshesParams = {
            conf, meshes,
            scene, camera,
            labelDiv, layerParameters,
            dashLineMaterial, lineMaterial,
            newData, dataIterator,
            layers_pool, sides_pool, frames_pool,
            fetchIntervals
        }

        // Rendering with or without web workers
        const renderingMode = conf.webWorkersRendering ? "workers" : "default";
        await updateMeshes(updateMeshesParams, renderingMode);
        try {
            renderer.render(scene, camera);
            const isPalindromeInitComplete = localStorage.getItem("palindrome:isInitComplete") === "true";
            if (conf.webWorkersRendering) {
                if (initCamera && isPalindromeInitComplete && hasGeometry(meshes)) {
                    // Setting camera for web workers
                    cameraViewOptions(meshes, camera, conf);
                    initCamera = false;
                }
            }

            // Animation (optional)
            if (conf.animateFrameDashedLine) {
                animateFrameDashedLine(meshes, clock);
            }
            controls.update();

            // Rendering labels
            labelsRenderer.render(scene, camera);

            // Benchmark related
            if (conf.benchmark === 'Active') {
                collectStatsData(stats, conf.testDuration, statsVariables, conf);
                statsVariables.displayMessage = false;
                displayMessage = false;
                stats.end();
            }

            // Getting frameId and animate
            frameId = requestAnimationFrame(render);
        } catch {
            // Can't render, palindrome is destroyed
        }

    }

    return {
        updateGrafanaData: updateGrafanaData
    }
});

export const devPalindrome = (isGrafana) => {
    return renderDev(isGrafana);
}