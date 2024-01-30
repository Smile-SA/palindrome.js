import { polarTo3DPoint } from './metricsUtils3D';

/**
 * return label data like classicData or jsonData, TableData
 *
 * @param {string} labelName label name
 * @param {string} labelType type of label
 * @param {string} labelValue label value
 * @param {string} labelUnit the unit of label
 */
export var getMetricsLabelsStructureData = function (labelName, labelType, labelValue, labelUnit, metricData, conf, isLayerBehaviored, isLayerResized, isLayerBehaviored) {
    const state = getMetricState(metricData, isLayerBehaviored && isLayerResized);
    state[0] = state[0].replace('_', '');
    let extension = (conf.metricsLabelsStructure.indexOf("State") !== -1) ? (state[1] ? ' - '+ state[0]: ' - close to ' + state[0]) : '';
    if (conf.displayAllMetricsLabels) {
        extension = '';
        labelType = getMetricStateName(metricData, labelValue);
        if (!labelType) {
            labelName ='';
            labelType = '';
            labelUnit = '';
            labelValue ='';
        }
    }
    labelUnit += extension;
    if (!isLayerBehaviored && metricData && labelUnit === '%') {
        //percentage handle
        labelValue = ((labelValue / metricData.max) * 100).toFixed(3);
    }
    let data = '';
    if (conf.metricsLabelsRenderingFormat === "Text") {
        if (conf.metricsLabelsStructure.indexOf("Name") != -1) {
            data += labelName;
        }
        if (conf.metricsLabelsStructure.indexOf("Type") != -1) {
            data += ' - ' + labelType;
        }
        if (conf.metricsLabelsStructure.indexOf("Value") != -1) {
            data += ' : ' + labelValue;
        }
        if (conf.metricsLabelsStructure.indexOf("Unit") != -1 && conf.displayMetricsLabelsUnit) {
            data += ' ' + labelUnit;
        }
    } else if (conf.metricsLabelsRenderingFormat === "Json") {
        data += '{';
        if (conf.metricsLabelsStructure.indexOf("Name") != -1) {
            data += '"Name" : "' + labelName + '", ';
        }
        if (conf.metricsLabelsStructure.indexOf("Type") != -1) {
            data += '"Type" : "' + labelType + '", ';
        }
        if (conf.metricsLabelsStructure.indexOf("Value") != -1) {
            data += '"Value" : "' + labelValue + '", ';
        }
        if (conf.metricsLabelsStructure.indexOf("Unit") != -1 && conf.displayMetricsLabelsUnit) {
            data += '"Units" : "' + labelUnit + '"';
        }
        data += '}'
    } else if (conf.metricsLabelsRenderingFormat === "Table") {
        let tbody = [],
            tHead = [];
        if (conf.metricsLabelsStructure.indexOf("Name") != -1) {
            tbody.push("Name");
            tHead.push(labelName);
        }
        if (conf.metricsLabelsStructure.indexOf("Type") != -1) {
            tbody.push("Type");
            tHead.push(labelType);
        }
        if (conf.metricsLabelsStructure.indexOf("Value") != -1) {
            tbody.push("Value");
            tHead.push(labelValue);
        }
        if (conf.metricsLabelsStructure.indexOf("Unit") != -1 && conf.displayMetricsLabelsUnit) {
            tbody.push("Unit");
            tHead.push(labelUnit);
        }
        data = { 0: tbody, 1: tHead };
    }
    return data;
}


/**
 * Transform a metric value into a 3d point
 *
 * @param {*} metricValue value is required from to data to map on x,y plane
 * @param {*} zPlaneValue adding z plane for 3D respresentation
 * @param conf
 */
export var layerPoints = function (metricValue, zPlaneValue, conf) {
    const planepoints = [];
    for (let i = 0; i < metricValue.length; i++) {
        const points = polarTo3DPoint(i * Math.PI * 2 / metricValue.length, metricValue[i] * conf.metricMagnifier, zPlaneValue);
        planepoints.push(points);
    }
    return planepoints;
}


