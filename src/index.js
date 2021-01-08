import * as THREE from 'three';
import { CSS2DObject } from 'three-css2drender';
import { Triangle, SimpleLine } from './ThreeGeometryObjects';
import { dataGenerator } from './mockupData';
import { initThreeObjects } from './ThreeJSBasicObjects';

/**
 * @param {HTMLElement} parentElement perent element of three's renderer element
 * @param {*} conf model's configuration
 */
export default (function (parentElement, conf) {
    var debug = true;
    let lineMaterial;
    let lineMaterialTransparent;
    const meshs = {};
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
    console.log(fileContent)

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
        if (conf.displayGrid){
            displayGrid(conf.gridSize, conf.gridDivisions);
        }

        if (conf.displayLabels){
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
    function displayGrid(size, divisions){
        //var gridHelper = new THREE.GridHelper( size, divisions );
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
		if(labelsIds.includes(key) == true){
			console.warn("This layer contains two times the same metric key", [layer]);
			break;
		} else {
			labelsIds.push(key)
                	scene.add(createLabel(key, value.label, 'current', layerIndex));

                	if (conf.displayLabelsAll){
                	      scene.add(createLabel(key, value.label, 'min', layerIndex));
                	      scene.add(createLabel(key, value.label, 'med', layerIndex));
                	      scene.add(createLabel(key, value.label, 'max', layerIndex));
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
    function createLabel(key, labelName, labelType, layerIndex) {
        const labelDiv = document.createElement('div');
        labelDiv.className = 'label '+labelName;
        labelDiv.textContent = labelName;
        const metricLabel = new CSS2DObject(labelDiv);
        metricLabel.key = key;
        metricLabel.name = labelName;
        metricLabel.dataType = labelType;
        metricLabel.layerIndex = layerIndex;
        //metricLabel.position.set(vector3[0], vector3[2] + 1, vector3[1]);
        return metricLabel;
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
            metricValue.current = layerPoints(Object.values(layerMetrics).map(item =>(conf.palindromeSize / item.max) * item.current), zAxis);
            
	    if (conf.displayMode == "dynamic"){
                metricsDivider = "current";
            } else if (conf.displayMode == "static"){
                metricsDivider = "max";
            } else if (conf.displayMode == "debug"){
            } else {
                break;
            }

            const metricsNumber = Object.values(layerMetrics).length;
            const metricsPositions = [metricValue.max, metricValue.med, metricValue.min];

            //draws and update layers
            //todo number of shapes shall be dynamic
            //todo outer lines shall be optional and for all the shapes
             if (conf.displayLayers){
                for (let i = 0; i < metricsNumber; i++) {
			//draws innner layer shapes
			if (conf.layerDisplayMode == "static"){
                		drawTrianglesInALayer(layer + '_mintoMedLayerShape', metricValue.min, metricValue.med, i, metricsNumber, conf.layerMidColor);
                		drawTrianglesInALayer(layer + '_medtoMaxLayerShape', metricValue.med, metricValue.max, i, metricsNumber, layerColorDecidedByLayerStatus(layerStatus));
			} else if (conf.layerDisplayMode == "mixed"){
                		drawTrianglesInALayer(layer + '_mintoCurLayerShape', metricValue.min, metricValue.current, i, metricsNumber, conf.layerMidColor);
                		drawTrianglesInALayer(layer + '_curtoMaxLayerShape', metricValue.current, metricValue.max, i, metricsNumber, layerColorDecidedByLayerStatus(layerStatus));
			}
			//todo : implement better behavior to see ranges
			else if (conf.layerDisplayMode == "dynamic"){
                		drawTrianglesInALayer(layer + '_mintoCurLayerShape', metricValue.min, metricValue.current, i, metricsNumber, conf.layerMidColor);
			}

                }
            }

            //draws and update layers outline
             if (conf.displayLayersLines){
                for (let i = 0; i < metricsNumber; i++) {
                    for (let [index, metricsPosition] of metricsPositions.entries()) {
                        //draws outside lines
                        drawLayerOutline(layer + '_layerShapesEdges', metricsPosition, i, metricsNumber, lineMaterial, index);
                    }
                }
            }

            //update labels
            if (conf.displayLabels){
                const sortedLabels = scene.children.filter((item) => item.layerIndex == layerIndex)
                //todo : check if iteration over metricsnumber could make sense
                 //for (let i = 0;  i <  metricsNumber; i++) {
                    //const label = sortedLabels[i];
                    //todo last : modify the current setting point for labels, currently set at the maxpoint
                    //label.position.set(metricValueCurrent[i][0], metricValueCurrent[i][2], metricValueCurrent[i][1]);
                    //label.position.set(metricValueMax[i][0], metricValueMax[i][2], metricValueMax[i][1]);
                    //label.element.innerHTML = '<table><ul><li>My real name is : '+label.name+'</li><li>'+Object.values(layerMetrics)[i].label + " " + Object.values(layerMetrics)[i].current.toFixed();+'</li></ul></table>';
                //}
                for (let i = 0; i < sortedLabels.length; i++){
                    const label = sortedLabels[i];
                    if (layerMetrics[label.key]){
                        const labelData = layerMetrics[label.key];
                        const labelDataName = labelData.label;
                        const labelDataType = label.dataType;
                        const labelDataIndex = Object.keys(layerMetrics).indexOf(label.key);
                        const labelDataValue =  Object.values(layerMetrics)[labelDataIndex][labelDataType].toFixed();
                        const labelPositions = metricValue[labelDataType][labelDataIndex];
                        if (debug == true){
			    console.log(layer)
			    console.log(layerIndex)
                            console.log(layerMetrics)
                            console.log(sortedLabels)
                            console.log(label)
                            console.log(metricValue)
                            console.log(labelDataType)
                            console.log(metricValue[labelDataType])
                            debug = false;
                        }
                        label.position.set(labelPositions[0], labelPositions[2], labelPositions[1]);
                        label.element.innerHTML =
                        '<table><ul><li><b>'+labelDataName+'</b> - '+labelDataType+' : '+labelDataValue+'</li>'+
                        '</ul></table>';
                    }
                }
            }
                        //)
            //extract into create / update functions
            //draw and update sides lines and panels
            //tood : check why displayDides is broken
            if (conf.displaySides === true){

                if (previousLayer !== null) {
                    const previousValueMax = layerPoints(Object.values(previousLayer).map(item =>  (conf.palindromeSize / item.max) * item[metricsDivider]), zAxis + conf.zplane.zplaneMultilayer);
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
                            meshs['side-top-left-pane' + layer + i].update(calc3, calc1,calc4)
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
                    //console.log("this happens")
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



