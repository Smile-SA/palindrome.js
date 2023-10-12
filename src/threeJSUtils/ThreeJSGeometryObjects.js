import * as THREE from 'three';

export class SimpleLine extends THREE.Line {
    /**
     * construct simple line
     * @param value1
     * @param value2
     * @param transparentLineMaterial
     */
    constructor(value1, value2, transparentLineMaterial) {
        const vertices = new Float32Array([
            value1[0], value1[2], value1[1],
            value2[0], value2[2], value2[1],
        ]);
        let geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        super(geometry, transparentLineMaterial);
    }

    /**
     * update simple line
     * @param a
     * @param b
     */
    update(a, b) {
        this.geometry.attributes.position.setXYZ(0, a[0], a[2], a[1]);
        this.geometry.attributes.position.setXYZ(1, b[0], b[2], b[1]);
        this.geometry.attributes.position.needsUpdate = true;
    };
}


export class DasheLine extends THREE.Line {
    /**
     * Construct dashed line
     * @param value1
     * @param value2
     * @param transparentLineMaterial
     */
    constructor(value1, value2, transparentLineMaterial) {
        const vertices = new Float32Array([
            value1[0], value1[2], value1[1],
            value2[0], value2[2], value2[1],
        ]);
        let geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        super(geometry, transparentLineMaterial);
        this.computeLineDistances()
    }

    /**
     * update dashed line
     * @param a
     * @param b
     */
    update(a, b) {
        this.geometry.attributes.position.setXYZ(0, a[0], a[2], a[1]);
        this.geometry.attributes.position.setXYZ(1, b[0], b[2], b[1]);
        this.geometry.attributes.position.needsUpdate = true;
    };
}


export class Triangle extends THREE.Mesh {
    /**
     * construct triangle
     * @param a
     * @param b
     * @param c
     * @param colorA
     * @param colorB
     * @param opacity
     */
    constructor(a, b, c, colorA, colorB, opacity) {
        if (!opacity) {
            opacity = 0.5;
        }
        const vertices = new Float32Array([
            a[0], a[2], a[1],
            b[0], b[2], b[1],
            c[0], c[2], c[1],
        ]);

        let geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

        const center = new THREE.Vector3();
        geometry.computeBoundingBox();
        geometry.boundingBox.getCenter(center);
        geometry.center();
        geometry.attributes.position.needsUpdate = true;
        if (!colorB) {
            var material_front = new THREE.MeshBasicMaterial({
                color: colorA,
                transparent: true,
                opacity: opacity,
                side: THREE.DoubleSide,
                depthWrite: false
            });
        } else {
            material_front = new THREE.ShaderMaterial({
                uniforms: {
                    color1: {
                        value: new THREE.Color(colorA)
                    },
                    color2: {
                        value: new THREE.Color(colorB)
                    },
                    bboxMin: {
                        value: geometry.boundingBox.min
                    },
                    bboxMax: {
                        value: geometry.boundingBox.max
                    }
                },
                vertexShader: `
				  uniform vec3 bboxMin;
				  uniform vec3 bboxMax;
				
				  varying vec2 vUv;
			  
				  void main() {
					vUv.y = (position.y - bboxMin.y) / (bboxMax.y - bboxMin.y);
					gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
				  }
				`,
                fragmentShader: `
				  uniform vec3 color1;
				  uniform vec3 color2;
				
				  varying vec2 vUv;
				  
				  void main() {
					
					gl_FragColor = vec4(mix(color1, color2, vUv.y), 0.5);
				  }
				`,
                wireframe: false,
                side: THREE.DoubleSide,
                transparent: true
            });
        }

        super(geometry, material_front);
        this.position.copy(center);
    }

    /**
     * update triangle
     * @param a
     * @param b
     * @param c
     * @param colorA
     * @param colorB
     */
    update(a, b, c, colorA, colorB) {

        this.geometry.attributes.position.setXYZ(0, a[0], a[2], a[1]);
        this.geometry.attributes.position.setXYZ(1, b[0], b[2], b[1]);
        this.geometry.attributes.position.setXYZ(2, c[0], c[2], c[1]);

        this.geometry.attributes.position.needsUpdate = true;
        const center = new THREE.Vector3();
        this.geometry.computeBoundingBox();
        this.geometry.boundingBox.getCenter(center);
        this.geometry.center();

        this.position.copy(center);

        if (colorA && colorB) {
            this.material.uniforms.color1.value = new THREE.Color(colorA);
            this.material.uniforms.color2.value = new THREE.Color(colorB);
            this.material.needsUpdate = true;
        }
    }
}

export class Sphere extends THREE.Mesh {
    /**
     * construct sphere
     * @param color
     */
    constructor(color) {
        const geometry = new THREE.SphereGeometry(0.8, 32, 16);
        const material = new THREE.MeshBasicMaterial({color});
        material.transparent = true;
        material.needsUpdate = true;
        material.opacity = 1;
        super(geometry, material);
    }

    /**
     * update sphere
     * @param color
     * @param x
     * @param y
     * @param z
     */
    update(color, x, y, z) {
        this.position.set(x, y, z);
        this.material.color.set(color);
    };
}
