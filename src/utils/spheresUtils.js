import { metricColor, getColorOpacityBasedOnRanges } from "./colorsUtils";
import { Sphere } from '../threeJSUtils/ThreeJSGeometryObjects';
import { htmlToSvg } from "./labelsUtils2D";
import * as THREE from 'three';

/**
 * Draw spheres and their hover context
 *
 * @param {string} layerName layer name
 * @param {*} metrics spheres metrics infos
 * @param {*} sphereCoords spheres coordinates
 * @param globalParams
 */
export var makeSphereContextsStatus = function (sphereCoords, layerName, metrics, globalParams, newData) {
    let { scene, meshs, conf, camera, labelDiv, layerParameters, rotation } = globalParams;
    let numberOfMetrics = metrics.length;
    for (var i = 0; i < sphereCoords.current.length; i++) {
        makeSphereContext(sphereCoords.current[i], layerName, i.toString(), metricColor(metrics[i], conf, layerName, newData), metrics[i], scene, meshs, conf, camera, labelDiv, layerParameters, numberOfMetrics, rotation);
    }
}

/**
 * Adding spheres and context in scene
 *
 * @param {*} planePoints sphere coordinates
 * @param {string} layerName layer name
 * @param {number} metricIndex the index of the metric
 * @param {number} metricColor the index of the metric
 * @param {number} metricValues the index of the metric
 * @param scene
 * @param meshs
 * @param conf
 * @param camera
 * @param labelDiv
 * @param layerParameters
 */
function makeSphereContext(planePoints, layerName, metricIndex, metricColor, metricValues, scene, meshs, conf, camera, labelDiv, layerParameters, numberOfMetrics, rotation) {
    let opacity = getColorOpacityBasedOnRanges(metricColor, { highColor: conf.sphereColorHigh, medColor: conf.sphereColorMed, lowColor: conf.sphereColorLow }, conf);
    if (meshs['_sphere' + layerName + metricIndex]) {
        if (conf.transparentDisplay) {
            meshs['_sphere' + layerName + metricIndex].update(conf.sphereColorHigh, opacity, planePoints[0], planePoints[2], planePoints[1]);
        }
        else {
            meshs['_sphere' + layerName + metricIndex].update(metricColor, null, planePoints[0], planePoints[2], planePoints[1]);
        }
        if (meshs['_sphereHoverRegion' + layerName + metricIndex]) {
            meshs['_sphereHoverRegion' + layerName + metricIndex].position.set(planePoints[0], planePoints[2], planePoints[1])
        }
        if (meshs['_text' + layerName + metricIndex]) {
            meshs['_text' + layerName + metricIndex].position.set(planePoints[0], planePoints[2] + 3, planePoints[1]);
        }
    } else {
        if (conf.transparentDisplay) {
            meshs['_sphere' + layerName + metricIndex] = new Sphere(conf.sphereColorHigh, opacity);
        }
        else {
            meshs['_sphere' + layerName + metricIndex] = new Sphere(metricColor);
        }
        //x,z,y
        meshs['_sphere' + layerName + metricIndex].position.set(planePoints[0], planePoints[2], planePoints[1]);

        if ((metricIndex == numberOfMetrics - 1) && conf.cameraOptions.indexOf("Flat") !== -1) {
            const layerSpheres = new THREE.Group();
            for (let i = 0; i < numberOfMetrics; i++) {
                layerSpheres.add(meshs['_sphere' + layerName + i])
            }
            meshs['_group' + '_spheres' + layerName] = layerSpheres;
            scene.add(meshs['_group' + '_spheres' + layerName]);
            if (rotation.angle) {
                meshs['_group' + '_spheres' + rotation.layer].rotation.y = rotation.angle;
            }
        }

        if (!conf.cameraOptions.indexOf("Flat") !== -1) {
            scene.add(meshs['_sphere' + layerName + metricIndex]);
        }

        if (conf.displayValuesOnSphereHover) {
            meshs['_sphereHoverRegion' + layerName + metricIndex] = makeSphereFieldOfHover(layerName, metricIndex, planePoints, camera);
            scene.add(meshs['_sphereHoverRegion' + layerName + metricIndex]);

            meshs['_text' + layerName + metricIndex] = makeSphereText(planePoints, metricValues, conf, labelDiv, layerParameters);
            scene.add(meshs['_text' + layerName + metricIndex]);
        }

    }
}


/**
 * Draw hover context of spheres
 *
 * @param {string} layerName layer name
 * @param {number} metrics the index of the metric
 * @param {*} planePoints sphere coordinates
 */
