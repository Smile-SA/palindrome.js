import {scrappers} from "./scrappersUtils";
import {displayLayersLines, drawLayer} from "./layersUtils";
import {makeSphereContextsStatus} from "./spheresUtils";
import {layerPoints} from "./metricsUtils2D";
import {drawSideStraightLine} from "./sidesUtils";
import {displayFramesAndArrows, setArrowPostion, setRectangleFramePositions} from "./framesUtils";
import {setLabelsPositions, settingLabelFormat} from "./labelsUtils3D";
import {gradient, hexToRgb, layerColorDecidedByLayerStatus, rgbToHex} from "./colorsUtils";

/**
 * Updates meshes, renderingType can be "workers" or "default"
 * @param {object} params
 * @param {string} renderingType
 * @returns {Promise<void>}
 */
export async function updateMeshes(params, renderingType) {
    let {
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
        lowValueGradient,
        highValueGradient,
        bicolorGradient
    } = params;
    let layers_pool, sides_pool, frames_pool;
    if (renderingType === "workers") {
        layers_pool = params.layers_pool;
        sides_pool = params.sides_pool;
        frames_pool = params.frames_pool;
    }
    if (conf.mockupData && !(conf.hasScrapper)) {
        newData = dataIterator.next().value;
    }
    if (conf.hasScrapper) {
        let currentHours = new Date().getHours();
        if (currentHours > scrapperUpdateInitTime) {
            console.info("Getting updates ...")
            scrapperUpdateInitTime = currentHours;
            newData = await scrappers[conf.scrapper]();
        }
    }
    let zAxis = conf.zPlaneInitial, previousMetric = null, previousLayer = null, previousLayerStatus = null,
        metricIndex = 0, layerIndex = 0, zAxisWorker = conf.zPlaneInitial;
    if (renderingType === "workers") {
        const worker = layers_pool.getWorker();
        let keys = Object.keys(newData);
        for (let i = 0; i < keys.length; i++) {
            let layer = keys[i];
            //var worker = layers_pool.getWorker();
            //if there is any worker available
            if (worker != null) {
                if (i !== 0) {
                    zAxisWorker -= conf.zPlaneMultilayer;
                }
                let objectToPost = {
                    subject: 'computations',
                    newData,
                    layer,
                    psize: conf.palindromeSize,
                    zAxisWorker,
                    metricMagnifier: conf.metricMagnifier,
                    zPlaneMultilayer: conf.zPlaneMultilayer,
                    zPlaneInitial: conf.zPlaneInitial,
                    id: i,
                };
                //Post message to worker
                worker.postMessage(objectToPost);
                //Executed each time we recieve a message
                worker.onmessage = function (e) {
                    let layer = e.data.layer;
                    const metricsPositions = [e.data.metricValue.max, e.data.metricValue.med, e.data.metricValue.min];
                    if (e.data.subject === 'computations') {
                        let globalParams = {conf, meshs: meshes, scene};
                         //this is the updated layer metrics
                        const metrics = newData[layer].metrics, layers = newData[layer].layer;
                        //this is the new total of current's
                        const metricCurrentTotal = Object.values(metrics).map(item => item.current).reduce((a, b) => a + b, 0);
                        //this is the new total of max's
                        const metricMaxTotal = Object.values(metrics).map(item => item.max).reduce((a, b) => a + b, 0);
                        //todo : status colors shall map with default colors
                        const layerStatus = ((metricCurrentTotal / metricMaxTotal) * 100);
                        drawLayer(e.data.layer, e.data.metricValue, e.data.metricsNumber, layerColorDecidedByLayerStatus(layerStatus, conf, lowValueGradient, highValueGradient, bicolorGradient), globalParams);
                        if (conf.displayMetricSpheres) {
                            let globalParams = {scene, meshs: meshes, conf, camera, labelDiv, layerParameters};
                            makeSphereContextsStatus(e.data.metricValue, e.data.layer, Object.values(e.data.metrics), globalParams, lowValueGradient, highValueGradient, bicolorGradient);
                        }
                    }
                    let metricsNumber = e.data.metricsNumber;
                    if (conf.displayLayersLines) {
                        //draws and update layers outline
                        displayLayersLines(metricsNumber, metricsPositions, meshes, scene, lineMaterial, layer);
                    }
                    //releaseWorker when it finishes its job
                    layers_pool.releaseWorker(worker);
                }
            }
        }
        //second part declarations
        let previousMetric_sides = null,
            previousLayerStatus_sides = null,
            zAxisWorker_sides = conf.zPlaneInitial;
        let isFirst = true;
        //second part : sides
        //To make Palindrome.js faster and if the machine is powerful enough, we get the sidesWorker (next insturction) inside the next for loop
        const sidesWorker = sides_pool.getWorker();
        for (let layer in newData) {
            //var sidesWorker = sides_pool.getWorker();
            //if there is any worker available
            if (sidesWorker) {
                sidesWorker.onmessage = function (e) {
                    const layerStatus = e.data.layerStatus;
                    if (conf.displaySides === true && conf.cameraOptions.indexOf("Flat") == -1) {
                        let sideDividerOdd = e.data.sideDividerOdd,
                            sideDividerEven = e.data.sideDividerEven,
                            sideSizeOdd = e.data.sideSizeOdd,
                            sideSizeEven = e.data.sideSizeEven,
                            layer = e.data.layer;
                        if (sideDividerOdd && sideDividerEven && sideSizeOdd && sideSizeEven && previousLayerStatus_sides) {
                            drawSideStraightLine(sideDividerEven, sideSizeEven, sideDividerOdd, sideSizeOdd, previousLayerStatus_sides, conf, layerStatus, meshes, layer, lineMaterial, scene, lowValueGradient, highValueGradient, bicolorGradient);
                        }
                    }
                    previousLayerStatus_sides = layerStatus;
                    //releaseWorker when it finishes its job
                    sides_pool.releaseWorker(sidesWorker);
                }
                if (!isFirst) {
                    zAxisWorker_sides -= conf.zPlaneMultilayer;
                }
                let objectToBuildSides = {
                    subject: 'sides',
                    newData,
                    layer,
                    psize: conf.palindromeSize,
                    zAxisWorker: zAxisWorker_sides,
                    metricMagnifier: conf.metricMagnifier,
                    zPlaneMultilayer: conf.zPlaneMultilayer,
                    zPlaneInitial: conf.zPlaneInitial,
                    displayMode: conf.displayMode,
                    previousMetric: previousMetric_sides,
                };
                sidesWorker.postMessage(objectToBuildSides);
                if (isFirst) {
                    isFirst = false;
                    previousMetric_sides = newData[layer].metrics;
                }
                previousMetric_sides = newData[layer].metrics;
            }
        }
        //third part declarations
        let metricIndex_frames = 0;
        let layerIndex_frames = 0;
        let isFirst_frames = true;
        let previousXValue;
        let zAxisWorker_frames = conf.zPlaneInitial;
        let newDataKeysLength = Object.keys(newData).length - 1;

        //making metricIndex_frames variable static to not use a global variable
        function incrementMetricIndex() {
            ++metricIndex_frames;
        }

        //making layerIndex_frames variable static to not use a global variable
        function incrementLayerIndex() {
            ++layerIndex_frames;
        }

        //third part : metrics and frames
        //To make Palindrome.js faster and if the machine is powerful enough, we get the metricsWorker (next insturction) inside the next for loop
        const metricsWorker = frames_pool.getWorker();
        for (let layer in newData) {
            //var metricsWorker = frames_pool.getWorker();
            //if there is any worker available
            if (metricsWorker) {
                metricsWorker.onmessage = function (e) {
                    let xTab = [], yTab = [], zTab = [];
                    const metrics = e.data.metrics;
                    //update metrics label, layers label and their positions
                    let sortedMetricsLabels = scene.children.filter((item) => item.metricIndex === metricIndex_frames),
                        sortedLayersLabels = scene.children.filter((item) => item.layerIndex === layerIndex_frames);
                    settingLabelFormat(sortedMetricsLabels, metrics, debug, conf, labelDiv, xTab, yTab, zTab, e.data.metricValue);
                    // display layer
                    let layersLabels = sortedLayersLabels[sortedLayersLabels.length - 1], resize = 0.5;
                    setLabelsPositions(conf, resize, xTab, yTab, zTab, layersLabels);
                    if (xTab.length > 0) {
                        // frame variable
                        let positions = [], arrowPositions = [], frameName;
                        if (conf.frameShape === 'Dynamic') {
                            // set frame name
                            frameName = e.data.layer + '_Dynamic_Frame';
                            // create dynamic frame positions
                            positions = layerPoints(Object.values(metrics).map(item => (conf.palindromeSize / item.max) * ((item.current * conf.framePadding) / 1.5)), e.data.zAxisWorker, conf);
                            setArrowPostion(conf, positions, arrowPositions, layersLabels);
                        } else if (conf.frameShape === 'Rectangle') {
                            // set frame name
                            frameName = e.data.layer + '_Rectangle_Frame';
                            // create rectangle frame positions
                            setRectangleFramePositions(positions, xTab, yTab, zTab, layersLabels, conf, arrowPositions, resize);
                        }
                        // display frames and arrow
                        displayFramesAndArrows(conf, positions, frameName, dashLineMaterial, lineMaterial, meshes, scene, arrowPositions, e.data.layer);
                    }
                    incrementMetricIndex();
                    incrementLayerIndex();
                    //reset of metrics index and later index
                    if (metricIndex_frames > newDataKeysLength) {
                        metricIndex_frames = 0;
                    }
                    if (layerIndex_frames > newDataKeysLength) {
                        layerIndex_frames = 0;
                    }
                    if (localStorage.getItem("isInitComplete") === "false")
                        localStorage.setItem("isInitComplete", true);

                    //releaseWorker when it finishes its job
                    frames_pool.releaseWorker(metricsWorker);
                }
                let objectToUpdateMetrics = {
                    subject: 'metrics',
                    newData,
                    layer,
                    psize: conf.palindromeSize,
                    zAxisWorker: zAxisWorker_frames,
                    metricMagnifier: conf.metricMagnifier,
                    zPlaneMultilayer: conf.zPlaneMultilayer,
                    zPlaneInitial: conf.zPlaneInitial,
                    displayMode: conf.displayMode,
                };
                zAxisWorker_frames -= conf.zPlaneMultilayer;
                metricsWorker.postMessage(objectToUpdateMetrics);
            }
        }
    } else if (renderingType === "default") {
        for (let layer in newData) {
            //Declaration of metrics variables
            //this is the updated layer metrics
            const metrics = newData[layer].metrics, layers = newData[layer].layer,
                metricsNumber = Object.values(metrics).length;
            //this is the new total of current's
            const metricCurrentTotal = Object.values(metrics).map(item => item.current).reduce((a, b) => a + b, 0);
            //this is the new total of max's
            const metricMaxTotal = Object.values(metrics).map(item => item.max).reduce((a, b) => a + b, 0);
            //todo : status colors shall map with default colors
            const layerStatus = ((metricCurrentTotal / metricMaxTotal) * 100);
            let metricsDivider, metricValue = {};
            metricValue.max = layerPoints(Object.values(metrics).map(item => (conf.palindromeSize / item.max) * item.max), zAxis, conf);
            metricValue.med = layerPoints(Object.values(metrics).map(item => (conf.palindromeSize / item.max) * item.med), zAxis, conf);
            metricValue.min = layerPoints(Object.values(metrics).map(item => (conf.palindromeSize / item.max) * item.min), zAxis, conf);
            metricValue.current = layerPoints(Object.values(metrics).map(item => (conf.palindromeSize / item.max) * item.current), zAxis, conf);
            const metricsPositions = [metricValue.max, metricValue.med, metricValue.min];
            //draws and update layers
            let globalParams = {conf, meshs: meshes, scene};
            
            drawLayer(layer, metricValue, metricsNumber, layerColorDecidedByLayerStatus(layerStatus, conf, lowValueGradient, highValueGradient, bicolorGradient), globalParams);
            //console.log(Object.keys(newData).length)
            if (conf.displayMetricSpheres) {
                let globalParams = {scene, meshs: meshes, conf, camera, labelDiv, layerParameters};
                makeSphereContextsStatus(metricValue, layer, Object.values(metrics), globalParams, lowValueGradient, highValueGradient, bicolorGradient);
            }
            // displayMode
            if (conf.displayMode === "dynamic") {
                metricsDivider = "current";
            } else if (conf.displayMode === "static") {
                metricsDivider = "max";
            } else if (conf.displayMode === "debug") {
            } else {
                break;
            }
            if (conf.displayLayersLines) {
                displayLayersLines(metricsNumber, metricsPositions, meshes, scene, lineMaterial, layer);
            }
            let xTab = [], yTab = [], zTab = [];
            //update metrics label, layers label and their positions
            let sortedMetricsLabels = scene.children.filter((item) => item.metricIndex === metricIndex),
                sortedLayersLabels = scene.children.filter((item) => item.layerIndex === layerIndex);
            settingLabelFormat(sortedMetricsLabels, metrics, debug, conf, labelDiv, xTab, yTab, zTab, metricValue);
            // display layer
            let layersLabels = sortedLayersLabels[sortedLayersLabels.length - 1], resize = 0.5;
            setLabelsPositions(conf, resize, xTab, yTab, zTab, layersLabels);
            // frame variable
            let positions = [], arrowPositions = [], frameName;
            if (conf.frameShape === 'Dynamic') {
                // set frame name
                frameName = layer + '_Dynamic_Frame';
                // create dynamic frame positions
                positions = layerPoints(Object.values(metrics).map(item => (conf.palindromeSize / item.max) * ((item.current * conf.framePadding) / 1.5)), zAxis, conf);
                setArrowPostion(conf, positions, arrowPositions, layersLabels);
            } else if (conf.frameShape === 'Rectangle') {
                // set frame name
                frameName = layer + '_Rectangle_Frame';
                // create rectangle frame positions
                setRectangleFramePositions(positions, xTab, yTab, zTab, layersLabels, conf, arrowPositions, resize);
            }
            // display frames and arrow
            displayFramesAndArrows(conf, positions, frameName, dashLineMaterial, lineMaterial, meshes, scene, arrowPositions, layer);
            if (conf.displaySides === true && conf.cameraOptions.indexOf("Flat") == -1) {
                if (previousMetric !== null) {
                    const previousValueMax = layerPoints(Object.values(previousMetric).map(item => (conf.palindromeSize / item.max) * item[metricsDivider]), zAxis + conf.zPlaneMultilayer, conf);
                    const previousPlaneLength = Object.values(previousMetric).length;
                    //check if actual layer points is higher than previous ones to determine if the sides should be drawn from few to many OR from many to few
                    //for the number of sides
                    const sideDividerOdd = (metricsNumber >= previousPlaneLength) ? previousPlaneLength : metricsNumber;
                    const sideDividerEven = (metricsNumber >= previousPlaneLength) ? metricsNumber : previousPlaneLength;
                    //for the lengths of sides
                    const sideSizeOdd = (metricsNumber >= previousPlaneLength) ? metricValue[metricsDivider] : previousValueMax;
                    const sideSizeEven = (metricsNumber >= previousPlaneLength) ? previousValueMax : metricValue[metricsDivider];
                    drawSideStraightLine(sideDividerEven, sideSizeEven, sideDividerOdd, sideSizeOdd, previousLayerStatus, conf, layerStatus, meshes, layer, lineMaterial, scene, lowValueGradient, highValueGradient, bicolorGradient);
                }
            }
            zAxis -= conf.zPlaneMultilayer;
            previousMetric = metrics;
            previousLayer = layers;
            previousLayerStatus = layerStatus;
            layerIndex++;
            metricIndex++;
        }
    }
}