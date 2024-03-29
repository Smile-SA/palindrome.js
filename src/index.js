import * as THREE from 'three';
import { initThreeObjects } from './threeJSUtils/ThreeJSBasicObjects';
import { dataGenerator } from './threeJSUtils/dataGenerator';
import { Stats, benchmarkCleanUp, collectStatsData } from './utils/benchmarkUtils';
import { createLabels } from './utils/labelsUtils2D';
import { animateFrameDashedLine } from './utils/framesUtils';
import { initVariables } from './utils/initVariables';
import { cameraViewOptions } from './utils/cameraUtils';
import { initMaterials } from './threeJSUtils/threeJSMaterialsInit';
import { setPreviousPalindrome } from "./utils/destructionUtils";
import { createInputUrlModal, loadingText } from "./utils/fetchUtils";
import { updateMeshes } from "./utils/renderingUtils";
import { applyLayerMetricsUnits, applyLayerRotationToData, applyLayersSize } from './utils/layersUtils';
import { changeLayerMetricsBehavior, shiftMetricsToPositive } from './utils/metricsUtils2D';
import { renderDev } from '../dev/dev-index';

/**
 * @param {HTMLElement} parentElement parent element of three's renderer element
 * @param {*} conf model's configuration
 */
export default (function (parentElement, conf) {
    conf.testBothVersions= true;
    conf.testDuration= 1;
    /**
     * Main function
     *
     */
    async function run() {
        let data;
        let loading;
        let isDataReady = true;
        if (!conf?.isRemoteDataSource) {
            data = conf.data;
        } else {
            try {
                // Getting time, so we can update later on the scrapper palindrome
                scrapperUpdateInitTime = new Date();


                // Fetching data
                const url = localStorage.getItem("remote-data-source");
                if (url) {
                    data = await conf.fetchFunction(url);
                    localStorage.removeItem("remote-data-source");
                } else {
                    // Displaying loading text while fetching data
                    loading = loadingText();
                    parentElement.appendChild(loading);
                    data = await conf.fetchFunction();
                    // Removing loading text when data is ready
                    parentElement.removeChild(loading);
                }

                console.log("client response :", data);
            } catch (error) {
                isDataReady = false;
                createInputUrlModal(parentElement);
                document.getElementById("submit-button").onclick = async () => {
                    const input = document.getElementById("remoteDataSourceURL");
                    const url = input.value;
                    let isRequestSuccess;
                    try {
                        data = await conf.fetchFunction(url);
                        localStorage.setItem("remote-data-source", url);
                        isRequestSuccess = true;
                    }
                    catch {
                        document.getElementById("url-error-message").style.visibility = "";
                        input.style.borderBottom = "2px solid red";
                        input.style.color = "red";
                        isRequestSuccess = false;
                    }

                    if (isRequestSuccess) {
                        parentElement.removeChild(document.getElementById("url-input"));
                        if (loading) {
                            parentElement.removeChild(loading);
                        }
                        run();
                    }
                };
                // Output the error if we have a http error occurred
                console.error("client response :", error);
            }
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

    let refreshedData = {};
    //init palindrome parameters
    benchmarkCleanUp();
    let init_camera = true;
    localStorage.setItem("isInitComplete", false);
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
    let dataIterator, newData, dashLineMaterial, lineMaterialTransparent, lineMaterial, scrapperUpdateInitTime;
    const meshes = {};
    const { scene, labelsRenderer, controls, renderer, camera } = initThreeObjects(conf);
    const metricParameters = {}, layerParameters = {}, borderThickness = 4, labelDiv = [];

    const palindromeParameters = { conf, metricParameters, layerParameters, parentElement };
    const threeJSParameters = { renderer, labelsRenderer, scene, camera, stats };
    let [layers_pool, sides_pool, frames_pool, httpRequests_pool] = initVariables(palindromeParameters, threeJSParameters);
    const clock = new THREE.Clock();

    // Calling main function
    run();

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
            scrapperUpdateInitTime,
            newData, dataIterator,
            layers_pool, sides_pool, frames_pool, httpRequests_pool, refreshedData
        }

        // Rendering with or without web workers
        const renderingMode = conf.webWorkersRendering ? "workers" : "default";
        const liveDataInfo = await updateMeshes(updateMeshesParams, renderingMode);
        scrapperUpdateInitTime = liveDataInfo.scrapperUpdateInitTime;
        newData = liveDataInfo.newData;
        httpRequests_pool = liveDataInfo.httpRequests_pool;
        try {
            renderer.render(scene, camera);
            if ((conf.webWorkersRendering) && init_camera && (localStorage.getItem("isInitComplete") === "true")) {

                // Setting camera for web workers
                cameraViewOptions(meshes, camera, conf);
                init_camera = false;
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
});

export const devPalindrome = (isGrafana) => {
    return renderDev(isGrafana);
}