import {Triangle, SimpleLine, DasheLine} from '../threeJSUtils/ThreeJSGeometryObjects';

/**
 * drawTrianglesInALayer() caller
 *
 * @param {string} layer the name of the layer
 * @param {*} metricValue contains min, med, max values of the metrics
 * @param {number} metricsNumber number of the metrics in the layer
 * @param {string} color color of the layer
 * @param globalParams
 */
export var drawLayer = function (layer, metricValue, metricsNumber, color, globalParams) {
    let {conf, meshs, scene} = globalParams;
    if (conf.displayLayers) {
        for (let i = 0; i < metricsNumber; i++) {
            //draws innner layer shapes
            if (conf.layerDisplayMode === "static") {
                drawTrianglesInALayer(layer + '_mintoMedLayerShape', metricValue.min, metricValue.med, i, metricsNumber, conf.statusColorLow, meshs, scene);
                drawTrianglesInALayer(layer + '_medtoMaxLayerShape', metricValue.med, metricValue.max, i, metricsNumber, conf.statusColorHigh, meshs, scene);
            } else if (conf.layerDisplayMode === "mixed") {
                drawTrianglesInALayer(layer + '_mintoCurLayerShape', metricValue.min, metricValue.current, i, metricsNumber, conf.statusColorLow, meshs, scene);
                drawTrianglesInALayer(layer + '_curtoMaxLayerShape', metricValue.current, metricValue.max, i, metricsNumber, conf.statusColorHigh, meshs, scene);
            } else if (conf.layerDisplayMode === "dynamic") {
                drawTrianglesInALayer(layer + '_mintoCurLayerShape', metricValue.min, metricValue.current, i, metricsNumber, color, meshs, scene);

            }
        }
    }
}

/**
 * Draw the triangles in a layer
 *
 * @param {string} layer layerId
 * @param {number[]} planePointOne
 * @param {number[]} planePointTwo
 * @param {number} i layer index in the plane
 * @param {number} planePointLength metric count in the layer
 * @param {string} color material color
 * @param meshs
 * @param scene
 */
function drawTrianglesInALayer(layer, planePointOne, planePointTwo, i, planePointLength, color, meshs, scene) {
    if (meshs['19' + layer + i]) { // if init done
        meshs['19' + layer + i].update(planePointOne[i], planePointTwo[i], planePointTwo[(i + 1) % planePointLength])
        meshs['20' + layer + i].update(planePointTwo[(i + 1) % planePointLength], planePointOne[(i + 1) % planePointLength], planePointOne[(i) % planePointLength])
        meshs['19' + layer + i].material.color.set(color);
        meshs['20' + layer + i].material.color.set(color);
    }
    //init objects
    else {
        meshs['19' + layer + i] = new Triangle(planePointOne[i], planePointTwo[i], planePointTwo[(i + 1) % planePointLength], color, null, null);
        scene.add(meshs['19' + layer + i]);
        meshs['20' + layer + i] = new Triangle(planePointTwo[(i + 1) % planePointLength], planePointOne[(i + 1) % planePointLength], planePointOne[(i) % planePointLength], color, null, null);
        scene.add(meshs['20' + layer + i]);
    }
}


/**
 * Draw a line in a plane (layer)
 *
 * @param {string} layerName layer name
 * @param {number[]} planePoints coordinates of the line
 * @param {number} layerMetricIndex index of the line in the plane
 * @param {number} planePointLength number of points in the plane
 * @param {THREE.Material} material material to apply to the line
 * @param {number} layerMetricRangeIndex index of layer metric range
 * @param globalParams
 */
export var drawLayerOutline = function (layerName, planePoints, layerMetricIndex, planePointLength, material, layerMetricRangeIndex, globalParams) {
    let {meshs, scene} = globalParams;
    if (meshs['_rangeOutline' + layerName + layerMetricIndex + layerMetricRangeIndex]) {
        // if init done
        meshs['_rangeOutline' + layerName + layerMetricIndex + layerMetricRangeIndex].update(planePoints[layerMetricIndex], planePoints[(layerMetricIndex + 1) % planePointLength])
    } else {
        //init objects
        meshs['_rangeOutline' + layerName + layerMetricIndex + layerMetricRangeIndex] = new SimpleLine(planePoints[layerMetricIndex], planePoints[(layerMetricIndex + 1) % planePointLength], material);
        scene.add(meshs['_rangeOutline' + layerName + layerMetricIndex + layerMetricRangeIndex]);
    }
}


/**
 * Draw a dash line in a plane (layer)
 *
 * @param {string} layerName layer name
 * @param {number[]} planePoints coordinates of the line
 * @param {number} layerMetricIndex index of the line in the plane
 * @param {number} planePointLength number of points in the plane
 * @param {THREE.Material} material material to apply to the line
 * @param {number} layerMetricRangeIndex index of layer metric range
 * @param scene
 * @param meshs
 */
export var drawLayerDashLine = function (layerName, planePoints, layerMetricIndex, planePointLength, material, layerMetricRangeIndex, scene, meshs) {

    if (meshs['_rangeDasheline' + layerName + layerMetricIndex + layerMetricRangeIndex]) {
        // if init done

        meshs['_rangeDasheline' + layerName + layerMetricIndex + layerMetricRangeIndex].update(planePoints[layerMetricIndex], planePoints[(layerMetricIndex + 1) % planePointLength])
    } else {
        //init objects
        meshs['_rangeDasheline' + layerName + layerMetricIndex + layerMetricRangeIndex] = new DasheLine(planePoints[layerMetricIndex], planePoints[(layerMetricIndex + 1) % planePointLength], material);

        scene.add(meshs['_rangeDasheline' + layerName + layerMetricIndex + layerMetricRangeIndex]);
    }
}

/**
 * displays layer lines
 * @param metricsNumber
 * @param metricsPositions
 * @param meshes
 * @param scene
 * @param lineMaterial
 * @param layer
 */
export function displayLayersLines(metricsNumber, metricsPositions, meshes, scene, lineMaterial, layer) {
    for (let i = 0; i < metricsNumber; i++) {
        for (let [index, metricsPosition] of metricsPositions.entries()) {
            //draws outside lines
            let globalParams = {meshs: meshes, scene};
            drawLayerOutline(layer + '_layerShapesEdges', metricsPosition, i, metricsNumber, lineMaterial, index, globalParams);
        }
    }
}