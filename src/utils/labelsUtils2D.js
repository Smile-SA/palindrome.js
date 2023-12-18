import {getMetricsLabelsStructureData} from './metricsUtils2D';
import {CSS2DObject} from "three/examples/jsm/renderers/CSS2DRenderer";
import {create3DMetricsLabels, create3DLayersLabels} from './labelsUtils3D';
import * as THREE from 'three';
import {createRenderOrderCounter} from './cameraUtils';

/**
 * Return a text in html tag p
 *
 * @param {string} labelText label text
 * @param {boolean} cardColor label card color
 * @param {boolean} cardBackground label card color
 * @param {*} parameters control label parameters
 */
export var createHtmlText = function (labelText, cardColor, cardBackground, parameters) {
    let p = document.createElement('p');
    p.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
    p.setAttribute("id", "htmlLayerLabel");
    p.style.color = parameters['labelColor'];
    p.style.fontSize = parameters['labelSize'] + 'px';
    p.style.fontFamily = parameters['characterFont'];
    p.style.fontWeight = parameters["labelBold"];
    p.style.fontStyle = parameters["labelItalic"];
    const padding = 5;
    p.style.padding = padding + 'px';
    localStorage.setItem("htmlLayerLabelPadding", padding);
    if (cardColor) {
        p.style.border = ' 2px ' + parameters['labelColor'] + ' dashed';
    }
    if (cardBackground) {
        p.style.background = parameters["labelBackground"];
    }
    p.innerText = labelText;
    return p;
}

/**
 * Return a canvas element
 *
 * @param {string} labelName label name
 * @param {string} labelText label text
 * @param {*} parameters control label parameters
 * @param borderThickness thickness of the border
 */
export var createLabelCanvas = function (labelName, labelText, parameters, borderThickness) {
    //prepare canvas
    let labelCanvas = document.createElement('canvas');
    labelCanvas.setAttribute("className", labelName);
    labelCanvas.setAttribute("width", 1200 + " px");
    labelCanvas.setAttribute("height", 600 + " px");

    //prepare context
    let labelContext = labelCanvas.getContext('2d');
    labelContext.font = parameters["labelItalic"] + " " + parameters["labelBold"] + " " + parameters['labelSize'] + "px " + parameters['characterFont'];
    labelContext.lineWidth = borderThickness;
    labelContext.textAlign = 'center';
    labelContext.fillStyle = parameters['labelColor'];

    //reassign values (design pattern)
    let w = labelCanvas.width,
        h = labelCanvas.height;

    addTextBackground(labelContext, borderThickness / 2, borderThickness / 2, w + (borderThickness * parameters['labelSize']), h / 2 + (borderThickness * parameters['labelSize']), 'rgba(14,167,83,0)');
    addMultiLineText(labelText, w / 2, h / 2, parameters['labelSize'], w, labelContext);
    return labelCanvas;
}


/**
 * To add a background color to a text field
 *
 * @param  {*} context canvas get 2D contexté
 * @param  {number} x  x position
 * @param  {number} y y position
 * @param  {number} width  background width
 * @param  {number} height  background height
 * @param  {string} color background color
 */
function addTextBackground(context, x, y, width, height, color) {
    context.save();
    context.textBaseline = 'top';
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
    context.restore();
}


/**
 * Managing HTML5 text on multiple lines
 *
 *
 * @param  {string} text       label name
 * @param  {number} x          x position
 * @param  {number} y          y position
 * @param  {number} lineHeight row height
 * @param  {number} fitWidth   text width before line break
 * @param {*} oContext   canvas get 2D context
 */
