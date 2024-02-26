import { polarTo3DPoint } from './metricsUtils3D';

/**
 * return label data like classicData or jsonData, TableData
 *
 * @param {string} labelName label name
 * @param {string} labelType type of label
 * @param {string} labelValue label value
 * @param {string} labelUnit the unit of label
 */
export var getMetricsLabelsStructureData = function (labelName, labelType, labelValue, labelUnit, metricData, conf, isLayerBehaviored, isLayerResized) {
    const state = getMetricState(metricData, isLayerBehaviored && isLayerResized);
    state[0] = state[0]
        .replace('_', '')
        .replace('originalMax', 'max')
        .replace('originalMed', 'med')
        .replace('originalCurrent', 'current')
        .replace('originalMin', 'min');

    let extension = (conf.metricsLabelsStructure.indexOf("State") !== -1) ? (state[1] ? ' - ' + state[0] : ' - close to ' + state[0]) : '';
    if (conf.displayAllMetricsLabels) {
        extension = '';
        labelType = getMetricStateName(metricData, labelValue);
        if (!labelType) {
            labelName = '';
            labelType = '';
            labelUnit = '';
            labelValue = '';
        }
    }
    labelUnit += extension;
    if (labelName === "merged") return "";
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

/**
 * Allows a representation of negative values
 * @param {data} data the use case data
 * @returns the shifted data
 */
export const shiftMetricsToPositive = (data, conf) => {
    let minOfMins = Number.POSITIVE_INFINITY;
    for (const layerData of Object.values(data)) {
        for (const metric of Object.values(layerData.metrics)) {
            if (metric.min < 0) {
                minOfMins = Math.min(minOfMins, metric.min);
            }
        }
    }

    if (minOfMins < 0) {
        const offset = Math.abs(minOfMins);
        // Shift all metrics by the minimum of the minimum values
        for (const layerData of Object.values(data)) {
            for (const metric of Object.values(layerData.metrics)) {
                const { min, med, max, current } = metric;
                metric["originalMin"] = min;
                metric["originalMax"] = max;
                metric["originalMed"] = med;
                metric["originalCurrent"] = current;
                metric["isPositiveShifted"] = true;
                metric.max += offset
                metric.med += offset
                metric.min += offset
                metric.current += offset

                if (metric.originalCurrent < 0 || metric.originalMin < 0 || metric.originalMed < 0 || metric.originalMax < 0) {
                    metric['maxWithoutScale'] = metric.max;
                    if (conf.negativeValuesMagnifier !== 0)
                        metric.max = metric.max * conf.negativeValuesMagnifier;
                }
            }
        }
    }
    return data;
}

/**
 * Change the metrics of the layer to percent, absolute or normalized
 * @param {*} data the use case data
 */
export const changeLayerMetricsBehavior = (data, conf) => {
    for (const layer in data) {
        const layerInfo = data[layer].layer;
        const layerBehavior = layerInfo[`${layer}-layer`]?.layerMetricsUnits;
        const behavior = (layerBehavior === undefined || !['percent', 'absolute', 'normalized'].includes(layerBehavior)) ? conf.layerMetricsUnits : layerBehavior;
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
                let min, med, max, current;
                min = value.min ?? getMetricMin(value);
                max = value.max ?? getMetricMax(value);
                med = value.med ?? getMetricMed(value);
                current = value.current;
                // Computing new layerBehaviored metrics
                const layerBehavioredMin = totalMinValues > 0 ? (min / totalMinValues) * 100 : 0;
                const layerBehavioredMax = totalMaxValues > 0 ? (max / totalMaxValues) * 100 : 0;
                const layerBehavioredMed = totalMedValues > 0 ? (med / totalMedValues) * 100 : 0;
                const layerBehavioredCurrent = totalCurrentValues > 0 ? (current / totalCurrentValues) * 100 : 0;
                data[layer].metrics[key]["_" + getMetricStateName(value, min)] = layerBehavioredMin;
                data[layer].metrics[key]["_" + getMetricStateName(value, max)] = layerBehavioredMax;
                data[layer].metrics[key]["_" + getMetricStateName(value, med)] = layerBehavioredMed;
                data[layer].metrics[key]["_current"] = layerBehavioredCurrent;
                data[layer].metrics[key]["_unit"] = "%";
                data[layer].metrics[key]["isLayerBehaviored"] = true;
            }
        }
        else if (behavior === "normalized") {
            let currents = [];
            let mins = [];
            let meds = [];
            let maxs = [];
            let minLabels = [];
            let medLabels = [];
            let maxLabels = [];
            for (const [_, value] of Object.entries(metrics)) {
                let min, med, max, current;
                min = value.min ?? getMetricMin(value);
                max = value.max ?? getMetricMax(value);
                med = value.med ?? getMetricMed(value);

                current = value.current;
                // Computing new layerBehaviored metrics
                currents.push(current);
                mins.push(min);
                meds.push(med);
                maxs.push(max);

                minLabels.push("_" + getMetricStateName(value, min));
                medLabels.push("_" + getMetricStateName(value, med));
                maxLabels.push("_" + getMetricStateName(value, max));
            }
            const normilizedCurrents = l2Normalize(currents);
            const normalizeArraydMeds = l2Normalize(meds);
            const normalizeArraydMaxs = l2Normalize(maxs);
            const normalizeArraydMins = l2Normalize(mins);
            let i = 0;
            for (const [key, _] of Object.entries(metrics)) {
                data[layer].metrics[key]["_" + minLabels[i]] = normalizeArraydMins[i];
                data[layer].metrics[key]["_" + maxLabels[i]] = normalizeArraydMaxs[i];
                data[layer].metrics[key]["_" + medLabels[i]] = normalizeArraydMeds[i];
                data[layer].metrics[key]["_current"] = normilizedCurrents[i];
                data[layer].metrics[key]["_unit"] = "";
                data[layer].metrics[key]["isLayerBehaviored"] = true;
                i++;
            }
        }
    }
}

