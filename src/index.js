import * as THREE from 'three';
import {CSS2DObject} from 'three-css2drender';
import {Triangle, SimpleLine} from './ThreeGeometryObjects';
import {dataGenerator} from './mockupData';
import {initThreeObjects} from './ThreeJSBasicObjects';
import {baseData} from './baseData';

const { scene, labelsRenderer, controls, renderer, camera} = initThreeObjects();

const filePath = "data.json"
const fileContent = new Request(filePath)
run(fileContent)

async function run(content) {
	const result = await fetch(content)
	let data
	try {
		data = await result.json()
	} catch(error) {
		data = baseData()
	}
	displayLabels(data)
	render(data)
}

let configuration = {
	layerStatusControl : true,
	displayOption1: true,
	displayOption2: false,
	metricMagnifier: 5,
	layerMidColor : 0xDFDF0B,
	mainAppColor : 0x4EC163,
	subAppColor : 0x9FC5E8,
	statusRange : {
		low : 0,
		med : 30,
		high: 60
	},
	statusColor : {
		low : 0x9FC5E8,
		med : 0x00FF00,
		high : 0xFF0000
	},
	line :{
		lineColor : 0x000000,
		lineOpacity : 1,
		lineTranparency : 0.5,
		lineWidth : 3
	},
	zplane : {
		zplaneInitial : 20,
		zplaneHeight : 40,
		zplaneMultilayer : 30
	}
}

function displayLabels(data) {
	const dataIterator = dataGenerator(data);
	const newData = dataIterator.next().value;
	let zAxis = configuration.zplane.zplaneInitial;
	let layerIndex = 0;
	for (let layer in newData) {
		let metric = newData[layer].metrics
		const metricTitles = Object.keys(metric);
		const metricValues = metricPoint(Object.values(metric).map(item => item.max / item.current), zAxis);
		for (let idx = 0; idx < metricValues.length; idx++) {
			scene.add(createLabel(metricTitles[idx], metricValues[idx], layerIndex));
		}
		zAxis -= configuration.zplane.zplaneHeight
		layerIndex++;
	}
}

function readyToExecute (data) {
	const dataIterator = dataGenerator(data);
	const newData = dataIterator.next().value;
	const lineMaterial = createLineMaterial(configuration.line.lineColor, configuration.line.lineOpacity);
	const lineMaterialTransparent = createLineMaterial(configuration.mainAppColor, configuration.line.lineTranparency);
	
	let zAxis = configuration.zplane.zplaneInitial;
	let previousLayer = null;
	let layerIndex = 0;
	for (let layer in newData) {
		let metric = newData[layer].metrics;
		const metricValueMax = metricPoint(Object.values(metric).map(item => item.max / item.current), zAxis);
		const metricValueMed = metricPoint(Object.values(metric).map(item => item.med / item.current), zAxis);
		const metricValueMin = metricPoint(Object.values(metric).map(item => item.min / item.current), zAxis);
		const max = Object.values(metric).map(item => item.max).reduce((a, b) => a + b, 0);
		const current = Object.values(metric).map(item => item.current).reduce((a, b) => a + b, 0);
		const layerStatus = (current/max)*100;
		console.log(layerStatus);
		const planeLength = Object.values(metric).length;
		const planePoints = [metricValueMax, metricValueMed, metricValueMin];
		if (previousLayer !== null) {
			const previousValueMax = metricPoint(Object.values(previousLayer).map(item => item.max / item.current), zAxis + configuration.zplane.zplaneMultilayer);
			const previousPlaneLength = Object.values(previousLayer).length;
			if (planeLength >= previousPlaneLength) {
				for(let i = 0; i < planeLength; i++) { 
					scene.add(
						new SimpleLine(metricValueMax[i], previousValueMax[(i+1) % previousPlaneLength], lineMaterialTransparent),
						new SimpleLine(metricValueMax[(i+1) % planeLength], previousValueMax[(i+1) % previousPlaneLength], lineMaterial),
						new Triangle(metricValueMax[i], metricValueMax[(i+1)  % planeLength], previousValueMax[(i+1)  % previousPlaneLength], configuration.mainAppColor),
						new Triangle(previousValueMax[(i)  % previousPlaneLength], previousValueMax[(i+1)  % previousPlaneLength], metricValueMax[(i)  % planeLength], configuration.mainAppColor)
						)
				}
			}
			else {
				for(let i = 0; i < previousPlaneLength; i++) { 
					scene.add(
						new SimpleLine(previousValueMax[i], metricValueMax[(i+1)  % planeLength], lineMaterialTransparent),
						new SimpleLine(previousValueMax[(i+1) % previousPlaneLength], metricValueMax[(i+1) % planeLength], lineMaterial),
						new Triangle(metricValueMax[(i)  % planeLength], metricValueMax[(i+1)  % planeLength], previousValueMax[(i)  % previousPlaneLength], configuration.mainAppColor),
						new Triangle(previousValueMax[(i)  % previousPlaneLength], previousValueMax[(i+1)  % previousPlaneLength], metricValueMax[(i+1)  % planeLength], configuration.mainAppColor)
					)
				}
			}
		}
		for(let i = 0; i < planeLength; i++) {
			for(let planePoint of planePoints) {
				drawPlaneLine(planePoint, i, planeLength, lineMaterial);
			}
			drawTrianglesInALayer(metricValueMax, metricValueMed, i,planeLength, layerColorDecidedByLayerStatus(layerStatus));
			drawTrianglesInALayer(metricValueMed, metricValueMin, i,planeLength, configuration.layerMidColor);
		}
		const sortedLabels = scene.children.filter((item) => item.layerIndex == layerIndex)
		for (let i = 0; i < planeLength; i++) {
			const label = sortedLabels[i];
			label.position.set(metricValueMax[i][0], metricValueMax[i][2], metricValueMax[i][1]);
		}
		
		zAxis -= configuration.zplane.zplaneMultilayer;
		previousLayer = metric;
		layerIndex++;
	}
	return newData;
}

