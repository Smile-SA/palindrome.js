import { Triangle, SimpleLine, DasheLine } from '../threeJSUtils/ThreeJSGeometryObjects';
import * as THREE from 'three';
import { createRenderOrderCounter } from './cameraUtils';
import { computeMetricValue, getMetricMax, getMetricMin, getRepresentationKeys, layerPoints } from './metricsUtils2D';
import { getColorOpacityBasedOnRanges } from './colorsUtils';
import { behavioredMetricsTotalValues } from './labelsUtils2D';
import { l2Normalize } from './metricsUtils2D';

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
    let { conf, meshs, scene, rotation } = globalParams;
    if (conf.displayLayers) {
        for (let i = 0; i < metricsNumber; i++) {
            //draws innner layer shapes
            if (conf.layerDisplayMode === "static") {
                drawTrianglesInALayer(layer + '_mintoMedLayerShape', metricValue.min, metricValue.med, i, metricsNumber, conf.statusColorLow, meshs, scene, rotation, conf);
                drawTrianglesInALayer(layer + '_medtoMaxLayerShape', metricValue.med, metricValue.max, i, metricsNumber, conf.statusColorHigh, meshs, scene, rotation, conf);
            } else if (conf.layerDisplayMode === "mixed") {
                drawTrianglesInALayer(layer + '_mintoCurLayerShape', metricValue.min, metricValue.current, i, metricsNumber, conf.statusColorLow, meshs, scene, rotation, conf);
                drawTrianglesInALayer(layer + '_curtoMaxLayerShape', metricValue.current, metricValue.max, i, metricsNumber, conf.statusColorHigh, meshs, scene, rotation, conf);
            } else if (conf.layerDisplayMode === "dynamic") {
                drawTrianglesInALayer(layer + '_mintoCurLayerShape', metricValue.min, metricValue.current, i, metricsNumber, color, meshs, scene, rotation, conf)
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
function drawTrianglesInALayer(layer, planePointOne, planePointTwo, i, planePointLength, color, meshs, scene, rotation, conf) {
    let opacity = getColorOpacityBasedOnRanges(color, { highColor: conf.statusColorHigh, medColor: conf.statusColorMed, lowColor: conf.statusColorLow }, conf);
    if (conf.colorsBehavior === 'dynamic' && conf.transparentDisplay) {
        opacity = color / 100;
    }
    if (meshs['19' + layer + i] || (meshs['_group' + '19-20' + layer + i] && conf.cameraOptions.indexOf("Flat") !== -1)) { // if init done
        meshs['19' + layer + i].update(planePointOne[i], planePointTwo[i], planePointTwo[(i + 1) % planePointLength])
        meshs['20' + layer + i].update(planePointTwo[(i + 1) % planePointLength], planePointOne[(i + 1) % planePointLength], planePointOne[(i) % planePointLength])
        if (conf.transparentDisplay) {
            meshs['19' + layer + i].material.opacity = opacity * 0.5;
            meshs['20' + layer + i].material.opacity = opacity * 0.5;
        } else {
            meshs['19' + layer + i].material.color.set(color);
            meshs['20' + layer + i].material.color.set(color);
        }
    }
    //init objects
    else {
        if (!meshs['meshRenderingOrder'] && conf.cameraOptions.indexOf("Flat") !== -1) {
            meshs['meshRenderingOrder'] = createRenderOrderCounter();
        }

        meshs['19' + layer + i] = new Triangle(planePointOne[i], planePointTwo[i], planePointTwo[(i + 1) % planePointLength], conf.transparentDisplay ? conf.statusColorHigh : color, null, conf.transparentDisplay ? opacity : null);
        //scene.add(meshs['19' + layer + i]);
        meshs['20' + layer + i] = new Triangle(planePointTwo[(i + 1) % planePointLength], planePointOne[(i + 1) % planePointLength], planePointOne[(i) % planePointLength], conf.transparentDisplay ? conf.statusColorHigh : color, null, conf.transparentDisplay ? opacity : null);

        if (conf.cameraOptions.indexOf("Flat") !== -1) {
            meshs['19' + layer + i].renderOrder = meshs['meshRenderingOrder']();
            meshs['20' + layer + i].renderOrder = meshs['meshRenderingOrder']();
            const fullLayer = new THREE.Group();
            fullLayer.add(meshs['19' + layer + i]);
            fullLayer.add(meshs['20' + layer + i]);
            meshs['_group' + '19-20' + layer + i] = fullLayer;
            scene.add(fullLayer);
            if (rotation.angle) {
                meshs['_group' + '19-20' + layer + i].rotation.y = rotation.angle;
            }
        } else {
            scene.add(meshs['19' + layer + i]);
            scene.add(meshs['20' + layer + i]);
        }

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
    let { meshs, scene } = globalParams;
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
export var drawLayerDashLine = function (layerName, planePoints, layerMetricIndex, planePointLength, material, layerMetricRangeIndex, scene, meshs, conf) {

    let from, to;
    if (layerName.includes('arrow')) {
        from = planePoints[layerMetricIndex];
        to = planePoints[(layerMetricIndex + 1) % planePointLength];
        if (conf.equalizeFrameLinks) {
            to = [from[0] + conf.labelToFrameLinkLength, from[1], from[2]];
        }
    }
    if (meshs['_rangeDasheline' + layerName + layerMetricIndex + layerMetricRangeIndex]) {
        // if init done
        if (layerName.includes('arrow')) {
            meshs['_rangeDasheline' + layerName + layerMetricIndex + layerMetricRangeIndex].update(from, to)
        }
        else {
            meshs['_rangeDasheline' + layerName + layerMetricIndex + layerMetricRangeIndex].update(planePoints[layerMetricIndex], planePoints[(layerMetricIndex + 1) % planePointLength])
        }
    } else {
        //init objects
        if (!meshs['meshRenderingOrder'] && conf.cameraOptions.indexOf("Flat") !== -1) {
            meshs['meshRenderingOrder'] = createRenderOrderCounter();
        }
        if (layerName.includes('arrow') && !Object.keys(meshs).some(key => key.includes(layerName)) || !layerName.includes('arrow')) {
            if (layerName.includes('arrow')) {
                meshs['_rangeDasheline' + layerName + layerMetricIndex + layerMetricRangeIndex] = new DasheLine(from, to, material);
            }
            else {
                meshs['_rangeDasheline' + layerName + layerMetricIndex + layerMetricRangeIndex] = new DasheLine(planePoints[layerMetricIndex], planePoints[(layerMetricIndex + 1) % planePointLength], material);
            }
            if (conf.cameraOptions.indexOf("Flat") !== -1) {
                meshs['_rangeDasheline' + layerName + layerMetricIndex + layerMetricRangeIndex].renderOrder = meshs['meshRenderingOrder']();
            }
            scene.add(meshs['_rangeDasheline' + layerName + layerMetricIndex + layerMetricRangeIndex]);
        }
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
            let globalParams = { meshs: meshes, scene };
            drawLayerOutline(layer + '_layerShapesEdges', metricsPosition, i, metricsNumber, lineMaterial, index, globalParams);
        }
    }
}

/**
 * Add rotation field to each layer of data
 * @param {*} data the palindrome data structure 
 * @param {*} conf the palindrome config
 */
export function applyLayerRotationToData(data, conf) {
    if (conf.cameraOptions.indexOf("Flat") !== -1) {
        let angle = 0;
        if (conf.rotatedMetricsAngle !== 0) {
            Object.keys(data).forEach(layer => {
                data[layer].layer[layer + "-layer"]["rotation"] = angle;
                angle += conf.rotatedMetricsAngle * (Math.PI / 180);
            });
        }
    }
}

/**
 * Merge palindrome metrics
 * @param {*} data 
 * @param {*} conf 
 */
export function applyLayerMetricsMergeToData(data, conf) {
    if (conf.zPlaneMultilayer === 0) {
        let zAxis = conf.zPlaneInitial;
        let allMetrics = {};
        for (let layer in data) {
            const metrics = data[layer].metrics;
            let metricValue = computeMetricValue(metrics, conf);
            let counter = 0;
            zAxis -= conf.zPlaneMultilayer;
            for (const metric in metrics) {
                metrics[metric]["position"] = metricValue.current[counter];
                metrics[metric]["layerLabel"] = layer;
                counter++;
            }
            allMetrics = { ...allMetrics, ...metrics };
        }
        const positionMap = {};

        for (const metricName in allMetrics) {
            const metric = allMetrics[metricName];
            const positionKey = metric.position[0] + "-" + metric.position[1];
            if (positionMap[positionKey]) {
                const layerLabel = metric.layerLabel;
                data[layerLabel].metrics[metricName].label = "merged";
            } else {
                positionMap[positionKey] = true;
            }
        }
    }
}

/**
 * Keeps the same layer shape without considering current values
 * @param {*} data the use case data structure
 */
export const applyLayersSize = (data) => {
    for (const layer in data) {
        const layerInfo = data[layer].layer;
        const layerSize = layerInfo[`${layer}-layer`]?.layerSize;
        if (layerSize) {
            const metrics = data[layer].metrics;
            for (const [key, _] of Object.entries(metrics)) {
                const representationKeys = getRepresentationKeys([data[layer].metrics[key]], ['label', 'unit', '_min', '_max', '_med', '_current', '_unit', 'isLayerBehaviored', 'metricDirection', 'isLayerResized', 'isPositiveShifted']);
                for (const representationKey of representationKeys) {
                    data[layer].metrics[key]["_" + representationKey] = data[layer].metrics[key][representationKey];
                    data[layer].metrics[key][representationKey] = data[layer].metrics[key][representationKey] * 100 / getMetricMax(data[layer].metrics[key]);
                }
                data[layer].metrics[key]["current"] = layerSize;
                data[layer].metrics[key]["_unit"] = data[layer].metrics[key].unit;
                data[layer].metrics[key]["isLayerResized"] = true;
                data[layer].metrics[key]["isLayerBehaviored"] = true;
            }
        }
    }
}


export const getLayerStatus = (metrics, layer) => {
    let status = [];
    for (const metric of Object.values(metrics)) {
        let current, min, max;

        if (metric.isPositiveShifted) {
            max = metric.maxWithoutScale ?? metric.originalMax;
            current = metric.originalCurrent;
            min = metric.originalMin;
        }
        else if (metric?.isLayerBehaviored && !metric?.isLayerResized) {
            max = getMetricMax(metric);
            current = metric.current
            min = getMetricMin(metric);
        }
        else {
            max = metric?.isLayerBehaviored && metric?.isLayerResized ? getMetricMax(metric, true) : getMetricMax(metric);
            current = metric?.isLayerBehaviored && metric?.isLayerResized ? metric._current : metric.current;
            min = metric?.isLayerBehaviored && metric?.isLayerResized ? getMetricMin(metric, true) : getMetricMin(metric);

        }

        if (!max) {
            max = getMetricMax(metric);
        }

        let value = (current - min) / (max - min);
        value = metric.metricDirection === 'ascending' ? 1 - value : value;
        status.push(value);
    }

    const sum = status.reduce((acc, cur) => acc + cur);
    return 100 * sum / status.length;
}