/**
 * Compute total metric values of a layer
 * @param {*} metrics the use case metrics
 * @returns the current, med, max, min totals
 */
export var behavioredMetricsTotalValues = function (metrics) {
    const metricsValues = Object.values(metrics);
    return metricsValues.reduce(
        (acc, metric) => {
            let min, med, max, current;
            min = metric.min ?? getMetricMin(metric);
            med = metric.med ?? getMetricMed(metric);
            max = metric.max ?? getMetricMax(metric);
            current = metric.current;
            return (
                {
                    totalCurrentValues: acc.totalCurrentValues + current,
                    totalMinValues: acc.totalMinValues + min,
                    totalMaxValues: acc.totalMaxValues + max,
                    totalMedValues: acc.totalMedValues + med,
                })
        }, { totalCurrentValues: 0, totalMinValues: 0, totalMaxValues: 0, totalMedValues: 0 }
    );
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

export const getMetricState = (value, isMetricChanged = false) => {
    let currentValue = value.isLayerBehaviored && value.isLayerResized ? value._current : value.current;

    let excludedKeys = ['label', 'unit', '_min', '_max', '_med', '_current', '_unit', 'isLayerBehaviored', 'metricDirection', 'isLayerResized', 'isPositiveShifted'];
    if (value.isPositiveShifted) {
        excludedKeys.push('max');
        excludedKeys.push('min');
        excludedKeys.push('current');
        excludedKeys.push('med');
        currentValue = value.originalCurrent;
    }
    const representationKeys = getRepresentationKeys([value], excludedKeys);

    let distance = Number.POSITIVE_INFINITY;
    let closeTo = '';
    let isEqual = false;
    for (const [key, val] of Object.entries(value)) {
        if (key === 'current' || key === 'originalCurrent') continue;
        if (!isMetricChanged && key.startsWith('_')) continue;
        if (isMetricChanged && !key.startsWith('_')) continue;
        if (representationKeys.includes(key)) {
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
        if (metric.isPositiveShifted) {
            if (key.startsWith('original')) {
                delete metric[key];
            }
            if (key === 'maxWithoutScale' && !metric.isPositiveShifted) {
                delete metric.max;
            }
        }
        if (isMetricChanged) {
            if (!key.startsWith('_')) {
                delete metric[key];
            }
        } else {
            if (key.startsWith('_')) {
                delete metric[key];
            }
        }
    }
    return metric;
}

export const getMetricMax = (metric, isMetricChanged = false) => Math.max(...(Object.values(cleanMetric(metric, isMetricChanged)).filter(it => typeof it === 'number')));
export const getMetricMin = (metric, isMetricChanged = false) => Math.min(...(Object.values(cleanMetric(metric, isMetricChanged)).filter(it => typeof it === 'number')));
export const getMetricMed = (metric, isMetricChanged = false) => {
    if (metric.med) {
        return metric.med;
    }
    const sum = Object.values(cleanMetric(metric, isMetricChanged)).filter(it => typeof it === 'number').reduce((acc, cur) => acc + cur);
    const average = sum / Object.values(cleanMetric(metric, isMetricChanged)).length;
    return average;
}

export const getMetricStateName = (metric, value, isMetricChanged = false) => {
    return Object.keys(cleanMetric(metric, isMetricChanged)).find(key => metric[key] === parseInt(value));
}