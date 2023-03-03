import './style.css'

import * as THREE from 'three';
//Allows us to move around scene using mouse
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

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
const material = new THREE.MeshStandardMaterial( { color: 0xFF6347 } );
const torus = new THREE.Mesh( geometry, material);

//Renders Scene
scene.add(torus)

//Adds Lighting, point light emits light in all directions as if it were a lightbulb, lights inside in this case
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);//Ambient light is akin to a floodlight in the room

const lightHelper = new THREE.PointLightHelper(pointLight) //Adds visible light wireframe
const gridHelper = new THREE.GridHelper(200, 50); //Adds 3D grid to screen
scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement); //Listens to DOM events on mouse and updates camera position accordingly


//Allows render to be called over and over (game loop)
function animate() {
  requestAnimationFrame( animate );

  //Adds Rotation
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.006;
  torus.rotation.z += 0.02;

  controls.update(); // Makes certain orbit control changes are reflected in UI

  renderer.render(scene, camera );
}

animate() 

/* !!!!! You are at 8:42 of the tutorial video !!! */ 
