import 'babel-polyfill';
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

        // data related
        let dataIterator;
        let newData;

        // three.js related
        let lineMaterial;
        let lineMaterialTransparent;
        const meshs = {};
        const {
            scene,
            labelsRenderer,
            controls,
            renderer,
            camera
        } = initThreeObjects();

        // init bold and italic option
        let labelBold = '', labelItalic = '', borderThickness = 4;
        if (conf.labelBold) {
            labelBold = 'bold'
        }
        if (conf.labelItalic) {
            labelItalic = 'Italic'
        }

        //3D related
        let labelDiv = [];

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
            if (conf.fitCameraPosition) {
                fitCameraToObjects(meshs);
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
         * @param {string} labelText label text
         */
        function createLabelCanvas(labelName, labelText) {
            //prepare canvas
            let labelCanvas = document.createElement('canvas');
            labelCanvas.setAttribute("className", labelName);
            labelCanvas.setAttribute("width", 900 + " px");
            labelCanvas.setAttribute("height", 450 + " px");
            labelCanvas['textSize'] = conf.labelSize * 2;

            //prepare context
            let labelContext = labelCanvas.getContext('2d');
            labelContext.font = labelItalic + " " + labelBold + " " + labelCanvas['textSize'] + "px " + conf.labelCharacterFont;
            labelContext.lineWidth = borderThickness;
            labelContext.textAlign = 'center';
            labelContext.fillStyle = conf.labelColor;

            //reassign values (design pattern)
            let w = labelCanvas.width;
            let h = labelCanvas.height;

            addTextBackground(labelContext, borderThickness / 2, borderThickness / 2, w + (borderThickness * labelCanvas['textSize']), h / 2 + (borderThickness * labelCanvas['textSize']), 'rgba(14,167,83,0)');
            addMultiLineText(labelText, w / 2, h / 2, labelCanvas['textSize'], w, labelContext);
            return labelCanvas;

        }

        /**
         * Return a html table
         *
         * @param {string} labelName label name
         * @param {string} labelType type of label
         * @param {string} labelValue label value
         * @param {string} labelUnit the unit of label
         */
        function createHtmlTable(labelName, labelType, labelValue, labelUnit) {
            let tbl = document.createElement('table');
            tbl.style.display = "table-cell";
            tbl.style.verticalAlign = 'middle';
            tbl.style.borderCollapse = 'collapse';
            tbl.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
            for (let i = 0; i <= 1; i++) {
                let tHead = tbl.insertRow();
                tHead.style.border = '1px solid #dbdbdb';
                tHead.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
                for (let j = 0; j <= 3; j++) {
                    let td = tHead.insertCell();
                    td.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
                    td.style.color = conf.labelColor;
                    td.style.fontFamily = conf.labelCharacterFont;
                    td.style.fontWeight = labelBold;
                    td.style.fontStyle = labelItalic;
                    td.style.fontSize = conf.labelSize + ' px;';
                    td.style.padding = '5px 8px';
                    td.style.lineHeight = '20px';
                    td.style.verticalAlign = 'middle';
                    td.style.border = '1px solid #dbdbdb';
                    if (i == 0) {
                        td.style.background = conf.labelBackgroundColor;
                        switch (j) {
                            case 0:
                                td.appendChild(document.createTextNode("Name"));
                                break;
                            case 1:
                                td.appendChild(document.createTextNode("Type"));
                                break;
                            case 2:
                                td.appendChild(document.createTextNode("Value"));
                                break;
                            case 3:
                                td.appendChild(document.createTextNode("Unit"));
                                break;
                        }
                    } else if (i == 1) {
                        td.style.background = 'white';
                        switch (j) {
                            case 0:
                                td.appendChild(document.createTextNode(labelName));
                                break;
                            case 1:
                                td.appendChild(document.createTextNode(labelType));
                                break;
                            case 2:
                                td.appendChild(document.createTextNode(labelValue));
                                break;
                            case 3:
                                td.appendChild(document.createTextNode(labelUnit));
                                break;
                        }
                    }

                }
            }
            let div = document.createElement('div');
            div.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
            div.appendChild(tbl);
            return div;
        }

        /**
         * Update table data
         *
         * @param {string} labelValue label value
         * @param {*} htmlTable html object
         */
        function updateHtmlTable(labelValue, htmlTable) {
            for (let j = 0; j <= 3; j++) {
                switch (j) {
                    case 2:
                        htmlTable.rows[1].cells[j].innerText = labelValue;
                        break;
                }
            }
        }

        /**
         * Return a html like json
         *
         * @param {string} labelName label name
         * @param {string} labelType type of label
         * @param {string} labelValue label value
         * @param {string} labelUnit the unit of label
         */
        function createHtmlJson(labelName, labelType, labelValue, labelUnit) {
            let json = document.createElement('code');
            json.style.background = conf.labelBackgroundColor;
            json.style.color = conf.labelColor;
            json.style.fontFamily = conf.labelCharacterFont;
            json.style.fontWeight = labelBold;
            json.style.fontStyle = conf.labelItalic;
            json.style.fontSize = conf.labelSize + "px";
            json.style.padding = '5px';
            json.innerHTML = '{"Name":"' + labelName + '","Type":"' + labelType + '","Value":"' + labelValue + '","Unit":"' + labelUnit + '"}';
            let div = document.createElement('div');
            div.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
            div.appendChild(json);
            return div;
        }

        /**
         * Update Json data
         *
         * @param {string} labelName label name
         * @param {string} labelType type of label
         * @param {string} labelValue label value
         * @param {string} labelUnit the unit of label
         * @param {*} htmlCode html code object
         */
        function updateHtmlJson(labelName, labelType, labelValue, labelUnit, htmlCode) {
            htmlCode.innerHTML = '{"Name":"' + labelName + '","Type":"' + labelType + '","Value":"' + labelValue + '","Unit":"' + labelUnit + '"}';
        }

        /**
         * Return a svg img
         *
         * @param {*} htmlElement html element
         */
        function htmlToSvg(htmlElement) {
            const img = document.createElement('img');
            img.src = 'data:image/svg+xml,' + encodeURIComponent(
                '<svg xmlns="http://www.w3.org/2000/svg" width="500" height="250">' +
                '   <foreignObject  width="100%" height="100%">' +
                '       <body xmlns="http://www.w3.org/1999/xhtml" style="height:100%;display:flex;justify-content:center;align-items:center;">'
                + htmlElement.innerHTML +
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
         */
        function updateSvgSrc(svg, htmlElement) {
            svg.src = 'data:image/svg+xml,' + encodeURIComponent(
                '<svg xmlns="http://www.w3.org/2000/svg" width="500" height="250">' +
                '   <foreignObject  width="100%" height="100%">' +
                '       <body xmlns="http://www.w3.org/1999/xhtml" style="height:100%;display:flex;justify-content:center;align-items:center;">'
                + htmlElement.innerHTML +
                '       </body>' +
                '   </foreignObject>' +
                '</svg>');
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
        function addMultiLineText(text, x, y, lineHeight, fitWidth, oContext) {
            let draw = x != null && y != null;
            // for the management of manual line breaks
            text = text.replace(/(\r\n|\n\r|\r|\n)/g, "\n");
            let sections = text.split("\n");
            let str, wordWidth, currentLine = 0, maxHeight, maxWidth = 0;
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
        }

        /**
         * Create labels for each metrics
         *
         * @param {*} data dataObject (conf.data)
         */
        function createLabels(data) {
            let zAxis = conf.zPlaneInitial;
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
                        if (conf.labelsRendering === "2D") {
                            scene.add(create2DLabel(key, value.label, 'current', value.current, layerIndex, value.unit));
                            if (conf.displayLabelsAll) {
                                scene.add(create2DLabel(key, value.label, 'min', value.min, layerIndex, value.unit));
                                scene.add(create2DLabel(key, value.label, 'med', value.med, layerIndex, value.unit));
                                scene.add(create2DLabel(key, value.label, 'max', value.max, layerIndex, value.unit));
                            }
                        } else if (conf.labelsRendering === "3D") {
                            scene.add(create3DLabel(key, value.label, 'current', value.current, layerIndex, value.unit));
                            if (conf.displayLabelsAll) {
                                scene.add(create3DLabel(key, value.label, 'min', value.min, layerIndex, value.unit));
                                scene.add(create3DLabel(key, value.label, 'med', value.med, layerIndex, value.unit));
                                scene.add(create3DLabel(key, value.label, 'max', value.max, layerIndex, value.unit));
                            }
                        }
                    }
                }
                zAxis -= conf.zPlaneHeight
                layerIndex++;
            }

        }

        /**
         * Create a label using CSS2DObject
         *
         * @param {string} key to keep track the label
         * @param {string} labelName label name
         * @param {string} labelType type of label
         * @param {string} labelValue label value
         * @param {number} layerIndex to keep track layers and metric inside
         * @param {string} labelUnit the unit of label
         */
        function create2DLabel(key, labelName, labelType, labelValue, layerIndex, labelUnit) {
            if (!conf.displayUnits || labelUnit === undefined) labelUnit = '';
            let div = document.createElement('div');
            div.className = 'label ' + labelName;
            if (conf.labelsFormat === 'Classic') {
                div.textContent = labelName + ' - ' + labelType + ' : ' + labelValue + ' ' + labelUnit;
                div.style.fontFamily = conf.labelCharacterFont;
                div.style.color = conf.labelColor;
                div.style.fontWeight = labelBold;
                div.style.fontStyle = conf.labelItalic;
                div.style.fontSize = conf.labelSize + "px";
            } else if (conf.labelsFormat === 'Table') {
                div.appendChild(createHtmlTable(labelName, labelType, labelValue, labelUnit));
            } else if (conf.labelsFormat === 'Json') {
                div.appendChild(createHtmlJson(labelName, labelType, labelValue, labelUnit));
            }
            const metricLabel = new CSS2DObject(div);
            metricLabel.key = key;
            metricLabel.name = labelName;
            metricLabel.dataType = labelType;
            metricLabel.layerIndex = layerIndex;
            metricLabel.labelUnit = labelUnit;
            return metricLabel;
        }

        /**
         * Return a 3d label with text sprite and webGL
         *
         * @param {string} key to keep track the label
         * @param {string} labelName label name
         * @param {string} labelType type of label
         * @param {string} labelValue label value
         * @param {number} layerIndex to keep track layers and metric inside
         * @param {string} labelUnit the unit of label
         */
        function create3DLabel(key, labelName, labelType, labelValue, layerIndex, labelUnit) {
            if (!conf.displayUnits || labelUnit === undefined) labelUnit = '';
            let metricLabel, texture;
            let x, y, z;
            x = 1.5 * (conf.labelSize);
            y = 0.75 * (conf.labelSize);
            z = 2.25 * (conf.labelSize);
            if (conf.labelsFormat === 'Classic') {
                let labelText = labelName + ' - ' + labelType + ' : ' + labelValue + ' ' + labelUnit;
                // canvas contents will be used for a texture
                texture = new THREE.Texture(createLabelCanvas(labelName, labelText));
                x = x * 1.25;
                y = y * 1.25;
                z = z * 1.25;
            } else if (conf.labelsFormat === 'Table'){
                labelDiv[labelName] = createHtmlTable(labelName, labelType, labelValue, labelUnit);
                texture = new THREE.Texture(htmlToSvg(labelDiv[labelName]));
            } else if (conf.labelsFormat === 'Json'){
                labelDiv[labelName] = createHtmlJson(labelName, labelType, labelValue, labelUnit);
                texture = new THREE.Texture(htmlToSvg(labelDiv[labelName]));
            }
            texture.minFilter = THREE.NearestFilter;
            let spriteMaterial = new THREE.SpriteMaterial({map: texture, depthWrite: false, transparent: true});
            metricLabel = new THREE.Sprite(spriteMaterial);
            metricLabel.scale.set(x, y, z);
            metricLabel.key = key;
            metricLabel.name = labelName;
            metricLabel.dataType = labelType;
            metricLabel.layerIndex = layerIndex;
            metricLabel.labelUnit = labelUnit;
            return metricLabel;

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
         * Create and update every mesh to match the latest data
         */
        function updateMeshs() {
            if (conf.mockupData) {
                newData = dataIterator.next().value;
            }
            let zAxis = conf.zPlaneInitial;
            let previousLayer = null;
            let layerIndex = 0;
            for (let layer in newData) {
                //this is the updated layer metrics
                const metrics = newData[layer].metrics;
                //this is the new total of current's
                const metricCurrentTotal = Object.values(metrics).map(item => item.current).reduce((a, b) => a + b, 0);
                //this is the new total of max's
                const metricMaxTotal = Object.values(metrics).map(item => item.max).reduce((a, b) => a + b, 0);

                //todo : status colors shall map with default colors
                const layerStatus = (metricCurrentTotal / metricMaxTotal) * 100;
                let metricsDivider;
                let metricValue = {};
                metricValue.max = layerPoints(Object.values(metrics).map(item => (conf.palindromeSize / item.max) * item.max), zAxis);
                metricValue.med = layerPoints(Object.values(metrics).map(item => (conf.palindromeSize / item.max) * item.med), zAxis);
                metricValue.min = layerPoints(Object.values(metrics).map(item => (conf.palindromeSize / item.max) * item.min), zAxis);
                metricValue.current = layerPoints(Object.values(metrics).map(item => (conf.palindromeSize / item.max) * item.current), zAxis);

                if (conf.displayMode === "dynamic") {
                    metricsDivider = "current";
                } else if (conf.displayMode === "static") {
                    metricsDivider = "max";
                } else if (conf.displayMode === "debug") {
                } else {
                    break;
                }

                const metricsNumber = Object.values(metrics).length;
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

                //update label position
                if (conf.displayLabels) {
                    let sortedLabels = scene.children.filter((item) => item.layerIndex === layerIndex);
                    for (let i = 0; i < sortedLabels.length; i++) {
                        const metricLabel = sortedLabels[i];
                        if (metrics[metricLabel.key]) {
                            const metricData = metrics[metricLabel.key];
                            const metricLabelName = metricData.label;
                            const metricLabelType = metricLabel.dataType;
                            let metricLabelUnit = metricLabel.labelUnit;
                            const metricLabelIndex = Object.keys(metrics).indexOf(metricLabel.key);
                            const metricLabelValue = Object.values(metrics)[metricLabelIndex][metricLabelType].toFixed();
                            const labelPositions = metricValue[metricLabelType][metricLabelIndex];
                            if (debug === true) {
                                debug = false;
                            }
                            // display units in label
                            if (!conf.displayUnits || metricLabelUnit === undefined) metricLabelUnit = '';
                            metricLabel.text = metricLabelName + ' - ' + metricLabelType + ' : ' + metricLabelValue + ' ' + metricLabelUnit;
                            if (conf.labelsRendering === "2D") {
                                if (conf.labelsFormat === "Classic") {
                                    // update text label
                                    metricLabel.element.textContent = metricLabel.text;
                                } else if (conf.labelsFormat === "Table") {
                                    // update table
                                    let htmlTable = metricLabel.element.getElementsByTagName('div').item(0).childNodes.item(0);
                                    updateHtmlTable(metricLabelValue, htmlTable);
                                } else if (conf.labelsFormat === "Json") {
                                    // update json
                                    let htmlCode = metricLabel.element.getElementsByTagName('div').item(0).childNodes.item(0);
                                    updateHtmlJson(metricLabelName, metricLabelType, metricLabelValue, metricLabelUnit, htmlCode);
                                }
                            } else if (conf.labelsRendering === "3D") {
                                //get the label texture from the material map
                                let metricLabelTexture = metricLabel.material.map.image;
                                if (conf.labelsFormat === "Classic") {
                                    //here metricLabelTexture is a canvas
                                    let labelContext = metricLabelTexture.getContext('2d')
                                    //clear the canvas
                                    labelContext.clearRect(0, 0, metricLabelTexture.width, metricLabelTexture.height);
                                    //update the canvas
                                    addMultiLineText(metricLabel.text, metricLabelTexture.width / 2, metricLabelTexture.height / 2, metricLabelTexture['textSize'], metricLabelTexture.width,labelContext );
                                    //update the three.js object material map
                                    metricLabel.material.map.needsUpdate = true;
                                } else if (conf.labelsFormat === "Table") {
                                    // here metricLabelTexture is a table svg
                                    metricLabelTexture.onload = function() {
                                        let htmlTable = labelDiv[metricLabelName].childNodes.item(0).childNodes.item(0);
                                        updateHtmlTable(metricLabelValue, htmlTable);
                                        updateSvgSrc(metricLabelTexture, labelDiv[metricLabelName]);
                                        metricLabel.material.map.needsUpdate = true;
                                    };
                                } else if (conf.labelsFormat === "Json") {
                                    // here metricLabelTexture is a json svg
                                    metricLabelTexture.onload = function() {
                                        let htmlJson = labelDiv[metricLabelName].childNodes.item(0);
                                        updateHtmlJson(metricLabelName, metricLabelType, metricLabelValue, metricLabelUnit, htmlJson);
                                        updateSvgSrc(metricLabelTexture, labelDiv[metricLabelName]);
                                        metricLabel.material.map.needsUpdate = true;
                                    };
                                }
                            }
                            metricLabel.position.set(labelPositions[0], labelPositions[2], labelPositions[1]);
                        }
                    }
                }

                //extract into create / update functions
                //draw and update sides lines and panels
                if (conf.displaySides === true) {
                    if (previousLayer !== null) {
                        const previousValueMax = layerPoints(Object.values(previousLayer).map(item => (conf.palindromeSize / item.max) * item[metricsDivider]), zAxis + conf.zPlaneMultilayer);
                        const previousPlaneLength = Object.values(previousLayer).length;
                        //adds side texture if the palindrome is more than 1 plane

                        //check if actual layer points is higher than previous ones to determine if the sides should be drawn from few to many OR from many to few
                        //for the number of sides
                        const sideDividerOdd = (metricsNumber >= previousPlaneLength) ? previousPlaneLength : metricsNumber;
                        const sideDividerEven = (metricsNumber >= previousPlaneLength) ? metricsNumber : previousPlaneLength;
                        //for the lengths of sides
                        const sideSizeOdd = (metricsNumber >= previousPlaneLength) ? metricValue[metricsDivider] : previousValueMax;
                        const sideSizeEven = (metricsNumber >= previousPlaneLength) ? previousValueMax : metricValue[metricsDivider];

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
                        //todo : describe this case
                    }
                }
                zAxis -= conf.zPlaneMultilayer;
                previousLayer = metrics;
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
            let layerStatusColor = conf.statusColorLow;
            if (conf.layerStatusControl) {
                if (value >= conf.statusRangeLow && value <= conf.statusRangeMed) {
                    return layerStatusColor;
                } else if (value > conf.statusRangeMed && value <= conf.statusRangeHigh) {
                    layerStatusColor = conf.statusColorMed;
                    return layerStatusColor;
                } else {
                    layerStatusColor = conf.statusColorHigh;
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
         * @param {*} zPlaneValue adding z plane for 3D respresentation
         */
        function layerPoints(metricValue, zPlaneValue) {
            const planepoints = [];
            for (let i = 0; i < metricValue.length; i++) {
                const points = polarTo3DPoint(i * Math.PI * 2 / metricValue.length, metricValue[i] * conf.metricMagnifier, zPlaneValue);
                planepoints.push(points);
            }
            return planepoints;
        }

        /**
         * Return a 3d point from polar coordinates in the z plane
         *
         * @param {number} angle
         * @param {number} radius
         * @param {number} zPlaneValue
         */
        function polarTo3DPoint(angle, radius, zPlaneValue) {
            return [radius * Math.cos(angle), radius * Math.sin(angle), zPlaneValue];
        }
        
        /**
         * Fit camera
         * @param {*} meshs three.js mesh
         */
        function fitCameraToObjects(meshs) {
            let tabRad = [], tabX = [], tabY = [], tabZ = [];
            //get min fov
            let vFoV = camera.getEffectiveFOV();
            let hFoV = camera.fov * camera.aspect;
            let FoV = Math.min(vFoV, hFoV) / 2;

            //get the center of position of objects
            for (let key in meshs) {
                let object = meshs[key];
                let bs = object.geometry.boundingSphere;
                tabRad.push(bs.radius);
                let vector = bs.center.clone();
                tabX.push(vector.x);
                tabY.push(vector.y);
                tabZ.push(vector.z);
            }
            // calculate the center of objects
            let x = ((Math.max.apply(Math, tabX) + Math.min.apply(Math, tabX)) / 2);
            let y = ((Math.max.apply(Math, tabY) + Math.min.apply(Math, tabY)) / 2);
            let z = ((Math.max.apply(Math, tabZ) + Math.min.apply(Math, tabZ)) / 2);
            let centerVector = new THREE.Vector3(x, y, z);

            // set camera position
            let sin = Math.sin(FoV * Math.PI / 360);
            let r = (Math.max.apply(Math, tabRad));
            let scale = (r / sin);
            let cameraDir = new THREE.Vector3();
            camera.getWorldDirection(cameraDir);
            let cameraOffs = cameraDir.clone();
            cameraOffs.multiplyScalar(-(scale + y));
            let newCameraPos = centerVector.clone().add(cameraOffs);
            camera.position.copy(newCameraPos);
        }
    }
);



