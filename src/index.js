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
        let debug = true;
        let lineMaterial;
        let lineMaterialTransparent;
        const meshs = {};
        let parameters = {};
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
        const fileContent = new Request("default-data.json");

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
            initTextSettings();

            // init materials
            lineMaterial = new THREE.LineDashedMaterial({
                color: conf.lineColor,
                linewidth: conf.lineWidth,
                opacity: conf.lineOpacity
            });
            lineMaterialTransparent = new THREE.LineDashedMaterial({
                color: conf.mainAppColor,
                linewidth: conf.lineWidth,
                opacity: conf.lineOpacity
            });

            // rendering
            if (conf.displayGrid) {
                displayGrid(conf.gridSize, conf.gridDivisions);
            }

            if (conf.displayLabels) {
                // configuration text parameters
                createLabels(data);
            }
            render(data);
        }

        /**
         * set default text settings
         */
        function initTextSettings() {
            parameters["fontItalic"] ='';
            parameters["fontBold"] ='';
            if(conf.characterFont){
                parameters["characterFont"] = conf.characterFont
            }else{parameters["characterFont"] = 'Serif'}
            parameters["fontSize"] = conf.textSize;
            parameters["textColor"] = conf.textColor;
            if (conf.textBold) {
                parameters["fontBold"] = 'bold'
            }
            if (conf.textItalic) {
                parameters["fontItalic"] = 'Italic'
            }
        }

        /**
         * Adds a grid at Z = 0
         *
         * @param {number} size  (conf.gridSize)
         * @param {number} divisions (conf.gridDivisions)
         */
        function displayGrid(size, divisions) {
            let gridHelper = new THREE.GridHelper(size, divisions);
            scene.add(gridHelper);
        }

        /**
         * Return a canvas element
         *
         * @param {string} labelName label name
         */
        function createCanvas(labelName) {
            let characterFont = parameters.hasOwnProperty("characterFont") ? parameters["characterFont"] : "sans-serif";
            let fontSize = parameters.hasOwnProperty("fontSize") ? parameters["fontSize"] : 22;
            let fontBold = parameters.hasOwnProperty("fontBold") ? parameters["fontBold"] : '';
            let fontItalic = parameters.hasOwnProperty("fontItalic") ? parameters["fontItalic"] : '';
            let borderThickness = parameters.hasOwnProperty("borderThickness") ? parameters["borderThickness"] : 4;
            let backgroundColor = parameters.hasOwnProperty("backgroundColor") ? parameters["backgroundColor"] : 'rgba(0,0,0,0)'
            let textColor = parameters.hasOwnProperty("textColor") ? parameters["textColor"] : '#000000';
            console.log(textColor);
            if(textColor===null || textColor === undefined || textColor === '' ){textColor = '#000000'}
            if(fontSize===null || fontSize === undefined || fontSize === '' ){fontSize = 14}
            let canvas = document.createElement('canvas');
            let context = canvas.getContext('2d');
            context.font = fontItalic + "  " + fontBold + " " + (fontSize) + "px " + characterFont;
            canvas.setAttribute("width", 1200 + " px");
            canvas.setAttribute("height", 600 + " px");
            let textSize = fontSize * 1.7;
            context.font = fontItalic + " " + fontBold + " " + textSize + "px " + characterFont;
            context.fillStyle = backgroundColor;
            context.lineWidth = borderThickness;
            context.textAlign = 'center';
            let w = canvas.width;
            let h = canvas.height;
            addTextBackground(context, borderThickness / 2, borderThickness / 2, w + (borderThickness * fontSize), w / 2 + (borderThickness * fontSize), 'rgba(0,0,0,0)') // backgroundColor );
            context.fillStyle = textColor;
            context.textAlign = 'center';
            addMultiLineText(labelName, w / 2, h / 2, textSize, w, context);
            return canvas;
        }

        /**
         * To add a background color to a text field
         *
         * @param  {*} context canvas get 2D contexté
         * @param  {number} x  x position
         * @param  {number} y y position
         * @param  {number} width  background width
         * @param  {number} height  background height
         * @param {string} color background color
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
        function addMultiLineText(text, x, y, lineHeight, fitWidth, oContext) {
            let draw = x != null && y != null;
            // for the management of manual line breaks
            text = text.replace(/(\r\n|\n\r|\r|\n)/g, "\n");
            let sections = text.split("\n");
            let str, wordWidth, currentLine = 0, maxHeight , maxWidth = 0;
            let printNextLine = function (str) {
                if (draw){
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
        }

        /**
         * Create labels for each metrics
         *
         * @param {*} data dataObject (conf.data)
         */
        function createLabels(data) {
            let zAxis = conf.zplaneInitial;
            let layerIndex = 0;

            for (let layer in data) {
                let metrics = data[layer].metrics;
                let labelsIds = [];

                for (const [key, value] of Object.entries(metrics)) {
                    if (labelsIds.includes(key) === true) {
                        console.warn("This layer contains two times the same metric key", [layer]);
                        break;
                    } else {
                        labelsIds.push(key)
                        if (conf.TextStyle === 1) {
                            scene.add(create2DLabel(key, value.label, 'current', layerIndex, value.unit));
                            if (conf.displayLabelsAll) {
                                scene.add(create2DLabel(key, value.label, 'min', layerIndex, value.unit));
                                scene.add(create2DLabel(key, value.label, 'med', layerIndex, value.unit));
                                scene.add(create2DLabel(key, value.label, 'max', layerIndex, value.unit));
                            }
                        } else {
                            labelsIds.push(key)
                            scene.add(create3DLabel(key, value.label, 'current', value.current, layerIndex, value.unit));
                            if (conf.displayLabelsAll) {
                                scene.add(create3DLabel(key, value.label, 'min', value.min, layerIndex, value.unit));
                                scene.add(create3DLabel(key, value.label, 'med', value.med, layerIndex, value.unit));
                                scene.add(create3DLabel(key, value.label, 'max', value.max, layerIndex, value.unit));
                            }
                        }
                    }
                }
                zAxis -= conf.zplaneHeight
                layerIndex++;
            }

        }

        /**
         * Create a label using CSS2DObject
         *
         * @param {number} key to keep track the label
         * @param {string} labelName label text
         * @param {string} labelType type of label
         * @param {number} layerIndex to keep track layers and metric inside
         * @param {string} labelUnit the unit of label
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
         * Return a 3d label with text sprite and webGL
         *
         * @param {number} key to keep track the label
         * @param {string} labelName label text
         * @param {string} labelType type of label
         * @param {string} labelValue label value
         * @param {number} layerIndex to keep track layers and metric inside
         * @param {string} labelUnit the unit of label
         */
        function create3DLabel(key, labelName, labelType, labelValue, layerIndex, labelUnit) {
            if (labelUnit === undefined) labelUnit = '';
            labelName = labelName + ' - ' + labelType + ' : ' + labelValue + ' ' + labelUnit;
            let canvas = createCanvas(labelName);
            let fontSize = parameters["fontSize"];
            let texture = new THREE.CanvasTexture(canvas);
            texture.needsUpdate = true;
            texture.magFilter = THREE.NearestFilter;
            texture.minFilter = THREE.NearestFilter;
            if (conf.TextStyle === 3) {
                let canvasWebGL = document.createElement('canvas');
                let gl = canvasWebGL.getContext('webgl');
                let textureWebGL = gl.createTexture(texture);
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
                gl.bindTexture(gl.TEXTURE_2D, textureWebGL);
                //gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureWebGL); // This is the important line!
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
                gl.generateMipmap(gl.TEXTURE_2D);
                gl.bindTexture(gl.TEXTURE_2D, null);
            }
            let spriteMaterial = new THREE.SpriteMaterial({
                map: texture, useScreenCoordinates: false
            });
            let metricLabel = new THREE.Sprite(spriteMaterial);
            metricLabel.scale.set(4*fontSize, 2*fontSize);
            metricLabel.key = key;
            metricLabel.name = labelName;
            metricLabel.dataType = labelType;
            metricLabel.layerindex = layerIndex;
            metricLabel.labelUnit = labelUnit;
            return metricLabel;
        }

        /**
         * Create and update every mesh to match the latest data
         */
        function updateMeshs() {
            if (conf.mockupData) {
                newData = dataIterator.next().value;
            }

            let zAxis = conf.zplaneInitial;
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

                if (conf.displayMode === "dynamic") {
                    metricsDivider = "current";
                } else if (conf.displayMode === "static") {
                    metricsDivider = "max";
                } else if (conf.displayMode === "debug") {
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
                        if (conf.layerDisplayMode === "static") {
                            drawTrianglesInALayer(layer + '_mintoMedLayerShape', metricValue.min, metricValue.med, i, metricsNumber, conf.layerMidColor);
                            drawTrianglesInALayer(layer + '_medtoMaxLayerShape', metricValue.med, metricValue.max, i, metricsNumber, layerColorDecidedByLayerStatus(layerStatus));
                        } else if (conf.layerDisplayMode === "mixed") {
                            drawTrianglesInALayer(layer + '_mintoCurLayerShape', metricValue.min, metricValue.current, i, metricsNumber, conf.layerMidColor);
                            drawTrianglesInALayer(layer + '_curtoMaxLayerShape', metricValue.current, metricValue.max, i, metricsNumber, layerColorDecidedByLayerStatus(layerStatus));
                        }
                        //todo : implement better behavior to see ranges
                        else if (conf.layerDisplayMode === "dynamic") {
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
                    let sortedLabels;
                    if (conf.TextStyle === 1) {
                        sortedLabels = scene.children.filter((item) => item.layerIndex === layerIndex)
                    } else {
                        sortedLabels = scene.children.filter((item) => item.layerindex === layerIndex)
                    }
                    for (let i = 0; i < sortedLabels.length; i++) {
                        const label = sortedLabels[i];
                        if (layerMetrics[label.key]) {
                            const labelData = layerMetrics[label.key];
                            const labelDataName = labelData.label;
                            const labelDataType = label.dataType;
                            let labelDataUnit = label.labelUnit;
                            const labelDataIndex = Object.keys(layerMetrics).indexOf(label.key);
                            const labelDataValue = Object.values(layerMetrics)[labelDataIndex][labelDataType].toFixed();
                            const labelPositions = metricValue[labelDataType][labelDataIndex];
                            if (debug === true) {
                                debug = false;
                            }
                            // display units in label
                            if (!conf.displayUnits || labelDataUnit === undefined) labelDataUnit = '';
                            label.name = labelDataName + ' - ' + labelDataType + ' : ' + labelDataValue + ' ' + labelDataUnit;
                            if (conf.TextStyle === 1) {
                                label.element.innerHTML = '<table><ul><li ' +
                                    'style=" ' +
                                    ' color :' + parameters['textColor'] + ';' +
                                    ' font-family:' + parameters['characterFont'] + ';' +
                                    ' font-weight:' + parameters["fontBold"] + ';' +
                                    ' font-style: ' + parameters["fontItalic"] + '; ' +
                                    ' font-size: ' + parameters["fontSize"] + 'px; ' +
                                    '">' + label.name + '</li>' + '</ul></table>';
                            } else {
                                let canvas = createCanvas(label.name);
                                let texture = new THREE.Texture(canvas);
                                texture.needsUpdate = true;
                                label.material.map = texture;
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
                        const previousValueMax = layerPoints(Object.values(previousLayer).map(item => (conf.palindromeSize / item.max) * item[metricsDivider]), zAxis + conf.zplaneMultilayer);
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
                            let calc1 = sideSizeEven[(i + 1) % sideDividerOdd];
                            let calc2 = sideSizeOdd[(i + 1) % sideDividerEven];
                            let calc3 = sideSizeEven[(i) % sideDividerOdd];
                            let calc4 = sideSizeOdd[(i) % sideDividerEven];

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
                zAxis -= conf.zplaneMultilayer;
                previousLayer = layerMetrics;
                layerIndex++;
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
         * @param {*} metricValue value is required from to data to map on x,y plane
         * @param {*} zplaneValue adding z plane for 3D respresentation
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

    }

);



