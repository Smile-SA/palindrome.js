import { applyLayerMetricsMergeToData, applyLayerRotationToData, displayLayersLines, drawLayer, getLayerStatus } from "./layersUtils";
import { makeSphereContextsStatus } from "./spheresUtils";
import { computeMetricValue, getMetricMax, layerPoints } from "./metricsUtils2D";
import { drawSideStraightLine } from "./sidesUtils";
import { displayFramesAndArrows, setArrowPostion, setRectangleFramePositions } from "./framesUtils";
import { setLabelsPositions, settingLabelFormat } from "./labelsUtils3D";
import { layerColorDecidedByLayerStatus } from "./colorsUtils";

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
        scrapperUpdateInitTime,
        newData,
        dataIterator,
        refreshedData,
    } = params;
    let layers_pool, sides_pool, frames_pool, httpRequests_pool;
    if (renderingType === "workers") {
        layers_pool = params.layers_pool;
        sides_pool = params.sides_pool;
        frames_pool = params.frames_pool;
    }

    httpRequests_pool = params.httpRequests_pool;
    if (conf.isRemoteDataSource && !conf.mockupData && conf.liveData) {
        const currentTime = new Date();
        const timeDifferenceInMilliseconds = currentTime - (refreshedData["scrapperUpdateInitTime"] ? refreshedData["scrapperUpdateInitTime"] : scrapperUpdateInitTime);
        const remoteDataFetchPace = conf.remoteDataFetchPace; // in ms
        if (timeDifferenceInMilliseconds >= remoteDataFetchPace) {
            const url = localStorage.getItem("remote-data-source");
            // Getting updates...
            if (conf.webWorkersHTTP) { // Making http requests using web workers
                const worker = httpRequests_pool.getWorker();

                worker.onmessage = function (e) {
                    newData = e.data.newData;
                    refreshedData["newData"] = e.data.newData;
                    refreshedData["scrapperUpdateInitTime"] = new Date();
                }

                httpRequests_pool.releaseWorker(worker);
                worker.postMessage({
                    subject: "httpRequests",
                    fn: conf.fetchFunction.toString()
                });
            }
            else { // Making http requests using main thread
                if (url) {
                    data = await conf.fetchFunction(url);
                    localStorage.removeItem("remote-data-source");
                }
                else {
                    newData = await conf.fetchFunction();
                }
                scrapperUpdateInitTime = new Date();
            }
        }
    }

    if (refreshedData["newData"]) {
        newData = refreshedData["newData"];
    }

    if (conf.mockupData && !conf.liveData) {
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
    let zAxis = conf.zPlaneInitial, previousMetric = null, previousLayer = null, previousLayerStatus = null, previousLayerColor = null,
        metricIndex = 0, layerIndex = 0, zAxisWorker = conf.zPlaneInitial;
    if (conf.cameraOptions.indexOf("Flat") !== -1) {
        conf.displaySides = false;
    }
    applyLayerRotationToData(newData, conf);
    if (conf.mergedMetricsNames) {
        applyLayerMetricsMergeToData(newData, conf);
    }
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
                        let rotation = {};
                        rotation["layer"] = e.data.layer;
                        rotation["angle"] = newData[e.data.layer].layer[e.data.layer + "-layer"]?.rotation;
                        let globalParams = { conf, meshs: meshes, scene, rotation };
                        drawLayer(e.data.layer, e.data.metricValue, e.data.metricsNumber, (conf.colorsBehavior === 'dynamic' && conf.transparentDisplay) ? e.data.layerStatus : layerColorDecidedByLayerStatus(e.data.layerStatus, conf, e.data.layer, newData), globalParams);
                        if (conf.displayMetricSpheres) {
                            let globalParams = { scene, meshs: meshes, conf, camera, labelDiv, layerParameters, rotation };
                            makeSphereContextsStatus(e.data.metricValue, e.data.layer, Object.values(e.data.metrics), globalParams, newData);
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
            previousLayerColor_sides = null,
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
                    const layerColor = layerColorDecidedByLayerStatus(e.data.layerStatus, conf, e.data.layer, newData);

                    if (conf.displaySides === true && conf.cameraOptions.indexOf("Flat") == -1) {
                        let sideDividerOdd = e.data.sideDividerOdd,
                            sideDividerEven = e.data.sideDividerEven,
                            sideSizeOdd = e.data.sideSizeOdd,
                            sideSizeEven = e.data.sideSizeEven,
                            layer = e.data.layer;
                        if (sideDividerOdd && sideDividerEven && sideSizeOdd && sideSizeEven && previousLayerStatus_sides) {
                            const sideDividers = { sideDividerEven, sideDividerOdd };
                            const sideSizes = { sideSizeOdd, sideSizeEven };
                            const layerStatuses = { layerStatus, previousLayerStatus: previousLayerStatus_sides };
                            const layersColors = { layerColor, previousLayerColor: previousLayerColor_sides };
                            drawSideStraightLine(sideDividers, sideSizes, layerStatuses, conf, meshes, layer, lineMaterial, scene, layersColors, newData);
                        }
                    }
                    previousLayerStatus_sides = layerStatus;
                    previousLayerColor_sides = layerColor;
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
                    let sortedLayersLabels, sortedMetricsLabels;
                    if (conf.cameraOptions.indexOf("Flat") !== -1) {
                        sortedMetricsLabels = meshes["_group" + e.data.layer + "_metrics_labels"]?.children.filter((item) => item.metricIndex === metricIndex_frames) || [];
                        sortedLayersLabels = scene.children.filter((item) => item.layerIndex === layerIndex_frames);
                    } else {
                        sortedMetricsLabels = scene.children.filter((item) => item.metricIndex === metricIndex_frames);
                        sortedLayersLabels = scene.children.filter((item) => item.layerIndex === layerIndex_frames);
                    }
                    settingLabelFormat(sortedMetricsLabels, metrics, conf, labelDiv, xTab, yTab, zTab, e.data.metricValue);
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

            let layerStatus = getLayerStatus(metrics, layer);
            let metricsDivider, metricValue = {};
            metricValue = computeMetricValue(metrics, conf, zAxis);
            const metricsPositions = [metricValue.max, metricValue.med, metricValue.min];
            //draws and update layers
            let rotation = {};
            rotation["layer"] = layer;
            rotation["angle"] = newData[layer].layer[layer + "-layer"]?.rotation;
            let globalParams = { conf, meshs: meshes, scene, rotation };
            const layerColor = layerColorDecidedByLayerStatus(layerStatus, conf, layer, newData);
            drawLayer(layer, metricValue, metricsNumber, (conf.colorsBehavior === 'dynamic' && conf.transparentDisplay) ? layerStatus : layerColor, globalParams);
            //console.log(Object.keys(newData).length)
            if (conf.displayMetricSpheres) {
                let globalParams = { scene, meshs: meshes, conf, camera, labelDiv, layerParameters, rotation };
                makeSphereContextsStatus(metricValue, layer, Object.values(metrics), globalParams, newData);
            }
            // displayMode
            if (conf.displayMode === "dynamic") {
                metricsDivider = "current";
            } else if (conf.displayMode === "static") {
                metricsDivider = "max";
            } else {
                break;
            }
            if (conf.displayLayersLines) {
                displayLayersLines(metricsNumber, metricsPositions, meshes, scene, lineMaterial, layer);
            }
            let xTab = [], yTab = [], zTab = [];
            //update metrics label, layers label and their positions
            let sortedLayersLabels, sortedMetricsLabels;
            if (conf.cameraOptions.indexOf("Flat") !== -1) {
                sortedMetricsLabels = meshes["_group" + layer + "_metrics_labels"]?.children.filter((item) => item.metricIndex === metricIndex) || [];
                sortedLayersLabels = scene.children.filter((item) => item.layerIndex === layerIndex);
            } else {
                sortedMetricsLabels = scene.children.filter((item) => item.metricIndex === metricIndex);
                sortedLayersLabels = scene.children.filter((item) => item.layerIndex === layerIndex);
            }
            settingLabelFormat(sortedMetricsLabels, metrics, conf, labelDiv, xTab, yTab, zTab, metricValue);
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
                setRectangleFramePositions(positions, xTab, yTab, zTab, layersLabels, conf, arrowPositions, resize, layerIndex);
            }
            // display frames and arrow
            displayFramesAndArrows(conf, positions, frameName, dashLineMaterial, lineMaterial, meshes, scene, arrowPositions, layer);
            if (conf.displaySides === true && conf.cameraOptions.indexOf("Flat") == -1) {
                if (previousMetric !== null) {
                    const previousValueMax = layerPoints(Object.values(previousMetric).map(item => (conf.palindromeSize / getMetricMax(item)) * item[metricsDivider]), zAxis + conf.zPlaneMultilayer, conf);
                    const previousPlaneLength = Object.values(previousMetric).length;
                    //check if actual layer points is higher than previous ones to determine if the sides should be drawn from few to many OR from many to few
                    //for the number of sides
                    const sideDividerOdd = (metricsNumber >= previousPlaneLength) ? previousPlaneLength : metricsNumber;
                    const sideDividerEven = (metricsNumber >= previousPlaneLength) ? metricsNumber : previousPlaneLength;
                    //for the lengths of sides
                    const sideSizeOdd = (metricsNumber >= previousPlaneLength) ? metricValue[metricsDivider] : previousValueMax;
                    const sideSizeEven = (metricsNumber >= previousPlaneLength) ? previousValueMax : metricValue[metricsDivider];
                    const sideDividers = { sideDividerEven, sideDividerOdd };
                    const sideSizes = { sideSizeOdd, sideSizeEven };
                    const layerStatuses = { layerStatus, previousLayerStatus };
                    const layersColors = { layerColor, previousLayerColor };
                    drawSideStraightLine(sideDividers, sideSizes, layerStatuses, conf, meshes, layer, lineMaterial, scene, layersColors, newData);
                }
            }
            zAxis -= conf.zPlaneMultilayer;
            previousMetric = metrics;
            previousLayer = layers;
            previousLayerStatus = layerStatus;
            previousLayerColor = layerColor;
            layerIndex++;
            metricIndex++;
        }
    }

    return { scrapperUpdateInitTime, newData, httpRequests_pool };
}