function readyToExecute2 (data) {
	
	const dataIterator = dataGenerator(data);
	const newData = dataIterator.next().value;
	const lineMaterial = createLineMaterial(configuration.line.lineColor, configuration.line.lineOpacity);
	const lineMaterialTransparent = createLineMaterial(configuration.mainAppColor, configuration.line.lineTranparency);
	
	let zAxis = configuration.zplane.zplaneInitial;
	let previousLayer = null;
	let layerIndex = 0;
	for (let layer in newData) {
		let metric = newData[layer].metrics;
		const metricValueMax = metricPoint(Object.values(metric).map(item => item.max /100), zAxis);
		const metricValueCurrent = metricPoint(Object.values(metric).map(item => item.current/100), zAxis);
		const metricValueMin = metricPoint(Object.values(metric).map(item => item.min/100), zAxis);
		const max = Object.values(metric).map(item => item.max).reduce((a, b) => a + b, 0);
		const current = Object.values(metric).map(item => item.current).reduce((a, b) => a + b, 0);
		const layerStatus = (current/max)*100;
		console.log(layerStatus);
		const planeLength = Object.values(metric).length;
		const planePoints = [metricValueMax, metricValueCurrent, metricValueMin];
		if (previousLayer !== null) {
			const previousValueMax = metricPoint(Object.values(previousLayer).map(item => item.max /100), zAxis + configuration.zplane.zplaneMultilayer);
			const previousPlaneLength = Object.values(previousLayer).length;
			if (planeLength >= previousPlaneLength) {
				for(let i = 0; i < planeLength; i++) { 
					scene.add(
						new SimpleLine(metricValueMax[i], previousValueMax[(i+1) % previousPlaneLength], lineMaterialTransparent),
						new SimpleLine(metricValueMax[(i+1) % planeLength], previousValueMax[(i+1) % previousPlaneLength], lineMaterial),
						new Triangle(metricValueMax[i], metricValueMax[(i+1)  % planeLength], previousValueMax[(i+1)  % previousPlaneLength], configuration.mainAppColor),
						new Triangle(previousValueMax[(i)  % previousPlaneLength], previousValueMax[(i+1)  % previousPlaneLength], metricValueMax[(i)  % planeLength], configuration.mainAppColor)
						)
				}
			}
			else {
				for(let i = 0; i < previousPlaneLength; i++) { 
					scene.add(
						new SimpleLine(previousValueMax[i], metricValueMax[(i+1)  % planeLength], lineMaterialTransparent),
						new SimpleLine(previousValueMax[(i+1) % previousPlaneLength], metricValueMax[(i+1) % planeLength], lineMaterial),
						new Triangle(metricValueMax[(i)  % planeLength], metricValueMax[(i+1)  % planeLength], previousValueMax[(i)  % previousPlaneLength], configuration.mainAppColor),
						new Triangle(previousValueMax[(i)  % previousPlaneLength], previousValueMax[(i+1)  % previousPlaneLength], metricValueMax[(i+1)  % planeLength], configuration.mainAppColor)
					)
				}
			}
		}
		for(let i = 0; i < planeLength; i++) {
			for(let planePoint of planePoints) {
				drawPlaneLine(planePoint, i, planeLength, lineMaterial);
			}
			drawTrianglesInALayer(metricValueMax, metricValueCurrent, i,planeLength, layerColorDecidedByLayerStatus(layerStatus));
			drawTrianglesInALayer(metricValueCurrent, metricValueMin, i,planeLength, configuration.layerMidColor);
		}
		const sortedLabels = scene.children.filter((item) => item.layerIndex == layerIndex)
		for (let i = 0; i < planeLength; i++) {
			const label = sortedLabels[i];
			label.position.set(metricValueMax[i][0], metricValueMax[i][2], metricValueMax[i][1]);
		}
		zAxis -= configuration.zplane.zplaneMultilayer;
		previousLayer = metric;
		layerIndex++;
	}
	return newData;
}