/**
 * 
 * @param {*} arr the array to be normalized
 * @returns array with normalized values
 */
export var l2Normalize = function (vector) {
    // Calculate the L2 norm (Euclidean norm)
    const l2Norm = Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0));

    // Check if the norm is not zero (to avoid division by zero)
    if (l2Norm !== 0) {
        // Divide each element by the L2 norm to normalize
        return vector.map(value => value / l2Norm);
    } else {
        // If the L2 norm is zero (vector is all zeros), return the original vector
        return vector;
    }
}
 

export const getRepresentationKeys = (metrics, excludedKeys) => {
    const descriptionKeys = new Set(excludedKeys);;
    const representationKeys_ = new Set();

    for (const item of Object.values(metrics)) {
        for (const key of Object.keys(item)) {
            if (!descriptionKeys.has(key)) {
                representationKeys_.add(key);
            }
        }
    }

    const representationKeys = Array.from(representationKeys_);
    return representationKeys;
}

export const computeMetricValue = (metrics, conf, zAxis) => {
    const metricValue = {};
    metricValue.max = layerPoints(Object.values(metrics).map(item => (conf.palindromeSize / getMetricMax(item)) * getMetricMax(item)), zAxis, conf);
    metricValue.med = layerPoints(Object.values(metrics).map(item => (conf.palindromeSize / getMetricMax(item)) * getMetricMed(item)), zAxis, conf);
    metricValue.min = layerPoints(Object.values(metrics).map(item => (conf.palindromeSize / getMetricMax(item)) * getMetricMin(item)), zAxis, conf);
    metricValue.current = layerPoints(Object.values(metrics).map(item => (conf.palindromeSize / getMetricMax(item)) * item.current), zAxis, conf);

    
    return metricValue;
}

export const getMetricState = (value, isMetricChanged=false) => {
    const representationKeys = getRepresentationKeys([value], ['label', 'unit', '_min', '_max', '_med', '_current', '_unit', 'isLayerBehaviored', 'metricDirection', 'isLayerResized']);
    const currentValue = value.isLayerBehaviored && value.isLayerResized ? value._current : value.current;
    
    let distance = Number.POSITIVE_INFINITY;
    let closeTo = '';
    let isEqual = false;
    for (const [key, val] of Object.entries(value)) {
        if (key === 'current') continue;
        if (!isMetricChanged && key.startsWith('_')) continue;
        if (isMetricChanged && !key.startsWith('_')) continue;
        if (representationKeys.includes(key)){
            if (currentValue === val) {
                isEqual = true;
                closeTo = key;
                break;
            }
            let newDistance = Math.abs(currentValue - val);
            if (newDistance < distance) {
                distance = Math.abs(currentValue - val);
                closeTo = key;
            }
        }
    }
    return [closeTo, isEqual];
}

export const cleanMetric = (metric, isMetricChanged) => {
    metric = JSON.parse(JSON.stringify(metric));
    for (const key in metric) {
        if (isMetricChanged) {
            if (!key.startsWith('_')){
                delete metric[key];
            }
        } else {
            if (key.startsWith('_')){
                delete metric[key];
            }
        }
    }
    return metric;
}

export const getMetricMax = (metric, isMetricChanged = false) => Math.max(...(Object.values(metric, isMetricChanged).filter(it => !isNaN(it))));
export const getMetricMin = (metric, isMetricChanged = false) => Math.min(...(Object.values(metric, isMetricChanged).filter(it => !isNaN(it))));
export const getMetricMed = (metric, isMetricChanged = false) => {
    if (metric.med) {
        return metric.med;
    }
    const sum = Object.values(metric, isMetricChanged).filter(it => !isNaN(it)).reduce((acc, cur) => acc + cur);
    const average = sum/Object.values(metric, isMetricChanged).length;
    return average;
}

export const getMetricStateName = (metric, value) => {
    return Object.keys(metric, isMetricChanged).find(key => metric[key] === parseInt(value));
}