function makeSphereFieldOfHover(layerName, metricIndex, planePoints, camera) {
    const planeGeometry = new THREE.SphereGeometry(2, 32, 16);
    const planeMaterial = new THREE.MeshBasicMaterial({
        color: "grey",
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1
    });
    planeMaterial.needsUpdate = true;
    const mesh = new THREE.Mesh(planeGeometry, planeMaterial);
    mesh.name = '_sphereHoverRegion' + layerName + metricIndex;
    mesh.position.set(planePoints[0], planePoints[2], planePoints[1]);
    mesh.visible = false;
    mesh.quaternion.copy(camera.quaternion);
    return mesh;
}

/**
 * Make sphere label : text, sphere or json
 *
 * @param {string} layerName layer name
 * @param {number} metrics the index of the metric
 * @param {*} planePoints sphere coordinates
 */
function makeSphereText(planePoints, metricValues, conf, labelDiv, layerParameters) {
    const text = "Min = " + metricValues.min + ". Max= " + metricValues.max + ". Med= " + metricValues.med;
    const obj = { 0: ['Min', 'Max', 'Med'], 1: [metricValues.min, metricValues.max, metricValues.med] };
    const json = { 'Min': metricValues.min, 'Max': metricValues.max, 'Med': metricValues.med }
    let mesh;
    if (conf.metricsLabelsRenderingFormat === "Json") {
        mesh = makeText(text, planePoints[0], planePoints[2] + 3, planePoints[1], JSON.stringify(json), conf, labelDiv, layerParameters);
    } else {
        mesh = makeText(text, planePoints[0], planePoints[2] + 3, planePoints[1], obj, conf, labelDiv, layerParameters);
    }
    mesh.visible = false;
    if (conf.metricsLabelsRenderingMode === "2D") {
        mesh.element.style.display = "none";
    }
    return mesh;
}


/**
 * Add text in the top of a sphere
 *
 * @param {string} labelName normal text in the top of the sphere
 * @param {number} x x coordinate
 * @param {number} y y coordinate
 * @param {number} z z coordinate
 * @param {*} data other data in case of json or table display
 */
function makeText(labelName, x, y, z, data, conf, labelDiv, layerParameters) {
    if (conf.metricsLabelsRenderingMode === "3D") {
        let texture = new THREE.Texture(),
            textureImage;
        labelDiv[labelName] = document.createElement('div');
        labelDiv[labelName].className = labelName;
        labelDiv[labelName].appendChild(createCardText(labelName, "DimGray", layerParameters));
        textureImage = htmlToSvg(labelDiv[labelName]);
        texture.image = textureImage;
        setTimeout(function () {
            // assigning data to HTMLImageElement.src is asynchronous
            // using setTimeout() avoids the warning "Texture marked for update but image is incomplete"
            texture.needsUpdate = true;
        }, 0);
        texture.minFilter = THREE.NearestFilter;
        let spriteMaterial = new THREE.SpriteMaterial({ map: texture, depthWrite: false, transparent: true }),
            layersLabels = new THREE.Sprite(spriteMaterial);
        spriteMaterial.needsUpdate = true;
        layersLabels.scale.set(2 * layerParameters["labelSize"], 1 * layerParameters["labelSize"], layerParameters["labelSize"]);
        layersLabels.name = labelName;
        layersLabels.position.set(x, y, z);
        return layersLabels;
    } else if (conf.metricsLabelsRenderingMode === "2D") {
        let div = document.createElement('div');
        div.className = 'label ' + labelName;
        if (conf.metricsLabelsRenderingFormat === "Text") {
            div.appendChild(createCardText(labelName, "DimGray", layerParameters));
        } else if (conf.metricsLabelsRenderingFormat === "Table") {
            div.appendChild(createHtmlTable(data, layerParameters));
        } else if (conf.metricsLabelsRenderingFormat === "Json") {

            div.appendChild(createCardText(data, "DimGray", layerParameters));
        }
        const layersLabels = new CSS2DObject(div);
        layersLabels.name = labelName;
        layersLabels.position.set(x, y, z);
        return layersLabels;
    }


}


/**
 * Add text in the top of a sphere
 *
 * @param {string} labelText normal text in the top of the sphere
 * @param {number} cardBackground background color of the card
 * @param {number} parameters style parameters
 */
function createCardText(labelText, cardBackground, parameters) {
    let p = document.createElement('p');
    p.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
    p.style.color = 'white';
    p.style.fontSize = '20px';
    p.style.backgroundColor = cardBackground;
    p.style.padding = "8px"
    p.style.fontFamily = parameters['characterFont'];
    p.innerText = labelText;
    return p;
}