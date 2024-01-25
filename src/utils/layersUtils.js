import { Triangle, SimpleLine, DasheLine } from '../threeJSUtils/ThreeJSGeometryObjects';
import * as THREE from 'three';
import { createRenderOrderCounter } from './cameraUtils';
import { layerPoints } from './metricsUtils2D';
import { getColorOpacityBasedOnRanges } from './colorsUtils';
import {behavioredMetricsTotalValues } from './labelsUtils2D';
import {l2Normalize} from './metricsUtils2D';

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
                drawTrianglesInALayer(layer + '_mintoMedLayerShape', metricValue.min, metricValue.med, i, metricsNumber, conf.statusColorLow, meshs, scene, rotation, conf, conf.opacity);
                drawTrianglesInALayer(layer + '_medtoMaxLayerShape', metricValue.med, metricValue.max, i, metricsNumber, conf.statusColorHigh, meshs, scene, rotation, conf, conf.opacity);
            } else if (conf.layerDisplayMode === "mixed") {
                drawTrianglesInALayer(layer + '_mintoCurLayerShape', metricValue.min, metricValue.current, i, metricsNumber, conf.statusColorLow, meshs, scene, rotation, conf, conf.opacity);
                drawTrianglesInALayer(layer + '_curtoMaxLayerShape', metricValue.current, metricValue.max, i, metricsNumber, conf.statusColorHigh, meshs, scene, rotation, conf, conf.opacity);
            } else if (conf.layerDisplayMode === "dynamic") {
                drawTrianglesInALayer(layer + '_mintoCurLayerShape', metricValue.min, metricValue.current, i, metricsNumber, color, meshs, scene, conf.opacity, rotation, conf)
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
function drawTrianglesInALayer(layer, planePointOne, planePointTwo, i, planePointLength, color, meshs, scene, rotation, conf, opacity) {
    let opacity = getColorOpacityBasedOnRanges(color, {highColor: conf.statusColorHigh, medColor: conf.statusColorMed, lowColor: conf.statusColorLow}, conf);
    if(conf.colorsBehavior==='dynamic' && conf.transparentDisplay) {
        opacity = color / 100;
    }
    if (meshs['19' + layer + i] || (meshs['_group'+ '19-20' + layer + i] && conf.cameraOptions.indexOf("Flat") !== -1 )) { // if init done
        meshs['19' + layer + i].update(planePointOne[i], planePointTwo[i], planePointTwo[(i + 1) % planePointLength])
        meshs['20' + layer + i].update(planePointTwo[(i + 1) % planePointLength], planePointOne[(i + 1) % planePointLength], planePointOne[(i) % planePointLength])
        if(conf.transparentDisplay){
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

        meshs['19' + layer + i] = new Triangle(planePointOne[i], planePointTwo[i], planePointTwo[(i + 1) % planePointLength], conf.transparentDisplay ? conf.statusColorHigh : color, null, conf.transparentDisplay ? opacity : opacity);
        //scene.add(meshs['19' + layer + i]);
        meshs['20' + layer + i] = new Triangle(planePointTwo[(i + 1) % planePointLength], planePointOne[(i + 1) % planePointLength], planePointOne[(i) % planePointLength], conf.transparentDisplay ? conf.statusColorHigh : color, null, conf.transparentDisplay ? opacity : opacity);
        
        if(conf.cameraOptions.indexOf("Flat") !== -1) {
            meshs['19' + layer + i].renderOrder = meshs['meshRenderingOrder']();
            meshs['20' + layer + i].renderOrder = meshs['meshRenderingOrder']();
            const fullLayer = new THREE.Group();
            fullLayer.add(meshs['19' + layer + i]);
            fullLayer.add(meshs['20' + layer + i]);
            meshs['_group'+ '19-20' + layer + i] = fullLayer;
            scene.add(fullLayer);
            if (rotation.angle){
                meshs['_group'+ '19-20' + layer + i].rotation.y = rotation.angle;
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
    if(layerName.includes('arrow')) {
        from = planePoints[layerMetricIndex];
        to = planePoints[(layerMetricIndex + 1) % planePointLength];
        if (conf.equalizeFrameLinks) {
            to = [from[0] + conf.labelToFrameLinkLength, from[1], from[2]];
        }
    }
    if (meshs['_rangeDasheline' + layerName + layerMetricIndex + layerMetricRangeIndex]) {
        // if init done
        if(layerName.includes('arrow')) {            
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
            if(layerName.includes('arrow')) {
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
            let metricValue = {};
            metricValue.max = layerPoints(Object.values(metrics).map(item => (conf.palindromeSize / item.max) * item.max), zAxis, conf);
            metricValue.med = layerPoints(Object.values(metrics).map(item => (conf.palindromeSize / item.max) * item.med), zAxis, conf);
            metricValue.min = layerPoints(Object.values(metrics).map(item => (conf.palindromeSize / item.max) * item.min), zAxis, conf);
            metricValue.current = layerPoints(Object.values(metrics).map(item => (conf.palindromeSize / item.max) * item.current), zAxis, conf);
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

export const applyLayerMetricsUnits = (data, conf) => {
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
}

/**
 * Keeps the same layer shape without considering current values
 * @param {*} data the use case data structure
 */
export const applyLayersSize = (data) => {
    // let zoomRatioMax = 1;
    for (const layer in data) {
        const layerInfo = data[layer].layer;
        const layerSize = layerInfo[`${layer}-layer`]?.layerSize;
        if (layerSize) {
            const metrics = data[layer].metrics;
            for (const [key, _] of Object.entries(metrics)) {
                data[layer].metrics[key]["_min"] = data[layer].metrics[key].min;
                data[layer].metrics[key]["_max"] = data[layer].metrics[key].max;
                data[layer].metrics[key]["_med"] = data[layer].metrics[key].med;
                data[layer].metrics[key]["_current"] = data[layer].metrics[key].current;
                if (data[layer].metrics[key].unit !== '%') {
                    data[layer].metrics[key]["min"] = data[layer].metrics[key].min * 100 / data[layer].metrics[key].max;
                    data[layer].metrics[key]["med"] = data[layer].metrics[key].med * 100 / data[layer].metrics[key].max;
                    data[layer].metrics[key]["current"] = data[layer].metrics[key].current * 100 / data[layer].metrics[key].max;
                    data[layer].metrics[key]["max"] = data[layer].metrics[key].max * 100 / data[layer].metrics[key].max;
                }
                // dynamic zoop
                // const zoomRatio = Math.floor(data[layer].metrics[key]["current"] / layerSize);
                // if (zoomRatio > zoomRatioMax) {
                //     zoomRatioMax = zoomRatio;                    
                // }
                data[layer].metrics[key]["current"] = layerSize;
                data[layer].metrics[key]["_unit"] = data[layer].metrics[key].unit;
                data[layer].metrics[key]["isLayerResized"] = true;
                data[layer].metrics[key]["isLayerBehaviored"] = true;
            }        
        }
    }

    // dynamic zoom
    // for (const layer in data) {
    //     const layerInfo = data[layer].layer;
    //     const layerSize = layerInfo[`${layer}-layer`]?.layerSize;
    //     if (layerSize) {
    //         const metrics = data[layer].metrics;
    //         for (const [key, _] of Object.entries(metrics)) {
    //             data[layer].metrics[key]["current"] = 2 * layerSize;
    //         }        
    //     }
    // }
}

export const getLayerStatus = (metrics) => {
    let status = [];
    for (const metric of Object.values(metrics)) {
        const current = metric?.isLayerBehaviored && metric?.isLayerResized ? metric._current : metric.current;
        const max = metric?.isLayerBehaviored && metric?.isLayerResized ? metric._max : metric.max;

        const value = metric.metricDirection === 'ascending' ? 1 - current / max : current / max;
        status.push(value);
    }

    const sum = status.reduce((acc, cur) => acc + cur);
    return 100 * sum/status.length;
}