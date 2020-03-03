import * as THREE from 'three';
import {CSS2DObject} from 'three-css2drender';
import {Triangle, SimpleLine} from './ThreeGeometryObjects';
import {dataGenerator} from './mockupData';
import {initThreeObjects} from './ThreeJSBasicObjects';

const { scene, labelsRenderer, controls, renderer, camera} = initThreeObjects();

const myRequest = new Request("data.json");
	
fetch(myRequest)
.then(resp => resp.json())
.then(data => {
	displayLabelsPositions(data)
	render(data)
});

(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()

function displayLabelsPositions(data) {

	const dataIterator = dataGenerator(data);
	const nextData = dataIterator.next().value;
	let zplane = 0
	for (let metrics in nextData) {
		let metric = nextData[metrics]
		const metricTitle = Object.keys(metric);
		const metricValue = metricPoint(Object.values(metric).map(e => e.max / e.current), zplane);
		for (let idx = 0; idx < metricValue.length; idx++) {
			scene.add(createLabel(metricTitle[idx], metricValue[idx]));
		}
		zplane -= 40
	}
}

function readyToExecute (data) {
	
	const dataIterator = dataGenerator(data);
	const nextData = dataIterator.next().value;
	
	/**
	 * for (let metrics in nextData) {
	 	let metric = nextData[metrics];
		const metricValueMax = metricPoint(Object.values(metric).map(e => e.max / e.current), 20);

	  }
	 */

	const { qoeMetrics, systemMetrics } = nextData;

	//console.log(Object.keys(data).length);
	// for (let object = 0; object < Object.keys(nextData).length; object++) {
	// 	//console.log(nextData[0].innerText);
	// }

	const updatedCurrentValuesTop = metricPoint(Object.values(systemMetrics).map(e => e.max / e.current), 20);
	const updatedCurrentValuesBottom = metricPoint(Object.values(qoeMetrics).map(e => e.max / e.current), -20);

	
	
	const lineMaterial = createLineMaterial(0x000000, 1); //0xfffff
	const transparentLineMaterial = createLineMaterial(0x000000, 0);
	
	//const planeTopPointsMax = metricPoint(Object.values(systemMetrics).map(e => e.max / e.current), 20);
	const planeTopPointsMed = metricPoint(Object.values(systemMetrics).map(e => e.med / e.current), 20);
	const planeTopPointsMin = metricPoint(Object.values(systemMetrics).map(e => e.min / e.current), 20);

	//const planeBottomPointsMax = metricPoint(Object.values(qoeMetrics).map(e => e.max / e.current), -20);
	const planeBottomPointsMed = metricPoint(Object.values(qoeMetrics).map(e => e.med / e.current), -20);
	const planeBottomPointsMin = metricPoint(Object.values(qoeMetrics).map(e => e.min / e.current), -20);

	const numberOfMetricesInALayer = updatedCurrentValuesTop.length;
	const numberOfMetricesInBottomLayer = updatedCurrentValuesBottom.length;

	const planeTopPoints = [planeTopPointsMin, planeTopPointsMed, updatedCurrentValuesTop];
	const planeBottomPoints = [updatedCurrentValuesBottom, planeBottomPointsMed, planeBottomPointsMin];

	const axesHelper = new THREE.AxesHelper(40);
	scene.add(axesHelper);

	// Updating label position
	for (let i = 0; i < updatedCurrentValuesTop.length; i++) {
		const label = scene.children[i];
		label.position.set(updatedCurrentValuesTop[i][0], updatedCurrentValuesTop[i][2], updatedCurrentValuesTop[i][1])
	}

	for (let i = 0; i < updatedCurrentValuesBottom.length; i++) {
		const label = scene.children[i + 5];
		label.position.set(updatedCurrentValuesBottom[i][0], updatedCurrentValuesBottom[i][2], updatedCurrentValuesBottom[i][1])
	}

	// this loop creates lines, connectingLines, traingles
	for(let i = 0; i < numberOfMetricesInALayer; i++) {
		for(let planeTopPoint of planeTopPoints) {
			drawPlaneLine(planeTopPoint, i, numberOfMetricesInALayer, lineMaterial);
			drawPlaneConnectingLine(planeTopPoint, planeTopPoint, i, numberOfMetricesInALayer, lineMaterial);
		}
		for(let planeBottomPoint of planeBottomPoints) {
			drawPlaneLine(planeBottomPoint, i, numberOfMetricesInALayer, lineMaterial);
			drawPlaneConnectingLine(planeBottomPoint, planeBottomPoint, i, numberOfMetricesInALayer, lineMaterial);
			drawPlaneConnectingLine(updatedCurrentValuesTop, updatedCurrentValuesBottom, i, numberOfMetricesInALayer, lineMaterial);
		}
		
		const triangleFromTopToBottomForUpperLayerFrontSide = new Triangle(updatedCurrentValuesTop[i], updatedCurrentValuesTop[(i+1)  % numberOfMetricesInALayer], updatedCurrentValuesBottom[(i+1)  % numberOfMetricesInALayer], 0x4EC163);
		scene.add(triangleFromTopToBottomForUpperLayerFrontSide);
		const triangleFromBottomToTopForLowerLayerFrontSide = new Triangle(updatedCurrentValuesBottom[i], updatedCurrentValuesBottom[(i+1)  % numberOfMetricesInALayer], updatedCurrentValuesTop[(i+1)  % numberOfMetricesInALayer], 0x4EC163);
		scene.add(triangleFromBottomToTopForLowerLayerFrontSide);
		
		drawTrianglesInALayer(updatedCurrentValuesTop, planeTopPointsMed, i,numberOfMetricesInALayer, 0xFF0000);
		drawTrianglesInALayer(planeTopPointsMed, planeTopPointsMin, i,numberOfMetricesInALayer, 0x37B015);
		drawTrianglesInALayer(updatedCurrentValuesBottom, planeBottomPointsMed, i,numberOfMetricesInALayer, 0xFF0000);
		drawTrianglesInALayer(planeBottomPointsMed, planeBottomPointsMin, i,numberOfMetricesInALayer, 0x37B015);
	}
	return nextData;
}

function drawPlaneLine(planePoint, i, planePointLength, material) {
	const allPlaneLinesOfLayer = new SimpleLine(planePoint[i], planePoint[(i+1)  % planePointLength], material);
	scene.add(allPlaneLinesOfLayer);
}

function drawPlaneConnectingLine(planePropertyFrom, planePropertyTo, i, planePointLength, material) {
	const allPlaneConnectingLines = new SimpleLine(planePropertyFrom[i], planePropertyTo[(i) % planePointLength], material);
	scene.add(allPlaneConnectingLines);
}

function drawTrianglesInALayer(planePointOne, planePointTwo, i, planePointLength, color, side) {
	const triangleFromPlaneOneToTwo = new Triangle(planePointOne[i], planePointTwo[i], planePointTwo[(i+1)  % planePointLength], color, side);
	scene.add(triangleFromPlaneOneToTwo);
	const triangleFromPlaneTwoToOne = new Triangle(planePointTwo[(i+1)  % planePointLength], planePointOne[(i+1)  % planePointLength], planePointOne[(i)  % planePointLength], color, side);
	scene.add(triangleFromPlaneTwoToOne);
}
//creates labels for all mertics and displays it on their position.
 /**
  * 
  * @param {string} textContent returns labels for your parameters and displays on your 3D plane
  * @param {number} vector3 connects x&y coordinates to form lines between points
  */
function createLabel(textContent, vector3) {
	const labelDiv = document.createElement( 'div' );
	labelDiv.className = 'label';
	labelDiv.textContent = textContent;
	const metricLabel = new CSS2DObject( labelDiv );
	metricLabel.name = 'labels';
	metricLabel.position.set(vector3[0], vector3[2] + 1, vector3[1]);
	return metricLabel;
}

function render(data) {
	
	data = readyToExecute(data);
	controls.update();
	renderer.render(scene, camera);
	//remove old shits
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
 * 
 * @param {number} color takes hexadecimal color as input 
 * @param {number} opacity take float number between 1 & 0
*/
function createLineMaterial(color, opacity) {
	return new THREE.LineDashedMaterial( {
		color,
		linewidth: 3,
		transparent: true,
		opacity
	} );
}

function metricPoint(metric, zplane) {
	const planepoints = [];
	for (let i=0; i< metric.length; i++) {
		const points = findNewPoint(i*Math.PI*2/metric.length ,metric[i]*3, zplane);
		planepoints.push(points);
	}
	return planepoints;
}
/**
 * @param {number} angle angle for calculating x,y,z points on axis. 
 * @param {number} radius data values considered as radius for accuracy of coordinates
 * @param {number} zplane values for Z-axis
 */
function findNewPoint( angle, radius, zplane) {
	const x = radius * Math.cos(angle);
	const y = radius * Math.sin(angle);
	const z = zplane;
	const result = [x, y, z];
	return result;
}