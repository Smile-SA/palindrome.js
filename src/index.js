import * as THREE from 'three';
import {initThreeObjects} from './threeJSUtils/ThreeJSBasicObjects';
import {dataGenerator} from './threeJSUtils/dataGenerator';
import {Stats, collectStatsData} from './utils/benchmarkUtils';
import {createLabels} from './utils/labelsUtils2D';
import {animateFrameDashedLine} from './utils/framesUtils';
import {initVariables} from './utils/initVariables';
import {cameraViewOptions} from './utils/cameraUtils';
import {initMaterials} from './threeJSUtils/threeJSMaterialsInit';
import {setPreviousPalindrome} from "./utils/destructionUtils";
import {loadingText, scrappers} from "./utils/scrappersUtils";
import {updateMeshes} from "./utils/renderingUtils";
import {applyLayerRotationToData} from './utils/layersUtils';
import { gradient } from './utils/colorsUtils';

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
        if (!conf?.hasScrapper) {
            data = conf.data;
        } else {
            try {
                //Getting time, so we can update later on the scrapper palindrome
                scrapperUpdateInitTime = new Date().getHours();
                //Displaying loading text while fetching data
                let loading = loadingText();
                parentElement.appendChild(loading);
                //fetching data
                data = await scrappers[conf.scrapper]();
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
        dataIterator = dataGenerator(data);
        // init materials
        [dashLineMaterial, lineMaterialTransparent, lineMaterial] = initMaterials(conf);
        let globalParams = {conf, labelDiv, metricParameters, scene, layerParameters, borderThickness, meshes};
        createLabels(data, globalParams);
        //rendering palindrome
        await render();
        //saving previous palindrome
        setPreviousPalindrome(renderer, scene, meshes, parentElement, frameId);
        if (!conf.webWorkers) {
            //setting camera for default version
            cameraViewOptions(meshes, camera, conf);
        }
    }

    //init palindrome parameters
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
    const lowValueGradient = gradient(conf.statusColorLow, conf.statusColorMed, conf.colorShadesDepth);
    const highValueGradient = gradient(conf.statusColorMed, conf.statusColorHigh, conf.colorShadesDepth);
    const bicolorGradient = gradient(conf.statusColorLow, conf.statusColorHigh, conf.colorSteps);
    const meshes = {};
    const {scene, labelsRenderer, controls, renderer, camera} = initThreeObjects();
    let metricParameters = {}, layerParameters = {}, borderThickness = 4, labelDiv = [];
    let [layers_pool, sides_pool, frames_pool] = initVariables(conf, metricParameters, layerParameters, parentElement, renderer, labelsRenderer, scene, meshes, camera, stats, statsVariables);
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
            lowValueGradient,
            highValueGradient,
            bicolorGradient
        }
        //rendering with or without web workers
        if (conf.webWorkers) {
            updateMeshes(updateMeshesParams, "workers");
        } else {
            updateMeshes(updateMeshesParams, "default");
        }
        try {
            renderer.render(scene, camera);
            if (conf.webWorkers && init_camera && (localStorage.getItem("isInitComplete") === "true")) {
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