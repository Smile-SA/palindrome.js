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
	function displayGrid(size = 50, divisions = 50){
		var gridHelper = new THREE.GridHelper( size, divisions );
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
			let metric = data[layer].metrics;
			
			for (const [key, value] of Object.entries(metric)) {
				const labelValue = layerPoints((value.max / value.current), zAxis);
				//const labelValueMin = layerPoints((value.max / value.med), zAxis);
			  	scene.add(createLabel(value.label, labelValue, layerIndex));
			  	//scene.add(createLabel(value.label, labelValueMin, layerIndex));
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
	function createLabel(textContent, vector3, layerIndex) {
		const labelDiv = document.createElement('div');
		labelDiv.className = 'label';
		labelDiv.textContent = textContent;
		const metricLabel = new CSS2DObject(labelDiv);
		metricLabel.name = 'labels';
		metricLabel.layerIndex = layerIndex;
		metricLabel.position.set(vector3[0], vector3[2] + 1, vector3[1]);
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
				
			if (debug == true) {
				console.log(layerMetrics)
				debug = false;
			}

			if (conf. displayMode == "dynamic"){
				//todo homogeneize metric set min, med, max, current
				//todo save previous value to add trend-like ?
				var metricValueMax = layerPoints(Object.values(layerMetrics).map(item => item.max / item.current), zAxis);
				var metricValueMed = layerPoints(Object.values(layerMetrics).map(item => item.med / item.current), zAxis);
				var metricValueMin = layerPoints(Object.values(layerMetrics).map(item => item.min / item.current), zAxis);

				//below an attempt at assigning the right values
				//var metricValueMax = layerPoints(Object.values(layerMetrics).map(item => item.max), zAxis);
				//var metvar metricValueMed = layerPoints(Object.values(layerMetrics).map(item => item.med), zAxis);
				//var metvar metricValueMin = layerPoints(Object.values(layerMetrics).map(item => item.min), zAxis);
				var metricValueCurrent = layerPoints(Object.values(layerMetrics).map(item => item.current), zAxis);
				if (debug == true) {
					console.log(metricValueMax,metricValueMed,metricValueMin,metricValueCurrent)
					debug = false;
				}
				metricsDivider = "item.current";

			} else if (conf.displayMode == "fixed"){
				var metricValueMax = layerPoints(Object.values(layerMetrics).map(item => item.max / 150), zAxis);
				var metricValueMed = layerPoints(Object.values(layerMetrics).map(item => item.current / 150), zAxis);
				var metricValueMin = layerPoints(Object.values(layerMetrics).map(item => item.min / 150), zAxis);
				metricsDivider = 150;
			} else if (conf.displayMode == "debug"){
				var metricValueMaxDyn = layerPoints(Object.values(layerMetrics).map(item => item.max / item.current), zAxis);
				var metricValueMedDyn = layerPoints(Object.values(layerMetrics).map(item => item.med / item.current), zAxis);
				var metricValueMinDyn = layerPoints(Object.values(layerMetrics).map(item => item.min / item.current), zAxis);

				var metricValueMaxFix = layerPoints(Object.values(layerMetrics).map(item => item.max / 150), zAxis);
				var metricValueMedFix = layerPoints(Object.values(layerMetrics).map(item => item.current / 150), zAxis);
				var metricValueMinFix = layerPoints(Object.values(layerMetrics).map(item => item.min / 150), zAxis);

				var metricValueMax = layerPoints(Object.values(layerMetrics).map(item => item.current / item.max), zAxis);
				var metricValueMed = layerPoints(Object.values(layerMetrics).map(item => 0), zAxis);
				var metricValueMin = layerPoints(Object.values(layerMetrics).map(item => 0), zAxis);	
				
				if (debug == true){
					console.log(metricValueMaxDyn)
                                	console.log(metricValueMedDyn)
                                	console.log(metricValueMinDyn)
                                	console.log(metricValueMaxFix)
                                	console.log(metricValueMedFix)
                                	console.log(metricValueMinFix)
                                	console.log(metricValueMax)
                                	console.log(metricValueMed)
                                	console.log(metricValueMin)
					debug = false;
				}

			} else { 
				break;
			}
				
			const metricsNumber = Object.values(layerMetrics).length;
			const metricsPositions = [metricValueMax, metricValueMed, metricValueMin];

			//draws and update layers
			//todo number of shapes shall be dynamic
			//todo outer lines shall be optional and for all the shapes
			if (conf.displayLayers){
				for (let i = 0; i < metricsNumber; i++) {
					for (let metricPosition of metricsPositions) {
						//draws outside lines
						//question : why is this limited to the inner layer ?
						drawInnerLayerOutline(layer + '_layerShapesEdges', metricPosition, i, metricsNumber, lineMaterial);
					}
					//draws innner layer shapes
					//drawTrianglesInALayer(layer + '_innerLayerShape', metricValueMin, metricValueMed, i, metricsNumber, "#FF0000");
					//drawTrianglesInALayer(layer + '_outerLayerShape', metricValueMed, metricValueMin, i, metricsNumber, "#000000");
					drawTrianglesInALayer(layer + '_minToMedLayerShape', metricValueMin, metricValueMed, i, metricsNumber, conf.layerMidColor);
					drawTrianglesInALayer(layer + '_medtoMaxLayerShape', metricValueMed, metricValueMax, i, metricsNumber, layerColorDecidedByLayerStatus(layerStatus));
				}
			}

			//update labels
			if (conf.displayLabels){
				const sortedLabels = scene.children.filter((item) => item.layerIndex == layerIndex)
				for (let i = 0; i <  metricsNumber; i++) {
					const label = sortedLabels[i];
					//todo last : modify the current setting point for labels, currently set at the maxpoint
					label.position.set(metricValueMax[i][0], metricValueMax[i][2], metricValueMax[i][1]);
					label.element.innerHTML = '<table><ul><li>'+Object.values(layerMetrics)[i].label + " " + Object.values(layerMetrics)[i].current.toFixed();+'</li></ul></table>';
				}
			}

			//extract into create / update functions
			//draw and update sides lines and panels
			//tood : check why displayDides is broken
			if (conf.displaySides === true){
				if (previousLayer !== null) {
					const previousValueMax = layerPoints(Object.values(previousLayer).map(item => item.max / eval(metricsDivider)), zAxis + conf.zplane.zplaneMultilayer);
					const previousPlaneLength = Object.values(previousLayer).length;
					//adds side texture if the palindrome is more than 1 plane

					//checks if actual layer points is higher than previous ones to determine if the sides should be drawn from few to many OR from many to few
					//for the number of sides
					const sideDividerOdd = (metricsNumber >= previousPlaneLength) ? previousPlaneLength : metricsNumber;
					const sideDividerEven = (metricsNumber >= previousPlaneLength) ? metricsNumber : previousPlaneLength;
					//for the lengths of sides
					const sideSizeOdd = (metricsNumber >= previousPlaneLength) ? metricValueMax : previousValueMax;
					const sideSizeEven = (metricsNumber >= previousPlaneLength) ? previousValueMax : metricValueMax;
					
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
	function drawInnerLayerOutline(layer, planePoint, i, planePointLength, material) {
		if (meshs['_innerLayerOutline' + layer + i]) {
			// if init done
			meshs['_innerLayerOutline' + layer + i].update(planePoint[i], planePoint[(i + 1) % planePointLength])
		} else {
			//init objects
			meshs['_innerLayerOutline' + layer + i] = new SimpleLine(planePoint[i], planePoint[(i + 1) % planePointLength], material);
			scene.add(meshs['_innerLayerOutline' + layer + i]);
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
