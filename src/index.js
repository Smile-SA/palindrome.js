

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
	}
}

const valuePoint1 = systemMetrics.cpu.current / systemMetrics.cpu.max;
const valuePoint2 = systemMetrics.ram.current / systemMetrics.ram.max;
const valuePoint3 = systemMetrics.hdd.current / systemMetrics.hdd.max;
const valuePoint4 = systemMetrics.bandwidth.current / systemMetrics.bandwidth.max;



const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 5000 );
camera.position.set( 0, 20, 100 );
camera.lookAt( 0, 0, 0 );

const renderer = new THREE.WebGLRenderer();
const controls = new THREE.OrbitControls(camera, renderer.domElement);

controls.autoRotate = true;
controls.autoRotateSpeed = 1;
controls.target = new THREE.Vector3(.5, .5, .5);


renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

	
const scene = new THREE.Scene();

const material = new THREE.LineDashedMaterial( {
	color: 0xffffff,
	linewidth: 3,
	scale: 1,
	dashSize: 3,
	gapSize: 1,
} );

class SimpleLine extends THREE.Line {
	constructor(point1, point2, material) {
		const geometry = new THREE.Geometry();
		geometry.vertices.push(new THREE.Vector3(...point1) );
		geometry.vertices.push(new THREE.Vector3(...point2) );

		super(geometry, material)
	}
	}


const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

const point1 = new SimpleLine([0,valuePoint1*50,0], [0,0,0] , material);
const point2 = new SimpleLine([0,valuePoint2*-50,0], [0,0,0] , material);
const point3 = new SimpleLine([valuePoint3*50,0,0],[0,0,0], material);
const point4 = new SimpleLine([valuePoint4*-50,0,0],[0,0,0], material);

const line = new SimpleLine([0,valuePoint1*50,0], [valuePoint3*50,0,0], material);
const line2 = new SimpleLine([0,valuePoint2*-50,0], [valuePoint3*50,0,0], material);
const line3 = new SimpleLine([valuePoint4*-50,0,0],[0,valuePoint2*-50,0],material);
const line4 = new SimpleLine([valuePoint4*-50,0,0],[0,valuePoint1*50,0],material);

scene.add( point1, point2, point3, point4, line, line2, line3, line4 );

function render() {
	controls.update();
	renderer.render(scene, camera);
	
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


/*

function resize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

function render() {
  if (resize(renderer)) {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
  renderer.render(scene, camera);
  requestAnimationFrame(render);
  controls.update();
}

*/