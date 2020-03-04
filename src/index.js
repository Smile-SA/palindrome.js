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
	displayLabels(data)
	render(data)
});

(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()

function displayLabels(data) {

	const dataIterator = dataGenerator(data);
	const nextData = dataIterator.next().value;
	let zplane = 20;
	let layer = 0;
	for (let metrics in nextData) {
		let metric = nextData[metrics]
		const metricTitle = Object.keys(metric);
		const metricValue = metricPoint(Object.values(metric).map(e => e.max / e.current), zplane);
		for (let idx = 0; idx < metricValue.length; idx++) {
			scene.add(createLabel(metricTitle[idx], metricValue[idx], layer));
		}
		zplane -= 40
		layer++;
	}
}

function readyToExecute (data) {
	
	const dataIterator = dataGenerator(data);
	const nextData = dataIterator.next().value;
	const axesHelper = new THREE.AxesHelper(40);
	scene.add(axesHelper);
	const lineMaterial = createLineMaterial(0x000000, 1);
	
	let zplane = 20;
	let previousLayer = null;
	 let layer = 0;
	 for (let metrics in nextData) {
		let metric = nextData[metrics];
		const metricValueMax = metricPoint(Object.values(metric).map(e => e.max / e.current), zplane);
		const metricValueMed = metricPoint(Object.values(metric).map(e => e.med / e.current), zplane);
		const metricValueMin = metricPoint(Object.values(metric).map(e => e.min / e.current), zplane);

		const planeLength = Object.values(metric).length;
		const planePoints = [metricValueMax, metricValueMed, metricValueMin];
		// let previousValueMax
		// let previousValueMed
		// let previousValueMin
		// if (previousLayer !== null) {

		// 	previousValueMax = metricPoint(Object.values(previousLayer).map(e => e.max / e.current), zplane);
		// 	previousValueMed = metricPoint(Object.values(previousLayer).map(e => e.med / e.current), zplane);
		// 	previousValueMin = metricPoint(Object.values(previousLayer).map(e => e.min / e.current), zplane);
			
		// 	// const previousPlaneLength = Object.values(previousLayer).length;
		// 	// const previousPlanePoints = [previousValueMax, previousValueMed, previousValueMin];
		// }
		 for(let i = 0; i < planeLength; i++) {
			for(let planePoint of planePoints) {
				//console.log(previousLayer)
				drawPlaneLine(planePoint, i, planeLength, lineMaterial);
				// if (previousLayer !== null) {
				// 	//drawPlaneConnectingLine(previousValueMax, metricValueMax, i, planeLength, lineMaterial);
				// }
			}
			drawTrianglesInALayer(metricValueMax, metricValueMed, i,planeLength, 0xFF0000);
			drawTrianglesInALayer(metricValueMed, metricValueMin, i,planeLength, 0x37B015);
		}
		const sortedLabels = scene.children.filter((item) => item.layer == layer)
		for (let i = 0; i < planeLength; i++) {
			const label = sortedLabels[i];
			label.position.set(metricValueMax[i][0], metricValueMax[i][2], metricValueMax[i][1])
			}
			// for(let i = 0; i < planeLength; i++) {
				// 	drawPlaneConnectingLine(previousValueMax, metricValueMax, i, planeLength, lineMaterial);
				// }
				
		zplane -= 40;
		previousLayer = metric
		layer++;
	}
	
	//0xfffff
	// const { qoeMetrics, systemMetrics } = nextData;
	// const planeTopPointsMax = metricPoint(Object.values(systemMetrics).map(e => e.max / e.current), 20);
	// const planeTopPointsMed = metricPoint(Object.values(systemMetrics).map(e => e.med / e.current), 20);
	// const planeTopPointsMin = metricPoint(Object.values(systemMetrics).map(e => e.min / e.current), 20);
	// const planeBottomPointsMax = metricPoint(Object.values(qoeMetrics).map(e => e.max / e.current), -20);
	// const planeBottomPointsMed = metricPoint(Object.values(qoeMetrics).map(e => e.med / e.current), -20);
	// const planeBottomPointsMin = metricPoint(Object.values(qoeMetrics).map(e => e.min / e.current), -20);
	// const transparentLineMaterial = createLineMaterial(0x000000, 0);	// const numberOfMetricesInBottomLayer = planeBottomPointsMax.length;
	// const numberOfMetricesInALayer = planeTopPointsMax.length;
	
	// const planeTopPoints = [planeTopPointsMin, planeTopPointsMed, planeTopPointsMax];
	// const planeBottomPoints = [planeBottomPointsMax, planeBottomPointsMed, planeBottomPointsMin];

	
	// // this loop creates lines, connectingLines, traingles
	// for(let i = 0; i < numberOfMetricesInALayer; i++) {
	// 	for(let planeTopPoint of planeTopPoints) {
	// 		drawPlaneLine(planeTopPoint, i, numberOfMetricesInALayer, lineMaterial);
	// 		drawPlaneConnectingLine(planeTopPoint, planeTopPoint, i, numberOfMetricesInALayer, lineMaterial);
	// 	}
	// 	for(let planeBottomPoint of planeBottomPoints) {
	// 		drawPlaneLine(planeBottomPoint, i, numberOfMetricesInALayer, lineMaterial);
	// 		drawPlaneConnectingLine(planeBottomPoint, planeBottomPoint, i, numberOfMetricesInALayer, lineMaterial);
	// 		drawPlaneConnectingLine(planeTopPointsMax, planeBottomPointsMax, i, numberOfMetricesInALayer, lineMaterial);
	// 	}
		
	// 	const triangleFromTopToBottomForUpperLayerFrontSide = new Triangle(planeTopPointsMax[i], planeTopPointsMax[(i+1)  % numberOfMetricesInALayer], planeBottomPointsMax[(i+1)  % numberOfMetricesInALayer], 0x4EC163);
	// 	scene.add(triangleFromTopToBottomForUpperLayerFrontSide);
	// 	const triangleFromBottomToTopForLowerLayerFrontSide = new Triangle(planeBottomPointsMax[i], planeBottomPointsMax[(i+1)  % numberOfMetricesInALayer], planeTopPointsMax[(i)  % numberOfMetricesInALayer], 0x4EC163);
	// 	scene.add(triangleFromBottomToTopForLowerLayerFrontSide);
		
	// 	drawTrianglesInALayer(planeTopPointsMax, planeTopPointsMed, i,numberOfMetricesInALayer, 0xFF0000);
	// 	drawTrianglesInALayer(planeTopPointsMed, planeTopPointsMin, i,numberOfMetricesInALayer, 0x37B015);
	// 	drawTrianglesInALayer(planeBottomPointsMax, planeBottomPointsMed, i,numberOfMetricesInALayer, 0xFF0000);
	// 	drawTrianglesInALayer(planeBottomPointsMed, planeBottomPointsMin, i,numberOfMetricesInALayer, 0x37B015);
	// }
	// // Updating label position
	// for (let i = 0; i < planeTopPointsMax.length; i++) {
	// 	const label = scene.children[i];
	// 	label.position.set(planeTopPointsMax[i][0], planeTopPointsMax[i][2], planeTopPointsMax[i][1])
	// }

	// for (let i = 0; i < planeBottomPointsMax.length; i++) {
	// 	const label = scene.children[i + 5];
	// 	label.position.set(planeBottomPointsMax[i][0], planeBottomPointsMax[i][2], planeBottomPointsMax[i][1])
	// }
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

function createLabel(textContent, vector3, layer) {
	const labelDiv = document.createElement( 'div' );
	labelDiv.className = 'label';
	labelDiv.textContent = textContent;
	const metricLabel = new CSS2DObject( labelDiv );
	metricLabel.name = 'labels';
	metricLabel.layer = layer;
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