export var addMultiLineText = function (text, x, y, lineHeight, fitWidth, oContext) {
    let draw = x != null && y != null;
    // for the management of manual line breaks
    text = text.replace(/(\r\n|\n\r|\r|\n)/g, "\n");
    let sections = text.split("\n");
    let str, wordWidth, currentLine = 0,
        maxHeight, maxWidth = 0;
    let printNextLine = function (str) {
        if (draw) {
            oContext.fillText(str, x, y + (lineHeight * currentLine));
            currentLine++;
            wordWidth = oContext.measureText(str).width;
        }
        if (wordWidth > maxWidth) {
            maxWidth = wordWidth;
        }
    };

    for (let i = 0; i < sections.length; i++) {
        let words = sections[i].split(' ');
        let index = 1;
        while (words.length > 0 && index <= words.length) {
            str = words.slice(0, index).join(' ');
            wordWidth = oContext.measureText(str).width;
            if (wordWidth > fitWidth) {
                if (index === 1) {
                    // Falls to this case if the first word in words[] is bigger than fitWidth
                    // so we print this word on its own line; index = 2 because slice is
                    str = words.slice(0, 1).join(' ');
                    words = words.splice(1);
                } else {
                    str = words.slice(0, index - 1).join(' ');
                    words = words.splice(index - 1);
                }

                printNextLine(str);

                index = 1;
            } else
                index++;
        }

        // The left over words on the last line
        if (index > 0)
            printNextLine(words.join(' '));
    }

    maxHeight = lineHeight * (currentLine);
    if (!draw) {
        return {
            height: maxHeight,
            width: maxWidth
        };
    }
};

/**
 * Return a rgb Color
 *
 * @param {string} hex hec color
 */
function hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

/**
 * Return a html table
 *
 * @param {string} data table data
 * @param {*} parameters control label parameters
 */
export var createHtmlTable = function (data, parameters) {
    let tbl = document.createElement("Table");
    tbl.style.display = "table-cell";
    tbl.style.verticalAlign = 'middle';
    tbl.style.borderCollapse = 'collapse';
    tbl.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
    for (const [xKey, xValue] of Object.entries(data)) {
        let tRow = tbl.insertRow();
        tRow.style.border = '1px solid #dbdbdb';
        tRow.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
        let rgb = hexToRgb(parameters["labelBackground"]);
        tRow.style.backgroundColor = 'rgb(' + (rgb.r) + ',' + rgb.g + ',' + (rgb.b - 10) + ',' + 0.6 + ')';
        if (parseInt(xKey) === 0) {
            tRow.style.backgroundColor = parameters["labelBackground"]
        }
        for (const [yKey, yValue] of Object.entries(xValue)) {
            let tCel = tRow.insertCell();
            tCel.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
            tCel.style.color = parameters["labelColor"];
            tCel.style.fontFamily = parameters["characterFont"];
            tCel.style.fontWeight = parameters["labelBold"];
            tCel.style.fontStyle = parameters["labelItalic"];
            tCel.style.fontSize = parameters["labelSize"] + 'px;';
            tCel.style.padding = '5px 8px';
            tCel.style.lineHeight = '20px';
            tCel.style.verticalAlign = 'middle';
            tCel.style.border = '1px solid #dbdbdb';
            tCel.appendChild(document.createTextNode(yValue));
        }
    }
    return tbl;
};


/**
 * Update table data
 *
 * @param {string} data label data
 * @param {*} htmlTable html object
 */
export var updateHtmlTable = function (htmlTable, data) {
    for (let i = 0; i < htmlTable.rows[0].cells.length; i++) {
        if (htmlTable.rows[0].cells[i].innerHTML === "Value") {
            htmlTable.rows[1].cells[i].innerText = data[1][i];
        }
    }
};

/**
 * Return a svg img
 *
 * @param {*} htmlElement html element
 */
export var htmlToSvg = function (htmlElement) {
    const img = document.createElement('img');
    img.src = 'data:image/svg+xml,' + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="600">' +
        '   <foreignObject  width="100%" height="100%">' +
        '       <body xmlns="http://www.w3.org/1999/xhtml" style="height:100%;display:flex;justify-content:center;align-items:center;">' +
        htmlElement.innerHTML +
        '       </body>' +
        '   </foreignObject>' +
        '</svg>');
    return img;
}

/**
 * Return a svg img
 *
 * @param {*} svg svg img
 * @param {*} htmlElement html element
 * @param {*} map material map
 */
export var updateSvgSrc = function (svg, htmlElement, map) {
    svg.onload = function () {
        map.needsUpdate = true;
        svg.src = 'data:image/svg+xml,' + encodeURIComponent(
            '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="600">' +
            '   <foreignObject  width="100%" height="100%">' +
            '       <body xmlns="http://www.w3.org/1999/xhtml" style="height:100%;display:flex;justify-content:center;align-items:center;">' +
            htmlElement.innerHTML +
            '       </body>' +
            '   </foreignObject>' +
            '</svg>');
    }
}


