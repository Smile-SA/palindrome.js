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
		displayLabels(data);
		render(data);
	}

	/**
	 * Create labels for each metrics 
	 * 
	 * @param {*} data dataObject (conf.data)
	 */
	function displayLabels(data) {
		let zAxis = conf.zplane.zplaneInitial;
		let layerIndex = 0;

		for (let layer in data) {
			let metric = data[layer].metrics
			const metricTitles = Object.keys(metric);
			const metricValues = metricPoint(Object.values(metric).map(item => item.max / item.current), zAxis);

			for (let idx = 0; idx < metricValues.length; idx++) {
				scene.add(createLabel(metricTitles[idx], metricValues[idx], layerIndex));
			}

			zAxis -= conf.zplane.zplaneHeight
			layerIndex++;
		}
	}

	/**
	 * Update every mesh to match the latest data
	 */
	function updateMeshs() {
		if (conf.mockupData) {
			newData = dataIterator.next().value;
		}

		let zAxis = conf.zplane.zplaneInitial;
		let previousLayer = null;
		let layerIndex = 0;

		if (conf.displayOption === 'one') {
			for (let layer in newData) {
				const metric = newData[layer].metrics;
				const metricValueMax = metricPoint(Object.values(metric).map(item => item.max / item.current), zAxis);
				const metricValueMed = metricPoint(Object.values(metric).map(item => item.med / item.current), zAxis);
				const metricValueMin = metricPoint(Object.values(metric).map(item => item.min / item.current), zAxis);
				const max = Object.values(metric).map(item => item.max).reduce((a, b) => a + b, 0);
				const current = Object.values(metric).map(item => item.current).reduce((a, b) => a + b, 0);
				const layerStatus = (current / max) * 100;

				const planeLength = Object.values(metric).length;
				const planePoints = [metricValueMax, metricValueMed, metricValueMin];
				if (previousLayer !== null) {
					const previousValueMax = metricPoint(Object.values(previousLayer).map(item => item.max / item.current), zAxis + conf.zplane.zplaneMultilayer);
					const previousPlaneLength = Object.values(previousLayer).length;
					if (planeLength >= previousPlaneLength) {
						for (let i = 0; i < planeLength; i++) {
							if (meshs['0' + layer + i]) {
								// if init done
								meshs['0' + layer + i].update(metricValueMax[i], previousValueMax[(i + 1) % previousPlaneLength])
								meshs['1' + layer + i].update(metricValueMax[(i + 1) % planeLength], previousValueMax[(i + 1) % previousPlaneLength])
								meshs['2' + layer + i].update(metricValueMax[i], metricValueMax[(i + 1) % planeLength], previousValueMax[(i + 1) % previousPlaneLength])
								meshs['3' + layer + i].update(previousValueMax[(i) % previousPlaneLength], previousValueMax[(i + 1) % previousPlaneLength], metricValueMax[(i) % planeLength])
							} else {
								//init objects
								meshs['0' + layer + i] = new SimpleLine(metricValueMax[i], previousValueMax[(i + 1) % previousPlaneLength], lineMaterialTransparent);
								scene.add(meshs['0' + layer + i]);
								meshs['1' + layer + i] = new SimpleLine(metricValueMax[(i + 1) % planeLength], previousValueMax[(i + 1) % previousPlaneLength], lineMaterial);
								scene.add(meshs['1' + layer + i]);
								meshs['2' + layer + i] = new Triangle(metricValueMax[i], metricValueMax[(i + 1) % planeLength], previousValueMax[(i + 1) % previousPlaneLength], conf.mainAppColor);
								scene.add(meshs['2' + layer + i]);
								meshs['3' + layer + i] = new Triangle(previousValueMax[(i) % previousPlaneLength], previousValueMax[(i + 1) % previousPlaneLength], metricValueMax[(i) % planeLength], conf.mainAppColor);
								scene.add(meshs['3' + layer + i]);
							}
						}
					} else {
						for (let i = 0; i < previousPlaneLength; i++) {
							if (meshs['4' + layer + i]) {
								// if init done
								meshs['4' + layer + i].update(previousValueMax[i], metricValueMax[(i + 1) % planeLength])
								meshs['5' + layer + i].update(previousValueMax[(i + 1) % previousPlaneLength], metricValueMax[(i + 1) % planeLength])
								meshs['6' + layer + i].update(metricValueMax[(i) % planeLength], metricValueMax[(i + 1) % planeLength], previousValueMax[(i) % previousPlaneLength])
								meshs['7' + layer + i].update(previousValueMax[(i) % previousPlaneLength], previousValueMax[(i + 1) % previousPlaneLength], metricValueMax[(i + 1) % planeLength])
							} else {
								//init objects
								meshs['4' + layer + i] = new SimpleLine(previousValueMax[i], metricValueMax[(i + 1) % planeLength], lineMaterialTransparent);
								scene.add(meshs['4' + layer + i]);
								meshs['5' + layer + i] = new SimpleLine(previousValueMax[(i + 1) % previousPlaneLength], metricValueMax[(i + 1) % planeLength], lineMaterial);
								scene.add(meshs['5' + layer + i]);
								meshs['6' + layer + i] = new Triangle(metricValueMax[(i) % planeLength], metricValueMax[(i + 1) % planeLength], previousValueMax[(i) % previousPlaneLength], conf.mainAppColor);
								scene.add(meshs['6' + layer + i]);
								meshs['7' + layer + i] = new Triangle(previousValueMax[(i) % previousPlaneLength], previousValueMax[(i + 1) % previousPlaneLength], metricValueMax[(i + 1) % planeLength], conf.mainAppColor);
								scene.add(meshs['7' + layer + i]);
							}
						}
					}
				}
				for (let i = 0; i < planeLength; i++) {
					for (let planePoint of planePoints) {
						drawPlaneLine(layer + '_0', planePoint, i, planeLength, lineMaterial);
					}
					drawTrianglesInALayer(layer + '_0', metricValueMax, metricValueMed, i, planeLength, layerColorDecidedByLayerStatus(layerStatus));
					drawTrianglesInALayer(layer + '_1', metricValueMed, metricValueMin, i, planeLength, conf.layerMidColor);
				}
				const sortedLabels = scene.children.filter((item) => item.layerIndex == layerIndex)
				for (let i = 0; i < planeLength; i++) {
					const label = sortedLabels[i];
					label.position.set(metricValueMax[i][0], metricValueMax[i][2], metricValueMax[i][1]);
					label.element.innerText = Object.keys(metric)[i] + " " + Object.values(metric)[i].current.toFixed();
				}

				zAxis -= conf.zplane.zplaneMultilayer;
				previousLayer = metric;
				layerIndex++;
			}
		} else if (conf.displayOption === 'two') {
			for (let layer in newData) {
				const metric = newData[layer].metrics;
				const metricValueMax = metricPoint(Object.values(metric).map(item => item.max / 100), zAxis);
				const metricValueCurrent = metricPoint(Object.values(metric).map(item => item.current / 100), zAxis);
				const metricValueMin = metricPoint(Object.values(metric).map(item => item.min / 100), zAxis);
				const max = Object.values(metric).map(item => item.max).reduce((a, b) => a + b, 0);
				const current = Object.values(metric).map(item => item.current).reduce((a, b) => a + b, 0);
				const layerStatus = (current / max) * 100;
				const planeLength = Object.values(metric).length;
				const planePoints = [metricValueMax, metricValueCurrent, metricValueMin];
				if (previousLayer !== null) {
					const previousValueMax = metricPoint(Object.values(previousLayer).map(item => item.max / 100), zAxis + conf.zplane.zplaneMultilayer);
					const previousPlaneLength = Object.values(previousLayer).length;
					if (planeLength >= previousPlaneLength) {
						for (let i = 0; i < planeLength; i++) {
							if (meshs['10' + layer + i]) {
								// if init done
								meshs['10' + layer + i].update(metricValueMax[i], previousValueMax[(i + 1) % previousPlaneLength])
								meshs['11' + layer + i].update(metricValueMax[(i + 1) % planeLength], previousValueMax[(i + 1) % previousPlaneLength], lineMaterial)
								meshs['12' + layer + i].update(metricValueMax[i], metricValueMax[(i + 1) % planeLength], previousValueMax[(i + 1) % previousPlaneLength])
								meshs['13' + layer + i].update(previousValueMax[(i) % previousPlaneLength], previousValueMax[(i + 1) % previousPlaneLength], metricValueMax[(i) % planeLength])
							} else {
								//init objects
								meshs['10' + layer + i] = new SimpleLine(metricValueMax[i], previousValueMax[(i + 1) % previousPlaneLength], lineMaterialTransparent);
								scene.add(meshs['10' + layer + i]);
								meshs['11' + layer + i] = new SimpleLine(metricValueMax[(i + 1) % planeLength], previousValueMax[(i + 1) % previousPlaneLength], lineMaterial);
								scene.add(meshs['11' + layer + i]);
								meshs['12' + layer + i] = new Triangle(metricValueMax[i], metricValueMax[(i + 1) % planeLength], previousValueMax[(i + 1) % previousPlaneLength], conf.mainAppColor);
								scene.add(meshs['12' + layer + i]);
								meshs['13' + layer + i] = new Triangle(previousValueMax[(i) % previousPlaneLength], previousValueMax[(i + 1) % previousPlaneLength], metricValueMax[(i) % planeLength], conf.mainAppColor);
								scene.add(meshs['13' + layer + i]);
							}
						}
					} else {
						for (let i = 0; i < previousPlaneLength; i++) {
							if (meshs['14' + layer + i]) {
								// if init done
								meshs['14' + layer + i].update(previousValueMax[i], metricValueMax[(i + 1) % planeLength])
								meshs['15' + layer + i].update(previousValueMax[(i + 1) % previousPlaneLength], metricValueMax[(i + 1) % planeLength], lineMaterial)
								meshs['16' + layer + i].update(metricValueMax[(i) % planeLength], metricValueMax[(i + 1) % planeLength], previousValueMax[(i) % previousPlaneLength])
								meshs['17' + layer + i].update(previousValueMax[(i) % previousPlaneLength], previousValueMax[(i + 1) % previousPlaneLength], metricValueMax[(i + 1) % planeLength], metricValueMax[(i) % planeLength])
							} else {
								//init objects
								meshs['14' + layer + i] = new SimpleLine(previousValueMax[i], metricValueMax[(i + 1) % planeLength], lineMaterialTransparent);
								scene.add(meshs['14' + layer + i]);
								meshs['15' + layer + i] = new SimpleLine(previousValueMax[(i + 1) % previousPlaneLength], metricValueMax[(i + 1) % planeLength], lineMaterial);
								scene.add(meshs['15' + layer + i]);
								meshs['16' + layer + i] = new Triangle(metricValueMax[(i) % planeLength], metricValueMax[(i + 1) % planeLength], previousValueMax[(i) % previousPlaneLength], conf.mainAppColor);
								scene.add(meshs['16' + layer + i]);
								meshs['17' + layer + i] = new Triangle(previousValueMax[(i) % previousPlaneLength], previousValueMax[(i + 1) % previousPlaneLength], metricValueMax[(i + 1) % planeLength], conf.mainAppColor);
								scene.add(meshs['17' + layer + i]);
							}
						}
					}
				}
				for (let i = 0; i < planeLength; i++) {
					for (let planePoint of planePoints) {
						drawPlaneLine(layer + '_1', planePoint, i, planeLength, lineMaterial);
					}
					drawTrianglesInALayer(layer + '_2', metricValueMax, metricValueCurrent, i, planeLength, layerColorDecidedByLayerStatus(layerStatus));
					drawTrianglesInALayer(layer + '_3', metricValueCurrent, metricValueMin, i, planeLength, conf.layerMidColor);
				}
				const sortedLabels = scene.children.filter((item) => item.layerIndex == layerIndex)
				for (let i = 0; i < planeLength; i++) {
					const label = sortedLabels[i];
					label.position.set(metricValueMax[i][0], metricValueMax[i][2], metricValueMax[i][1]);
					label.element.innerText = Object.keys(metric)[i] + " " + Object.values(metric)[i].current.toFixed();
				}
				zAxis -= conf.zplane.zplaneMultilayer;
				previousLayer = metric;
				layerIndex++;
			}
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
	function drawPlaneLine(layer, planePoint, i, planePointLength, material) {
		if (meshs['18' + layer + i]) {
			// if init done
			meshs['18' + layer + i].update(planePoint[i], planePoint[(i + 1) % planePointLength])
		} else {
			//init objects
			meshs['18' + layer + i] = new SimpleLine(planePoint[i], planePoint[(i + 1) % planePointLength], material);
			scene.add(meshs['18' + layer + i]);
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
	function metricPoint(metric, zplaneValue) {
		const planepoints = [];
		for (let i = 0; i < metric.length; i++) {
			const points = findNew3DPoint(i * Math.PI * 2 / metric.length, metric[i] * conf.metricMagnifier, zplaneValue);
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
	function findNew3DPoint(angle, radius, zplaneValue) {
		return [radius * Math.cos(angle), radius * Math.sin(angle), zplaneValue];
	}
});