import {polarTo3DPoint} from './metricsUtils3D';

/**
 * return label data like classicData or jsonData, TableData
 *
 * @param {string} labelName label name
 * @param {string} labelType type of label
 * @param {string} labelValue label value
 * @param {string} labelUnit the unit of label
 */
export var getMetricsLabelsStructureData = function (labelName, labelType, labelValue, labelUnit, metricData, conf, isLayerBehaviored) {
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
        data = {0: tbody, 1: tHead};
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
  
  
