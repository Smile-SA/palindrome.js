import * as THREE from 'three';
import {getMetricsLabelsStructureData} from './metricsUtils2D';
import {
    createLabelCanvas,
    htmlToSvg,
    createHtmlTable,
    updateHtmlTable,
    addMultiLineText,
    updateSvgSrc
} from './labelsUtils2D';
import {createHtmlText} from './labelsUtils2D';

/**
 * Return a 3d label with text sprite and webGL
 *
 * @param {string} key to keep track the label
 * @param {string} labelName label name
 * @param {string} labelType type of label
 * @param {string} labelValue label value
 * @param {number} metricIndex to keep track layers and metric inside
 * @param {string} labelUnit the unit of label
 * @param globalParams
 */

let metrics = {}
let check = []

export var create3DMetricsLabels = function (key, labelName, labelType, labelValue, metricIndex, labelUnit, globalParams) {
    let {conf, labelDiv, metricParameters, borderThickness} = globalParams;
    let texture = new THREE.Texture(),
    textureImage,
    data = getMetricsLabelsStructureData(labelName, labelType, labelValue, labelUnit, null, conf);

    labelDiv[labelName] = document.createElement('div');
    labelDiv[labelName].className = 'label ' + labelName;
    labelDiv[labelName].setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
    if (conf.metricsLabelsRenderingFormat === 'Text') {
        // canvas contents will be used for a texture
        if (conf.metricsLabels3DRenderingMode === 'Canvas') {
            // canvas contents will be used for a texture;
            textureImage = createLabelCanvas(labelName, data, metricParameters, borderThickness);
        } else if (conf.metricsLabels3DRenderingMode === 'Svg') {
            labelDiv[labelName].appendChild(createHtmlText(data, false, false, metricParameters));
            textureImage = htmlToSvg(labelDiv[labelName]);
        }
    } else if (conf.metricsLabelsRenderingFormat === "Table") {
        labelDiv[labelName].appendChild(createHtmlTable(data, metricParameters));
        textureImage = htmlToSvg(labelDiv[labelName]);
    } else if (conf.metricsLabelsRenderingFormat === "Json") {
        labelDiv[labelName].appendChild(createHtmlText(data, false, true, metricParameters));
        textureImage = htmlToSvg(labelDiv[labelName]);
    }
    texture.image = textureImage;
    setTimeout(function () {
        // assigning data to HTMLImageElement.src is asynchronous
        // using setTimeout() avoids the warning "Texture marked for update but image is incomplete"
        texture.needsUpdate = true;
    }, 0);

    texture.minFilter = THREE.NearestFilter;

    let spriteMaterial = new THREE.SpriteMaterial({map: texture, depthWrite: false, transparent: true}),
    metricsLabels = new THREE.Sprite(spriteMaterial);
    spriteMaterial.needsUpdate = true;
    metricsLabels.scale.set(2 * metricParameters["labelSize"], 1 * metricParameters["labelSize"], metricParameters["labelSize"]);
    metricsLabels.key = key;
    metricsLabels.name = labelName;
    metricsLabels.dataType = labelType;
    metricsLabels.metricIndex = metricIndex;
    metricsLabels.labelUnit = labelUnit;
    if (!conf.displayMetricsLabels) {
        metricsLabels.visible = false;
    }
    //console.log("data",metricsLabels);

    !metrics[metricIndex] ? metrics[metricIndex] = [metricsLabels.key] : metrics[metricIndex] = [...metrics[metricIndex], metricsLabels.key];

    for(key in metrics){
        if(metricIndex == 0 || key == metricIndex){
            continue
        }

        if(metrics[key][metrics[metricIndex].length-1] == metricsLabels.key){
            return
        }
        
    }

    return metricsLabels;

    //todo : reimplement so it does not interfere with 'text sprite' method
    //if (conf.labels3DRendering === 3) {
    //    let canvasWebGL = document.createElement('canvas');
    //    let gl = canvasWebGL.getContext('webgl');
    //    textureWebGL = gl.createTexture(texture);
    //    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    //    gl.bindTexture(gl.TEXTURE_2D, textureWebGL);
    //    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    //    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    //    gl.generateMipmap(gl.TEXTURE_2D);
    //    gl.bindTexture(gl.TEXTURE_2D, null);
    //}
}


