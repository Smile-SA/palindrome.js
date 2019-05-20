const example1 = {
	system_metrics : {
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
}


/**
 * WebGL scene initialisation
 */
function init() {
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    camera.position.z = 5;
    camera.position.x = .5;
    camera.position.y = .5;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }, false);

    buildScene(scene, example1);
    renderer.render(scene, camera);
}

/**
 * 
 * @param {Scene} scene 
 * @param {*} data 
 */
function buildScene(scene, data) {
    const axesHelper = new THREE.AxesHelper();
    scene.add(axesHelper);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    scene.add(directionalLight);

    const dotMaterial = new THREE.PointsMaterial({size: 0.1});
    const dotGeometry = new THREE.Geometry();

    //TODO: afficher les points de example1 de maniere coherente dans l'espace
    //example
    dotGeometry.vertices.push(new THREE.Vector3(1, 1, 0));//ex point (x = 1; y = 1)

    const dot = new THREE.Points(dotGeometry, dotMaterial);
    scene.add(dot);
}

init();