function drawPlaneLine(planePoint, i, planePointLength, material) {
	scene.add(new SimpleLine(planePoint[i], planePoint[(i+1)  % planePointLength], material))
}

function layerColorDecidedByLayerStatus(value) {
	let layerStatusColor = configuration.statusColor.min;
	if (configuration.layerStatusControl) {
		if (value >= configuration.statusRange.low && value <= configuration.statusRange.med ){
			return layerStatusColor;
		}
		else if (value > configuration.statusRange.med && value <= configuration.statusRange.high) {
			layerStatusColor = configuration.statusColor.med;
			return layerStatusColor;
		}
		else{
			layerStatusColor = configuration.statusColor.high;
			return layerStatusColor;
		}
	}
}

function drawTrianglesInALayer(planePointOne, planePointTwo, i, planePointLength, color, side) {
	scene.add(
		new Triangle(planePointOne[i], planePointTwo[i], planePointTwo[(i+1)  % planePointLength], color, side),
		new Triangle(planePointTwo[(i+1)  % planePointLength], planePointOne[(i+1)  % planePointLength], planePointOne[(i)  % planePointLength], color, side)
		)
}

/**
 * @param {string} textContent to get label of our metric point
 * @param {number} vector3 coordinates of our metric point on the plane
 * @param {number} layerIndex to keep track or layers and metric inside
 */
function createLabel(textContent, vector3, layerIndex) {
	const labelDiv = document.createElement( 'div' );
	labelDiv.className = 'label';
	labelDiv.textContent = textContent;
	const metricLabel = new CSS2DObject( labelDiv );
	metricLabel.name = 'labels';
	metricLabel.layerIndex = layerIndex;
	metricLabel.position.set(vector3[0], vector3[2] + 1, vector3[1]);
	return metricLabel;
}

/**
 * @param {data} data rendering data constantly with new instance of data in animation loop
 */
function render(data) {
	if(configuration.displayOption1) {
		data = readyToExecute(data);
	} else if (configuration.displayOption2) {
		data = readyToExecute2(data);
	}
	controls.update();
	renderer.render(scene, camera);
	//remove objects from scene except labels
	for( let i = scene.children.length - 1; i >= 0; i--) { 
		let obj = scene.children[i];
		let undeletedObject = scene.getObjectByName("labels");
		if (obj.name !== 'labels' && undeletedObject !== obj) {
			scene.remove(obj);
			continue
		}
	}	
	labelsRenderer.render( scene, camera );
	requestAnimationFrame(() => render(data));
}

/**
 * @param {string} color hexadecimal color value for line color
 * @param {number} opacity to define line opacity incase of transparent or solid lines
 */
function createLineMaterial(color, opacity) {
	return new THREE.LineDashedMaterial( {
		color,
		linewidth: configuration.line.lineWidth,
		opacity
	} );
}

/**
 * @param {number} metric value is required from to data to map on x,y plane
 * @param {number} zplaneValue adding z plane for 3D respresentation
 */
function metricPoint(metric, zplaneValue) {
	const planepoints = [];
	for (let i=0; i< metric.length; i++) {
		const points = findNew3DPoint(i*Math.PI*2/metric.length ,metric[i]*configuration.metricMagnifier, zplaneValue);
		planepoints.push(points);
	}
	return planepoints;
}

function findNew3DPoint( angle, radius, zplaneValue) {
	return [radius * Math.cos(angle), /*angle for calculating x,y,z points on axis*/
		radius * Math.sin(angle), /*data values considered as radius for accuracy of coordinates*/
		zplaneValue]					/*values for Z-axis*/
}
		
// var initAnimationUI = true;
// var runAnimation = false;
// var isPlay = false;
// var startButton = document.getElementById( 'startButtonId' );
// var resetButton = document.getElementById( 'resetButtonId' );
// window.onload = function () {
// 	startButton.onclick = function StartAnimation() {
	
// 		if (initAnimationUI) {
// 		  initAnimationUI = false;
// 		  runAnimation = true;
// 		}
// 		// Start and Pause 
// 		if (runAnimation) { 
// 		  startButton.innerHTML = 'Pause';
// 		  runAnimation = false;
// 		  isPlay = true;
// 		  render(data)
// 		  } else {
// 				startButton.innerHTML = 'Restart';
// 				runAnimation = true;
// 				isPlay = false;
// 		}
// 	}
// }()

// window.onload = function () {
// 	resetButton.onclick = function ResetParameters() {
	
// 		// Set StartButton to Start  
// 		startButton.innerHTML = 'Start';
		
// 		// Boolean for Stop Animation
// 		initAnimationUI = true;
// 		runAnimation = false;
// 		theta = 0;
// 		isPlay = false;
// 		render(data);
// 	}
// }