/**
 * Return 3d layer label with text sprite
 *
 * @param {string} key to keep track the label
 * @param {string} labelName layer label name
 * @param {number} layerIndex to keep track layers and metric inside
 * @param globalParams
 */
export var create3DLayersLabels = function (key, labelName, layerIndex, globalParams) {
    let {labelDiv, layerParameters} = globalParams;
    let texture = new THREE.Texture(),
        textureImage;
    labelDiv[labelName] = document.createElement('div');
    labelDiv[labelName].className = labelName;
    labelDiv[labelName].appendChild(createHtmlText(labelName, true, true, layerParameters));
    textureImage = htmlToSvg(labelDiv[labelName]);
    texture.image = textureImage;
    setTimeout(function () {
        // assigning data to HTMLImageElement.src is asynchronous
        // using setTimeout() avoids the warning "Texture marked for update but image is incomplete"
        texture.needsUpdate = true;
    }, 0);
    texture.minFilter = THREE.NearestFilter;
    let spriteMaterial = new THREE.SpriteMaterial({map: texture, depthWrite: false, transparent: true}),
        layersLabels = new THREE.Sprite(spriteMaterial);
    spriteMaterial.needsUpdate = true;
    layersLabels.scale.set(2 * layerParameters["labelSize"], 1 * layerParameters["labelSize"], layerParameters["labelSize"]);
    layersLabels.key = key;
    layersLabels.name = labelName;
    layersLabels.layerIndex = layerIndex;
    return layersLabels;

}

/**
 * Setting labels format to text, json, table or svg
 * @param sortedMetricsLabels
 * @param metrics
 * @param debug
 * @param conf
 * @param labelDiv
 * @param xTab
 * @param yTab
 * @param zTab
 * @param metricValue
 */
