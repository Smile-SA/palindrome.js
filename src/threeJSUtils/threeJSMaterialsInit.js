import * as THREE from 'three';

/**
 * init all materials needed to draw palindromes
 * @param conf
 * @returns {(ShaderMaterial|LineDashedMaterial)[]}
 */
export function initMaterials(conf) {
    let lineMaterial = new THREE.LineDashedMaterial({
        color: conf.lineColor,
        linewidth: conf.lineWidth,
        opacity: conf.lineOpacity,
    });
    let lineVertShader = `
       attribute float lineDistance;
       varying float vLineDistance;
      
       void main() {
       vLineDistance = lineDistance;
       vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
       gl_Position = projectionMatrix * mvPosition;
       }
   `;
    let lineFragShader = `
       uniform vec3 diffuse;
       uniform float opacity;
       uniform float time; // added time uniform
  
       uniform float dashSize;
       uniform float gapSize;
       uniform float dotSize;
       varying float vLineDistance;
      
       void main() {
           float totalSize = dashSize + gapSize;
           float modulo = mod( vLineDistance + time, totalSize ); // time added to vLineDistance
       float dotDistance = dashSize + (gapSize * .5) - (dotSize * .5);
      
       if ( modulo > dashSize && mod(modulo, dotDistance) > dotSize ) {
           discard;
       }
  
       gl_FragColor = vec4( diffuse, opacity );

      
       }
   `;

    let dashLineMaterial = new THREE.ShaderMaterial({
        uniforms: {
            diffuse: { value: new THREE.Color(conf.frameLineColor) },
            dashSize: { value: conf.frameDashLineSize },
            gapSize: { value: 1 },
            dotSize: { value: 0.1 },
            opacity: { value: 1.0 },
            time: { value: 0 },
            // added uniform
        },
        side: THREE.DoubleSide,
        vertexShader: lineVertShader,
        fragmentShader: lineFragShader,
        transparent: true
    });

    let lineMaterialTransparent = new THREE.LineDashedMaterial({
        color: conf.mainStaticColor,
        linewidth: conf.lineWidth,
        opacity: conf.lineOpacity
    });

    dashLineMaterial.linewidth = conf.frameLineWidth;

    return [dashLineMaterial, lineMaterialTransparent, lineMaterial];
}