/**
 * Create a label using CSS2DObject
 *
 * @param {string} key to keep track the label
 * @param {string} labelName label name
 * @param {string} labelType type of label
 * @param {string} labelValue label value
 * @param {number} metricIndex to keep track layers and metric inside
 * @param {string} labelUnit the unit of label3D
 */
export var create2DMetricsLabels = function (key, labelName, labelType, labelValue, metricIndex, labelUnit, conf, metricParameters) {
    //console.log(labelValue);
    let data = getMetricsLabelsStructureData(labelName, labelType, labelValue, labelUnit, null, conf),
        div = document.createElement('div');
    div.className = 'label ' + labelName;
    div.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
    if (conf.metricsLabelsRenderingFormat === 'Text') {
        div.appendChild(createHtmlText(data, false, false, metricParameters));
    } else if (conf.metricsLabelsRenderingFormat === "Table") {
        div.appendChild(createHtmlTable(data, metricParameters));
    } else if (conf.metricsLabelsRenderingFormat === "Json") {
        div.appendChild(createHtmlText(data, false, true, metricParameters));
    }
    const metricsLabels = new CSS2DObject(div);

    metricsLabels.key = key;
    metricsLabels.name = labelName;
    metricsLabels.dataType = labelType;
    metricsLabels.metricIndex = metricIndex;
    metricsLabels.labelUnit = labelUnit;
    return metricsLabels;
}


/**
 * Create 2D layer label using CSS2DObject
 *
 * @param {string} key to keep track the label
 * @param {string} labelName layer label name
 * @param {number} layerIndex to keep track layers and metric inside
 */
export var create2DLayersLabels = function (key, labelName, layerIndex, layerParameters) {
    let div = document.createElement('div');
    div.className = 'label ' + labelName;
    div.appendChild(createHtmlText(labelName, true, true, layerParameters));
    const layersLabels = new CSS2DObject(div);
    layersLabels.key = key;
    layersLabels.name = labelName;
    layersLabels.layerIndex = layerIndex;
    return layersLabels;
}

/**
 * Create labels for each metrics
 *
 * @param {*} data dataObject (conf.data)
 * @param globalParams
 */
