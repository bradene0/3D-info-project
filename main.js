import './style.css'

import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth /window.innerHeight, 0.1, 1000);

const renderer =  new THREE.WebGLRenderer ({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render( scene, camera);

//Creates object
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100);
const material = new THREE.MeshBasicMaterial( { color: 0xFF6347, wireframe: true} );
const torus = new THREE.Mesh( geometry, material);

//Renders Scene
scene.add(torus)

//Allows render to be called over and over (game loop)
function animate() {
  requestAnimationFrame( animate );

  //Adds Rotation
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.006;
  torus.rotation.z += 0.02;

  renderer.render(scene, camera );
}

animate()