export function settingLabelFormat(sortedMetricsLabels, metrics, debug, conf, labelDiv, xTab, yTab, zTab, metricValue) {
    for (let i = 0; i < sortedMetricsLabels.length; i++) {
        const metricsLabels = sortedMetricsLabels[i];
        if (metrics[metricsLabels.key]) {
            const metricData = metrics[metricsLabels.key];
            const metricsLabelsName = metricData.label;
            const metricsLabelsType = metricsLabels.dataType;
            let metricsLabelsUnit = metricsLabels.labelUnit;
            const metricsLabelsIndex = Object.keys(metrics).indexOf(metricsLabels.key);
            const metricsLabelsValue = Object.values(metrics)[metricsLabelsIndex][metricsLabelsType]?.toFixed();
            const labelPositions = metricValue[metricsLabelsType][metricsLabelsIndex];

            if (debug === true) {
                debug = false;
            }
            // update label data
            // Layer behaviored metrics display
            const isMetricLayerBehaviored = metrics[metricsLabels.key].isLayerBehaviored;
            const isMetricPositiveShifted = metrics[metricsLabels.key].isPositiveShifted;
            let labelValue = metricsLabelsValue;
            if (isMetricPositiveShifted) {
                labelValue = Object.values(metrics)[metricsLabelsIndex]["original" + metricsLabelsType.charAt(0).toUpperCase() + metricsLabelsType.slice(1)].toFixed(2);
            }
            
            if (isMetricLayerBehaviored) {
                labelValue = Object.values(metrics)[metricsLabelsIndex]["_" + metricsLabelsType].toFixed(2);
            }
            const metricsLabelBehavioredUnit = isMetricLayerBehaviored ? metrics[metricsLabels.key]["_unit"] : metricsLabelsUnit;
            metricsLabels.data = getMetricsLabelsStructureData(metricsLabelsName, metricsLabelsType, labelValue, metricsLabelBehavioredUnit, metricData, conf, isMetricLayerBehaviored);
            let x = labelPositions[0],
                y = labelPositions[2],
                z = labelPositions[1];

            if (conf.metricsLabelsRenderingMode === "2D") {
                if (conf.metricsLabelsRenderingFormat === "Text") {
                    // update text label
                    metricsLabels.element.getElementsByTagName('p').item(0).textContent = metricsLabels.data;
                } else if (conf.metricsLabelsRenderingFormat === "Table") {
                    // update table
                    updateHtmlTable(metricsLabels.element.getElementsByTagName('table').item(0), metricsLabels.data);
                } else if (conf.metricsLabelsRenderingFormat === "Json") {
                    // update json
                    metricsLabels.element.getElementsByTagName('p').item(0).textContent = metricsLabels.data;
                }
            } else if (conf.metricsLabelsRenderingMode === "3D") {
                //get the label texture from the material map
                let metricsLabelsTexture = metricsLabels.material.map.image;
                if (conf.metricsLabelsRenderingFormat === "Text") {
                    if (conf.metricsLabels3DRenderingMode === "Canvas") {
                        //here metricsLabelsTexture is a canvas
                        let labelContext = metricsLabelsTexture.getContext('2d')
                        //clear the canvas
                        labelContext.clearRect(0, 0, metricsLabelsTexture.width, metricsLabelsTexture.height);
                        //update the canvas
                        addMultiLineText(metricsLabels.data, metricsLabelsTexture.width / 2, metricsLabelsTexture.height / 2, metricsLabelsTexture.style.fontSize, metricsLabelsTexture.width, labelContext);
                        //update the three.js object material map
                        metricsLabels.material.map.needsUpdate = true;
                        y = y + 0.4;
                    } else if (conf.metricsLabels3DRenderingMode === "Svg") {
                        // here metricLabelTexture is a table svg
                        labelDiv[metricsLabelsName].getElementsByTagName('p').item(0).innerHTML = metricsLabels.data;
                        updateSvgSrc(metricsLabelsTexture, labelDiv[metricsLabelsName], metricsLabels.material.map);
                        y = y + 1;
                    }
                } else if (conf.metricsLabelsRenderingFormat === "Table") {
                    // here metricsLabelsTexture is a table svg
                    updateHtmlTable(labelDiv[metricsLabelsName].getElementsByTagName('table').item(0), metricsLabels.data);
                    updateSvgSrc(metricsLabelsTexture, labelDiv[metricsLabelsName], metricsLabels.material.map);
                    y = y + 1.8;
                } else if (conf.metricsLabelsRenderingFormat === "Json") {
                    // here metricsLabelsTexture is a json svg
                    labelDiv[metricsLabelsName].getElementsByTagName('p').item(0).innerHTML = metricsLabels.data;
                    updateSvgSrc(metricsLabelsTexture, labelDiv[metricsLabelsName], metricsLabels.material.map);
                    y = y + 1;
                }
            }
            
            if (conf.displayMetricSpheres) {
                // Making metrics text little bit above the spheres
                x = (x >= 0) ? x + 2 : x - 2;
            }
            metricsLabels.position.set(x, y, z);
            // top x
            xTab.push(labelPositions[0]);
            zTab.push(labelPositions[2]);
            yTab.push(labelPositions[1]);

        }
    }
}

/**
 * Setting label positions
 * @param conf
 * @param resize
 * @param xTab
 * @param yTab
 * @param zTab
 * @param layersLabels
 */
export function setLabelsPositions(conf, resize, xTab, yTab, zTab, layersLabels) {
    if (conf.displayLayersLabels && xTab.length > 0 && yTab.length > 0 && zTab.length > 0) {
        if (conf.layersLabelsRenderingMode === "2D") {
            resize = -1
        }
        // set label position
        if (conf.layersLabelsOrientation === "Sticky") {
            if (xTab[0][0] && yTab[0][0] && zTab[0][0]) {
                layersLabels.position.set(((xTab[xTab.length - 1][0] + xTab[xTab.length - 2][0]) / 2), ((zTab[zTab.length - 1][2])), (yTab[yTab.length - 1][1] + yTab[yTab.length - 2][1]) / 2);
            }
        } else if (conf.layersLabelsOrientation === "Free") {
            layersLabels.position.set(((xTab[xTab.length - 1][0] + xTab[xTab.length - 2][0]) / 2), ((zTab[zTab.length - 1][2])), ((yTab[yTab.length - 1][1] + yTab[yTab.length - 2][1]) / 2) - (conf.framePadding + conf.framePadding * conf.framePadding));
        }
    }
}


