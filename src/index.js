import * as THREE from 'three';
import {CSS2DObject} from 'three-css2drender';
import {Triangle, SimpleLine} from './ThreeGeometryObjects';
import {dataGenerator} from './dataGenerator';
import {initThreeObjects} from './ThreeJSBasicObjects';

/**
 * @param {HTMLElement} parentElement perent element of three's renderer element
 * @param {*} conf model's configuration
 */
export default (function (parentElement, conf) {
    var debug = true;
    let lineMaterial;
    let lineMaterialTransparent;
    const meshs = {};
    var MSDFShader;
    var parameters = {};
    let dataIterator;
    let newData;
    const {
        scene,
        labelsRenderer,
        controls,
        renderer,
        camera
    } = initThreeObjects();

    parentElement.appendChild(renderer.domElement);
    parentElement.appendChild(labelsRenderer.domElement);

    // TODO change this when we have a real data source
    const fileContent = new Request("data.json");

    run(fileContent);

    /**
     * Main function
     *
     * @param {*} src source of the configuration, defaults to conf.data
     */
    async function run(src) {
        // init data
        const result = await fetch(src);
        let data;

        try {
            data = await result.json();
        } catch (error) {
            data = conf.data;
        }
        newData = data;
        dataIterator = dataGenerator(data);

        // init materials
        lineMaterial = new THREE.LineDashedMaterial({
            color: conf.line.lineColor,
            linewidth: conf.line.lineWidth,
            opacity: conf.line.lineOpacity
        });
        lineMaterialTransparent = new THREE.LineDashedMaterial({
            color: conf.mainAppColor,
            linewidth: conf.line.lineWidth,
            opacity: conf.line.lineTranparency
        });

        // rendering
        if (conf.displayGrid) {
            displayGrid(conf.gridSize, conf.gridDivisions);
        }

        if (conf.displayLabels) {
            // configuration text parameters
            if (conf.textBold) {
                parameters["fontBold"] = 'bold'
            } else {
                parameters["fontBold"] = ''
            }
            if (conf.textItalic) {
                parameters["fontItalic"] = 'Italic'
            } else {
                parameters["fontItalic"] = ''
            }

            parameters["characterFont"] = conf.characterFont;
            parameters["fontSize"] = conf.textSize;
            parameters["borderColor"] = conf.textBoxColor;
            parameters["backgroundColor"] = conf.textBoxColor;
            parameters["textColor"] = conf.textColor;
            createLabels(data);
        }

        render(data);
    }


    /**
     * Adds a grid at Z = 0
     *
     * @param {*} size number (conf.gridSize)
     * @param {*} divisions number (conf.gridDivisions)
     */
    function displayGrid(size, divisions) {
        var gridHelper = new THREE.GridHelper(size, divisions);
        scene.add(gridHelper);
    }

    /**
     * Create labels for each metrics
     *
     * @param {*} data dataObject (conf.data)
     */
    function createLabels(data) {
        let zAxis = conf.zplane.zplaneInitial;
        let layerIndex = 0;

        for (let layer in data) {
            let metrics = data[layer].metrics;
            let labelsIds = [];

            for (const [key, value] of Object.entries(metrics)) {
                if (labelsIds.includes(key) == true) {
                    console.warn("This layer contains two times the same metric key", [layer]);
                    break;
                } else {
                    labelsIds.push(key)
                    if (conf.TextStyle == 1) {
                        scene.add(create2DLabel(key, value.label, 'current', layerIndex, value.unit));
                        if (conf.displayLabelsAll) {
                            scene.add(create2DLabel(key, value.label, 'min', layerIndex, value.unit));
                            scene.add(create2DLabel(key, value.label, 'med', layerIndex, value.unit));
                            scene.add(create2DLabel(key, value.label, 'max', layerIndex, value.unit));
                        }
                    } else {
                        if (conf.TextStyle == 2) {
                            labelsIds.push(key)
                            scene.add(create3DLabel(key, value.label, 'current', value.current, layerIndex, value.unit));
                            if (conf.displayLabelsAll) {
                                scene.add(create3DLabel(key, value.label, 'min', value.min, layerIndex, value.unit));
                                scene.add(create3DLabel(key, value.label, 'med', value.med, layerIndex, value.unit));
                                scene.add(create3DLabel(key, value.label, 'max', value.max, layerIndex, value.unit));
                            }
                        } else{
                            if (conf.TextStyle == 3) {
                                labelsIds.push(key)
                                scene.add(create3DSecondLabel(key, value.label, 'current', value.current, layerIndex, value.unit));
                                if (conf.displayLabelsAll) {
                                    scene.add(create3DSecondLabel(key, value.label, 'min', value.min, layerIndex, value.unit));
                                    scene.add(create3DSecondLabel(key, value.label, 'med', value.med, layerIndex, value.unit));
                                    scene.add(create3DSecondLabel(key, value.label, 'max', value.max, layerIndex, value.unit));
                                }
                            }
                        }
                    }
                }
            }

            zAxis -= conf.zplane.zplaneHeight
            layerIndex++;
        }

    }

    /**
     * Create a label using CSS2DObject
     *
     * @param {string} textContent label text
     * @param {number} vector3 coordinates of our metric point on the plane
     * @param {number} layerIndex to keep track or layers and metric inside
     */
    function create2DLabel(key, labelName, labelType, layerIndex, labelUnit) {
        if (labelUnit === undefined) labelUnit = '';
        const labelDiv = document.createElement('div');
        labelDiv.className = 'label ' + labelName;
        labelDiv.textContent = labelName;
        const metricLabel = new CSS2DObject(labelDiv);
        metricLabel.key = key;
        metricLabel.name = labelName;
        metricLabel.dataType = labelType;
        metricLabel.layerIndex = layerIndex;
        metricLabel.labelUnit = labelUnit;
        //metricLabel.position.set(vector3[0], vector3[2] + 1, vector3[1]);
        return metricLabel;
    }

    /**
     * Return a 3d label with text sprite
     *
     * @param {number} key
     * @param {string} labelName
     * @param {string} labelType
     * @param {number} layerIndex
     */
    function create3DLabel(key, labelName, labelType, labelValue, layerIndex, labelUnit)  {
        if (labelUnit === undefined) labelUnit = '';
        labelName = labelName + ' - ' + labelType + ' : ' + labelValue + ' ' + labelUnit;
        var canvas = createCanvas(labelName);
        var fontSize = canvas[1];
        var texture = new THREE.CanvasTexture(canvas[0]);
        texture.needsUpdate = true;
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestFilter;
        var spriteMaterial = new THREE.SpriteMaterial({map: texture, useScreenCoordinates: false
        });
        var metricLabel = new THREE.Sprite(spriteMaterial);
        metricLabel.scale.set((0.5 +(0.5*2/5))*fontSize, (0.25 +(0.25*2/5))* fontSize, (0.75 +(0.75*2/5))*fontSize);
        metricLabel.key = key;
        metricLabel.name = labelName;
        metricLabel.dataType = labelType;
        metricLabel.layerindex = layerIndex;
        metricLabel.labelUnit = labelUnit;
        return metricLabel;
    }

    /**
     * Return a 3d label with text sprite
     *
     * @param {number} key
     * @param {string} labelName
     * @param {string} labelType
     * @param {number} layerIndex
     */
    function create3DSecondLabel(geometry, texture,key, labelName, labelType, labelValue, layerIndex, labelUnit) {
        if (labelUnit === undefined) labelUnit = '';
        labelName = labelName + ' - ' + labelType + ' : ' + labelValue + ' ' + labelUnit;
        // add 3D text
        var loader = new THREE.FontLoader();


            var textGeo = new THREE.TextGeometry( "text", {
                font: undefined,
                size: 70,
                height: 20,
                curveSegments: 4,
                bevelThickness: 2,
                bevelSize: 1.5,
                bevelEnabled: true

            } );

            textGeo.computeBoundingBox();

            const centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );

            var textMesh1 = new THREE.Mesh( textGeo, materials );

            textMesh1.position.x = centerOffset;
            textMesh1.position.y = hover;
            textMesh1.position.z = 0;

            textMesh1.rotation.x = 0;
            textMesh1.rotation.y = Math.PI * 2;

            scene.add( textMesh1 );


    }

    /**
     * Return a canvas element
     *
     * @param {string} labelName
     */
    function createCanvas(labelName) {
        var characterFont = parameters.hasOwnProperty("characterFont") ? parameters["characterFont"] : "sans-serif";
        var fontSize = parameters.hasOwnProperty("fontSize") ? parameters["fontSize"] : 22;
        var fontBold = parameters.hasOwnProperty("fontBold") ? parameters["fontBold"] : 'bold';
        var fontItalic = parameters.hasOwnProperty("fontItalic") ? parameters["fontItalic"] : 'Italic';
        var borderThickness = parameters.hasOwnProperty("borderThickness") ? parameters["borderThickness"] : 4;
        var borderColor = parameters.hasOwnProperty("borderColor") ? parameters["borderColor"] : 'rgba(0,0,0,0)';
        var backgroundColor = parameters.hasOwnProperty("backgroundColor") ? parameters["backgroundColor"] : 'rgba(0,0,0,0)'
        var textColor = parameters.hasOwnProperty("textColor") ? parameters["textColor"] : '#000000';
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        context.font = fontItalic + " " + fontBold + " " + fontSize + "px " + characterFont;
        var metrics = context.measureText(labelName);
        var textWidth = metrics.width;
        canvas.height = (textWidth+fontSize)/2;
        canvas.width = (textWidth+fontSize);
        context.font = fontItalic + " " + fontBold + " " + fontSize + "px " + characterFont;
        context.fillStyle = backgroundColor;
        context.strokeStyle = borderColor;
        context.lineWidth = borderThickness;
        roundRect(context, borderThickness / 2, borderThickness / 2, textWidth + borderThickness, fontSize * 1.4 + borderThickness, 6);
        context.fillStyle = textColor;
        context.fillText(labelName, borderThickness/2, fontSize + borderThickness);
        context.restore();

        return [canvas, fontSize];
    }

    /**
     * function for drawing rounded labels rectangles
     *
     * @param {number} ctx
     * @param {number} x
     * @param {number} y
     * @param {number} h
     * @param {number} r
     */
    function roundRect(ctx, x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    /**
     * Create and update every mesh to match the latest data
     */
    function updateMeshs() {
        if (conf.mockupData) {
            newData = dataIterator.next().value;
        }

        let zAxis = conf.zplane.zplaneInitial;
        let previousLayer = null;
        let layerIndex = 0;

        for (let layer in newData) {
            //this is the updated layer metrics
            const layerMetrics = newData[layer].metrics;
            //this is the new total of current's
            const layerCurrentTotal = Object.values(layerMetrics).map(item => item.current).reduce((a, b) => a + b, 0);
            //this is the new total of max's
            const layerMaxTotal = Object.values(layerMetrics).map(item => item.max).reduce((a, b) => a + b, 0);

            //todo : status colors shall map with default colors
            const layerStatus = (layerCurrentTotal / layerMaxTotal) * 100;
            let metricsDivider;
            let metricValue = {};
            metricValue.max = layerPoints(Object.values(layerMetrics).map(item => (conf.palindromeSize / item.max) * item.max), zAxis);
            metricValue.med = layerPoints(Object.values(layerMetrics).map(item => (conf.palindromeSize / item.max) * item.med), zAxis);
            metricValue.min = layerPoints(Object.values(layerMetrics).map(item => (conf.palindromeSize / item.max) * item.min), zAxis);
            metricValue.current = layerPoints(Object.values(layerMetrics).map(item => (conf.palindromeSize / item.max) * item.current), zAxis);

            if (conf.displayMode == "dynamic") {
                metricsDivider = "current";
            } else if (conf.displayMode == "static") {
                metricsDivider = "max";
            } else if (conf.displayMode == "debug") {
            } else {
                break;
            }

            const metricsNumber = Object.values(layerMetrics).length;
            const metricsPositions = [metricValue.max, metricValue.med, metricValue.min];

            //draws and update layers
            //todo number of shapes shall be dynamic
            //todo outer lines shall be optional and for all the shapes
            if (conf.displayLayers) {
                for (let i = 0; i < metricsNumber; i++) {
                    //draws innner layer shapes
                    if (conf.layerDisplayMode == "static") {
                        drawTrianglesInALayer(layer + '_mintoMedLayerShape', metricValue.min, metricValue.med, i, metricsNumber, conf.layerMidColor);
                        drawTrianglesInALayer(layer + '_medtoMaxLayerShape', metricValue.med, metricValue.max, i, metricsNumber, layerColorDecidedByLayerStatus(layerStatus));
                    } else if (conf.layerDisplayMode == "mixed") {
                        drawTrianglesInALayer(layer + '_mintoCurLayerShape', metricValue.min, metricValue.current, i, metricsNumber, conf.layerMidColor);
                        drawTrianglesInALayer(layer + '_curtoMaxLayerShape', metricValue.current, metricValue.max, i, metricsNumber, layerColorDecidedByLayerStatus(layerStatus));
                    }
                    //todo : implement better behavior to see ranges
                    else if (conf.layerDisplayMode == "dynamic") {
                        drawTrianglesInALayer(layer + '_mintoCurLayerShape', metricValue.min, metricValue.current, i, metricsNumber, conf.layerMidColor);
                    }

                }
            }

            //draws and update layers outline
            if (conf.displayLayersLines) {
                for (let i = 0; i < metricsNumber; i++) {
                    for (let [index, metricsPosition] of metricsPositions.entries()) {
                        //draws outside lines
                        drawLayerOutline(layer + '_layerShapesEdges', metricsPosition, i, metricsNumber, lineMaterial, index);
                    }
                }
            }

            // update label position
            if (conf.displayLabels) {
                var sortedLabels;
                if (conf.TextStyle==1) {
                    sortedLabels = scene.children.filter((item) => item.layerIndex == layerIndex)
                } else {
                    if(conf.TextStyle==2){
                        sortedLabels = scene.children.filter((item) => item.layerindex == layerIndex)
                    }
                }
                for (let i = 0; i < sortedLabels.length; i++) {
                    const label = sortedLabels[i];
                    if (layerMetrics[label.key]) {
                        const labelData = layerMetrics[label.key];
                        const labelDataName = labelData.label;
                        const labelDataType = label.dataType;
                        var labelDataUnit = label.labelUnit;
                        const labelDataIndex = Object.keys(layerMetrics).indexOf(label.key);
                        const labelDataValue = Object.values(layerMetrics)[labelDataIndex][labelDataType].toFixed();
                        const labelPositions = metricValue[labelDataType][labelDataIndex];
                        if (debug == true) {
                            debug = false;
                        }
                        // display units in label
                        if (!conf.displayUnits || labelDataUnit === undefined) labelDataUnit = '';
                        label.name = labelDataName + ' - ' + labelDataType + ' : ' + labelDataValue + ' ' + labelDataUnit;
                        if (conf.TextStyle==1) {
                            label.element.innerHTML = '<table><ul><li ' +
                                'style=" ' +
                                ' color :' + parameters['textColor'] + ';' +
                                ' font-family:' + parameters['characterFont'] + ';' +
                                ' font-weight:' + parameters["fontBold"] + ';' +
                                ' font-style: ' + parameters["fontItalic"] + '; ' +
                                ' font-size: ' + parameters["fontSize"] + 'px; ' +
                                '">' + label.name + '</li>' + '</ul></table>';
                        } else {
                            if(conf.TextStyle==2){
                                var canvas = createCanvas(label.name);
                                var texture = new THREE.Texture(canvas[0]);
                                texture.needsUpdate = true;
                                label.material.map = texture;
                            }

                        }
                        label.position.set(labelPositions[0], labelPositions[2], labelPositions[1]);
                    }
                }
            }
            //)

            //extract into create / update functions
            //draw and update sides lines and panels
            //tood : check why displayDides is broken
            if (conf.displaySides === true) {

                if (previousLayer !== null) {
                    const previousValueMax = layerPoints(Object.values(previousLayer).map(item => (conf.palindromeSize / item.max) * item[metricsDivider]), zAxis + conf.zplane.zplaneMultilayer);
                    const previousPlaneLength = Object.values(previousLayer).length;
                    //adds side texture if the palindrome is more than 1 plane

                    //checks if actual layer points is higher than previous ones to determine if the sides should be drawn from few to many OR from many to few
                    //for the number of sides
                    const sideDividerOdd = (metricsNumber >= previousPlaneLength) ? previousPlaneLength : metricsNumber;
                    const sideDividerEven = (metricsNumber >= previousPlaneLength) ? metricsNumber : previousPlaneLength;
                    //for the lengths of sides
                    const sideSizeOdd = (metricsNumber >= previousPlaneLength) ? metricValue[metricsDivider] : previousValueMax;
                    const sideSizeEven = (metricsNumber >= previousPlaneLength) ? previousValueMax : metricValue[metricsDivider];

                    //todo
                    //done : refactor attributes name for clarity and compute once
                    //done : refactor mesh names
                    for (let i = 0; i < sideDividerEven; i++) {
                        //todo : refactor this part with better variable names ?
                        var calc1 = sideSizeEven[(i + 1) % sideDividerOdd];
                        var calc2 = sideSizeOdd[(i + 1) % sideDividerEven];
                        var calc3 = sideSizeEven[(i) % sideDividerOdd];
                        var calc4 = sideSizeOdd[(i) % sideDividerEven];

                        if (meshs['side-bias-line' + layer + i]) {
                            // if init done, update
                            meshs['side-bias-line' + layer + i].update(sideSizeOdd[i], calc1)
                            meshs['side-straight-line' + layer + i].update(calc2, calc1, lineMaterial)
                            meshs['side-top-left-pane' + layer + i].update(calc3, calc1, calc4)
                            meshs['side-bottom-right-pane' + layer + i].update(calc4, calc2, calc1)
                        } else {
                            //init objects
                            meshs['side-bias-line' + layer + i] = new SimpleLine(sideSizeOdd[i], calc1, lineMaterialTransparent);
                            scene.add(meshs['side-bias-line' + layer + i]);
                            meshs['side-straight-line' + layer + i] = new SimpleLine(calc2, calc1, lineMaterial);
                            scene.add(meshs['side-straight-line' + layer + i]);
                            meshs['side-top-left-pane' + layer + i] = new Triangle(calc3, calc1, calc4, conf.mainAppColor);
                            scene.add(meshs['side-top-left-pane' + layer + i]);
                            meshs['side-bottom-right-pane' + layer + i] = new Triangle(calc4, calc2, calc1, conf.mainAppColor);
                            scene.add(meshs['side-bottom-right-pane' + layer + i]);
                        }
                    }
                } else {
                }
            }
            zAxis -= conf.zplane.zplaneMultilayer;
            previousLayer = layerMetrics;
            layerIndex++;
        }
    }

    /**
     * Draw a line in a plane (layer)
     *
     * @param {string} layer layerId
     * @param {number[]} planePoint coordinates of the line
     * @param {number} i index of the line in the plane
     * @param {number} planePointLength number of points in the plane
     * @param {THREE.Material} material material to apply to the line
     */
    function drawLayerOutline(layerName, planePoints, layerMetricIndex, planePointLength, material, layerMetricRangeIndex) {
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
     * Return the color corresponding to a given metric value
     *
     * @param {number} value
     */
    function layerColorDecidedByLayerStatus(value) {
        let layerStatusColor = conf.statusColor.min;
        if (conf.layerStatusControl) {
            if (value >= conf.statusRange.low && value <= conf.statusRange.med) {
                return layerStatusColor;
            } else if (value > conf.statusRange.med && value <= conf.statusRange.high) {
                layerStatusColor = conf.statusColor.med;
                return layerStatusColor;
            } else {
                layerStatusColor = conf.statusColor.high;
                return layerStatusColor;
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
     */
    function drawTrianglesInALayer(layer, planePointOne, planePointTwo, i, planePointLength, color) {

        if (meshs['19' + layer + i]) { // if init done
            meshs['19' + layer + i].update(planePointOne[i], planePointTwo[i], planePointTwo[(i + 1) % planePointLength])
            meshs['20' + layer + i].update(planePointTwo[(i + 1) % planePointLength], planePointOne[(i + 1) % planePointLength], planePointOne[(i) % planePointLength])
        }
        //init objects
        else {
            meshs['19' + layer + i] = new Triangle(planePointOne[i], planePointTwo[i], planePointTwo[(i + 1) % planePointLength], color);
            scene.add(meshs['19' + layer + i]);
            meshs['20' + layer + i] = new Triangle(planePointTwo[(i + 1) % planePointLength], planePointOne[(i + 1) % planePointLength], planePointOne[(i) % planePointLength], color);
            scene.add(meshs['20' + layer + i]);
        }
    }

    /**
     * Rendering loop
     */
    function render() {
        updateMeshs();
        controls.update();
        renderer.render(scene, camera);
        labelsRenderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    /**
     * Transform a metric value into a 3d point
     *
     * @param {number} metric value is required from to data to map on x,y plane
     * @param {number} zplaneValue adding z plane for 3D respresentation
     */
    function layerPoints(metricValue, zplaneValue) {
        const planepoints = [];
        for (let i = 0; i < metricValue.length; i++) {
            const points = polarTo3DPoint(i * Math.PI * 2 / metricValue.length, metricValue[i] * conf.metricMagnifier, zplaneValue);
            planepoints.push(points);
        }
        return planepoints;
    }

    /**
     * Return a 3d point from polar coordinates in the z plane
     *
     * @param {number} angle
     * @param {number} radius
     * @param {number} zplaneValue
     */
    function polarTo3DPoint(angle, radius, zplaneValue) {
        return [radius * Math.cos(angle), radius * Math.sin(angle), zplaneValue];
    }

});



