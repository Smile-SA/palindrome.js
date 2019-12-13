
const systemMetrics = {
	cpu : {
		label : "CPU",
		unit : "cycle / seconds",
		max : 100000,
		current : 5000
	},
	ram : {
		label : "RAM",
		unit : "GB",
		max : 128,
		current : 32
	},
	hdd : {
		label : "HDD",
		unit : "GB",
		max : 1024,
		current : 150
	},
	bandwidth : {
		label : "BW",
		unit : "MB / seconds",
		max : 10240,
		current : 1500
	},
	bandwidth2 : {
		label : "BW",
		unit : "MB / seconds",
		max : 10240,
		current : 1500
	}
}
/*
const dataValue = [];
const dataTitle = [];
for ( const metric in systemMetrics) {
    const value = systemMetrics[metric].current / systemMetrics[metric].max;
	dataValue.push(value);
	dataTitle.push(metric);
};
*/

const dataValue = Object.values(systemMetrics).map(e => e.current / e.max)
const dataTitle = Object.keys(systemMetrics)

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 5000 );
camera.position.set( 0, 20, 100 );
camera.lookAt( 0, 0, 0 );

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const labelRenderer = new THREE.CSS2DRenderer();
labelRenderer.setSize( window.innerWidth, window.innerHeight );
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = 0;
document.body.appendChild( labelRenderer.domElement );

const controls = new THREE.OrbitControls(camera, labelRenderer.domElement);
//controls.autoRotate = true;
controls.autoRotateSpeed = 5;
//controls.target = new THREE.Vector3(.5, .5, .5);
			
const scene = new THREE.Scene();
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const material = new THREE.LineDashedMaterial( {
	color: 0xffffff,
	linewidth: 3,
	scale: 1,
	dashSize: 3,
	gapSize: 1,
} );

class SimpleLine extends THREE.Line {
	constructor(value1, value2, material) {
		const geometry = new THREE.Geometry();
		geometry.vertices.push(new THREE.Vector3(...value1) );
		geometry.vertices.push(new THREE.Vector3(...value2) );
		super(geometry, material)
	}
	}

const b = [];



labelRenderer.render( scene, camera );

for (let i=0; i< dataValue.length; i++){
	const pointValue = new SimpleLine([dataValue[i]*50,0,0], [0,0,0] , material);
	pointValue.rotateZ(i*Math.PI*2/dataValue.length);
	scene.add(pointValue);
	scene.updateMatrixWorld();
	const points = pointValue.geometry.vertices[0].clone();
	points.applyMatrix4(pointValue.matrixWorld);
	b.push(points);
}

for(let i = 0; i < b.length -1; i++) {
	//console.log(b[i], b[i+1])
	const autoLines = new SimpleLine(b[i].toArray(), b[i+1].toArray(), material);
	scene.add(autoLines);

	const label = createLabel(dataTitle[i], b[i]);
	scene.add(label); 
}

const autoLines1 = new SimpleLine(b[b.length - 1].toArray(), b[0].toArray(), material);
scene.add(autoLines1);

const label = createLabel(dataTitle[dataTitle.length -1], b[b.length - 1]);
scene.add(label);
	
function createLabel(textContent, vector3) {
	const labelDiv = document.createElement( 'div' );
	labelDiv.className = 'label';
	labelDiv.textContent = textContent;

	const metricLabel = new THREE.CSS2DObject( labelDiv );
	metricLabel.position.set(vector3.x, vector3.y + 1, vector3.z);
	
	return metricLabel
}

// display scene
function render() {
	controls.update();
	renderer.render(scene, camera);
	labelRenderer.render( scene, camera );
	
	requestAnimationFrame(render);
	}

render();


/*
// game logic
const update function ( ){

};

// draw scene
const render = function( ) {
	renderer.render( scene, camera );
};

// run game loop (update, render, repeat)
const gameLoop = function ( ) {
	requestAnimationFrame ( gameLoop );

	update( );
	render( );
};

gameLoop();
*/