export var createLabels = function (data, globalParams) {
    let {conf, labelDiv, metricParameters, scene, layerParameters, borderThickness, meshes} = globalParams;
    let metricIndex = 0,
        layerIndex = 0;
    if (data != null && Object.keys(data).length > 0) {
        for (let layer in data) {
            let layerMetricsLabels;
            if (conf.cameraOptions.indexOf("Flat") !== -1) {
                layerMetricsLabels = new THREE.Group();
            }
            let layers = data[layer].layer;
            let metrics = data[layer].metrics;
            let metricLabelsIds = [],
                layersLabelsIds = [];
            let metricsEntries;

            metricsEntries = Object.entries(metrics);
            for (const [key, value] of metricsEntries) {
                if (metricLabelsIds.includes(key) === true) {
                    console.warn("This layer contains two times the same metric key", [layer]);
                    break;
                } else {
                    metricLabelsIds.push(key)
                    if (value.unit === '%') {
                        current = ((value.current / value.max) * 100).toFixed(3);
                        min = ((value.min / value.max) * 100).toFixed(3);
                        med = ((value.med / value.max) * 100).toFixed(3);
                        max = ((value.max / value.max) * 100).toFixed(3);

                    }
                    let { current, min, med, max, unit, _current, _max, _med, _min, _unit, isLayerBehaviored } = value;
                    if (conf.metricsLabelsRenderingMode === "2D") {
                        const currentLabel2d = create2DMetricsLabels(key, value.label, 'current', currentLabelValue, metricIndex, unitLabel, conf, metricParameters);
                        layerMetricsLabels.add(currentLabel2d);
                        //scene.add(currentLabel2d);
                        if (conf.displayAllMetricsLabels) {
                            const minLabel2d = create2DMetricsLabels(key, value.label, 'min', min, metricIndex, value.unit, conf, metricParameters);
                            const medLabel2d = create2DMetricsLabels(key, value.label, 'med', med, metricIndex, value.unit, conf, metricParameters);
                            const maxLabel2d = create2DMetricsLabels(key, value.label, 'max', max, metricIndex, value.unit, conf, metricParameters);
                            if (conf.cameraOptions.indexOf("Flat") !== -1) {
                                layerMetricsLabels.add(minLabel2d);
                                layerMetricsLabels.add(medLabel2d);
                                layerMetricsLabels.add(maxLabel2d);
                            }
                            else {
                                scene.add(minLabel2d);
                                scene.add(medLabel2d);
                                scene.add(maxLabel2d);
                            }
                        }
                    } else if (conf.metricsLabelsRenderingMode === "3D") {
                        let globalParams = {
                            conf,
                            labelDiv,
                            metricParameters,
                            borderThickness
                        }
                        const currentLabel3d = create3DMetricsLabels(key, value.label, 'current', current, metricIndex, value.unit, globalParams);
                        if(conf.cameraOptions.indexOf("Flat") !== -1) {
                            layerMetricsLabels.add(currentLabel3d);
                        } else {
                            scene.add(currentLabel3d);
                        }

                        if (conf.displayAllMetricsLabels) {
                            const minLabel3d = create3DMetricsLabels(key, value.label, 'min', min, metricIndex, value.unit, globalParams);
                            const medLabel3d = create3DMetricsLabels(key, value.label, 'med', med, metricIndex, value.unit, globalParams);
                            const maxLabel3d = create3DMetricsLabels(key, value.label, 'max', max, metricIndex, value.unit, globalParams);
                            if (conf.cameraOptions.indexOf("Flat") !== -1) {
                                layerMetricsLabels.add(minLabel3d);
                                layerMetricsLabels.add(medLabel3d);
                                layerMetricsLabels.add(maxLabel3d);
                            }
                            else {
                                scene.add(minLabel3d);
                                scene.add(medLabel3d);
                                scene.add(maxLabel3d);
                            }
                        }
                    }
                }
            }

            if (conf.cameraOptions.indexOf("Flat") !== -1) {
                meshes["_group"+layer+"_metrics_labels"] = layerMetricsLabels;
    
                if (!meshes['meshRenderingOrder'] && conf.cameraOptions.indexOf("Flat") !== -1) {
                    meshes['meshRenderingOrder'] = createRenderOrderCounter();
                }
    
                if(conf.cameraOptions.indexOf("Flat") !== -1) {
                    meshes["_group"+layer+"_metrics_labels"].renderOrder = meshes['meshRenderingOrder']();
                }
                scene.add(layerMetricsLabels);
                const rotation = data[layer].layer[layer + "-layer"]?.rotation;
                if (rotation) {
                    meshes["_group"+layer+"_metrics_labels"].rotation.y = data[layer].layer[layer + "-layer"]["rotation"];
                }
            }
            
            if (conf.displayLayersLabels) {
                for (const [key, value] of Object.entries(layers)) {
                    if (layersLabelsIds.includes(key) === true) {
                        console.warn("This layer contains two times the same metric key", [layer]);
                        break;
                    } else {
                        layersLabelsIds.push(key);
                        if (conf.layersLabelsRenderingMode === "2D") {
                            const layerLabel2d = create2DLayersLabels(key, value.label, layerIndex, layerParameters);
                            if(conf.cameraOptions.indexOf("Flat") !== -1) {
                                layerLabel2d.renderOrder = meshes['meshRenderingOrder']();
                            }
                            scene.add(layerLabel2d);
                        } else if (conf.layersLabelsRenderingMode === "3D") {
                            layersLabelsIds.push(key);
                            let globalParams = {labelDiv, layerParameters}
                            const layerLabel3d = create3DLayersLabels(key, value.label, layerIndex, globalParams);
                            if(conf.cameraOptions.indexOf("Flat") !== -1) {
                                layerLabel3d.renderOrder = Infinity;
                            }
                            scene.add(layerLabel3d);
                        }
                    }
                }
            }
            layerIndex++;
            metricIndex++;
        }
    }
}