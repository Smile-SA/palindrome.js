import * as THREE from 'three';
import {initThreeObjects} from './threeJSUtils/ThreeJSBasicObjects';
import {dataGenerator} from './threeJSUtils/dataGenerator';
import {Stats, benchmarkCleanUp, collectStatsData} from './utils/benchmarkUtils';
import {createLabels} from './utils/labelsUtils2D';
import {animateFrameDashedLine} from './utils/framesUtils';
import {initVariables} from './utils/initVariables';
import {cameraViewOptions} from './utils/cameraUtils';
import {initMaterials} from './threeJSUtils/threeJSMaterialsInit';
import {setPreviousPalindrome} from "./utils/destructionUtils";
import {loadingText} from "./utils/fetchUtils";
import {updateMeshes} from "./utils/renderingUtils";
import {behavioredMetricsTotalValues } from './utils/labelsUtils2D';
import {l2Normalize} from './utils/metricsUtils2D';
import { renderDev } from '../dev/dev-index';

/**
 * @param {HTMLElement} parentElement parent element of three's renderer element
 * @param {*} conf model's configuration
 */
export default (function (parentElement, conf) {
    /**
     * Main function
     *
     * @param {*} src source of the configuration, defaults to conf.data
     */
    async function run(src) {
        let data;
        if (!conf?.isRemoteDataSource) {
            data = conf.data;
        } else {
            try {
                //Getting time, so we can update later on the scrapper palindrome
                scrapperUpdateInitTime = new Date();
                //Displaying loading text while fetching data
                let loading = loadingText();
                parentElement.appendChild(loading);
                //fetching data
                data = await conf.fetchFunction();
                conf.data = data;
                //removing loading text when data is ready
                parentElement.removeChild(loading);
                console.log("client response :", data);
            } catch (error) {
                //output the error if we have a http error occurred
                console.error("client response :", error);
            }
        }
        applyLayerRotationToData(data, conf);
        newData = data;

        // Layer constraints behavior for percent
        for (const layer in data) {
            const layerInfo = data[layer].layer;
            const layerBehavior = layerInfo[`${layer}-layer`]?.layerMetricsUnits;
            const behavior = ( layerBehavior === undefined || !['percent', 'absolute', 'normalized'].includes(layerBehavior)) ? conf.layerMetricsUnits : layerBehavior;
            const metrics = data[layer].metrics;
            if (behavior === "percent") {

                // Getting total values for current, min, med, and max
                const {
                    totalCurrentValues,
                    totalMinValues,
                    totalMaxValues,
                    totalMedValues,
                } = behavioredMetricsTotalValues(metrics);
          
                for (const [key, value] of Object.entries(metrics)) {
                    const { current, min, med, max } = value;

                    // Computing new layerBehaviored metrics
                    const layerBehavioredMin = totalMinValues > 0 ? (min / totalMinValues) * 100 : 0;
                    const layerBehavioredMax = totalMaxValues > 0 ? (max / totalMaxValues) * 100 : 0;
                    const layerBehavioredMed = totalMedValues > 0 ? (med / totalMedValues) * 100 : 0;
                    const layerBehavioredCurrent = totalCurrentValues > 0 ? (current / totalCurrentValues) * 100 : 0;

                    data[layer].metrics[key]["_min"] = layerBehavioredMin;
                    data[layer].metrics[key]["_max"] = layerBehavioredMax;
                    data[layer].metrics[key]["_med"] = layerBehavioredMed;
                    data[layer].metrics[key]["_current"] = layerBehavioredCurrent;
                    data[layer].metrics[key]["_unit"] = "%";
                    data[layer].metrics[key]["isLayerBehaviored"] = true;
                }
            }
            else if(behavior === "normalized") {
                let currents = [];
                let mins = [];
                let meds = [];
                let maxs = [];
                for (const [_, value] of Object.entries(metrics)) {
                    const { current, min, med, max } = value;
                    // Computing new layerBehaviored metrics
                    currents.push(current);
                    mins.push(min);
                    meds.push(med);
                    maxs.push(max);
                }
                const normilizedCurrents = l2Normalize(currents);
                const normalizeArraydMeds = l2Normalize(meds);
                const normalizeArraydMaxs = l2Normalize(maxs);
                const normalizeArraydMins = l2Normalize(mins);
                let i = 0;
                for (const [key, _] of Object.entries(metrics)) {
                    data[layer].metrics[key]["_min"] = normalizeArraydMins[i];
                    data[layer].metrics[key]["_max"] = normalizeArraydMaxs[i];
                    data[layer].metrics[key]["_med"] = normalizeArraydMeds[i];
                    data[layer].metrics[key]["_current"] = normilizedCurrents[i];
                    data[layer].metrics[key]["_unit"] = "";
                    data[layer].metrics[key]["isLayerBehaviored"] = true;
                    i++;
                }
            }
        }          

        dataIterator = dataGenerator(data);

        // init materials
        [dashLineMaterial, lineMaterialTransparent, lineMaterial] = initMaterials(conf);
        let globalParams = {conf, labelDiv, metricParameters, scene, layerParameters, borderThickness, meshes};
        createLabels(data, globalParams);
        //rendering palindrome
        await render();
        //saving previous palindrome
        setPreviousPalindrome(renderer, scene, meshes, parentElement, frameId);
        if (!(conf.webWorkersRendering || conf.liveData)) {
            //setting camera for default version
            cameraViewOptions(meshes, camera, conf);
        }
    }

    let refreshedData = {};
    //init palindrome parameters
    benchmarkCleanUp();
    let init_camera = true;
    localStorage.setItem("isInitComplete", false);
    let frameId;
    //init benchmark stats parameters
    let stats = new Stats();
    let displayMessage = true;
    let displayBenchmark = true;
    let statsData = {
        fps: {value: [], length: 0, rendering: []},
        ms: {value: [], length: 0, rendering: []},
        mem: {value: [], length: 0, rendering: []}
    }
    const startDate = new Date;
    let statsVariables = {displayMessage, displayBenchmark, statsData, startDate, parentElement};
    //init global parameters
    let debug = false;
    let dataIterator, newData, dashLineMaterial, lineMaterialTransparent, lineMaterial, scrapperUpdateInitTime;
    const lowValueGradient = gradient(conf.statusColorLow, conf.statusColorMed, conf.colorsDynamicDepth);
    const highValueGradient = gradient(conf.statusColorMed, conf.statusColorHigh, conf.colorsDynamicDepth);
    const bicolorGradient = gradient(conf.statusColorLow, conf.statusColorHigh, conf.colorsDynamicDepth);
    const meshes = {};
    const {scene, labelsRenderer, controls, renderer, camera} = initThreeObjects();
    let metricParameters = {}, layerParameters = {}, borderThickness = 4, labelDiv = [];
    let [layers_pool, sides_pool, frames_pool, httpRequests_pool] = initVariables(conf, metricParameters, layerParameters, parentElement, renderer, labelsRenderer, scene, meshes, camera, stats, statsVariables);
    const clock = new THREE.Clock();
    const fileContent = new Request("default-data.json");
    //calling main function
    run(fileContent);

    /**
     * Rendering loop
     */
    async function render() {
        if (conf.benchmark === 'Active') {
            stats.begin();
        }
        //parameters needed to render items
        let updateMeshesParams = {
            conf,
            meshes,
            scene,
            camera,
            labelDiv,
            layerParameters,
            dashLineMaterial,
            lineMaterial,
            debug,
            scrapperUpdateInitTime,
            newData,
            dataIterator,
            layers_pool,
            sides_pool,
            frames_pool,
            httpRequests_pool,
            refreshedData,
        }
        //rendering with or without web workers
        const renderingMode = conf.webWorkersRendering ? "workers" : "default";
        const liveDataInfo = await updateMeshes(updateMeshesParams, renderingMode);
        scrapperUpdateInitTime = liveDataInfo.scrapperUpdateInitTime;
        newData = liveDataInfo.newData;
        httpRequests_pool = liveDataInfo.httpRequests_pool;
        try {
            renderer.render(scene, camera);
            if ((conf.webWorkersRendering) && init_camera && (localStorage.getItem("isInitComplete") === "true")) {
                //setting camera for web workers
                cameraViewOptions(meshes, camera, conf);
                init_camera = false;
            }
            //animation (optional)
            if (conf.animateFrameDashedLine) {
                animateFrameDashedLine(meshes, clock);
            }
            controls.update();
            //rendering labels
            labelsRenderer.render(scene, camera);
            //benchmark related
            if (conf.benchmark === 'Active') {
                collectStatsData(stats, conf.testDuration, statsVariables, conf);
                statsVariables.displayMessage = false;
                displayMessage = false;
                stats.end();
            }
            //getting frameId and animate
            frameId = requestAnimationFrame(render);
        } catch {
            //can't render, palindrome is destroyed
        }

    }
});

export const devPalindrome = () => {
    return renderDev();
}