import '../public/style.css'

import * as THREE from 'vendor/three/build/three.module.js';
//Allows us to move around scene using mouse
import {OrbitControls} from 'vendor/three/build/three.module.js';
import { depthTexture } from './js/three.module.js';

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

function addStar() {
  //Creates stars
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( {color: 0xffffff})
  const star = new THREE.Mesh( geometry, material);
//Randomly selects positions of stars
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
//Positions stars
  star.position.set(x, y, z);
  //Adds stars to scene
  scene.add(star)
}

//Determines and places number of stars
  Array(200).fill().forEach(addStar)
//Adds space.png as background
  const spaceTexture = new THREE.TextureLoader().load('space.jpg');
  scene.background = spaceTexture;


 //Cat Box
  const catTexture = new THREE.TextureLoader().load('cat.jpeg');

  const cat = new THREE.Mesh (
    new THREE.BoxGeometry(3,3,3),
    new THREE.MeshBasicMaterial( {map: catTexture})
  );

  scene.add(cat);

//Moon

    const moonTexture = new THREE.TextureLoader().load('moon.jpg');
    const depthTexture = new THREE.TextureLoader().load('normal.jpg');

    const moon = new THREE.Mesh(
      new THREE.SphereGeometry(3, 32, 32),
      new THREE.MeshStandardMaterial( {
        map: moonTexture,
        normalMap: depthTexture
      }) 
    );
  scene.add(moon);
//Moves moon
  moon.position.z = 20;
  moon.position.setX(-10);

  cat.position.z = -3;
  cat.position.x = 22;
  cat.position.y = 12;

  function moveCamera() {
    //Calculates where user is scrolled to
    const t = document.body.getBoundingClientRect().top;
    //Changes activity of objects wherever function is called
    moon.rotation.x += 0.08;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.8;

    cat.rotation.y +=0.06;
    cat.rotation.z += 0.02;

    //Changes position of camera itself
    
    camera.position.x = t * -0.001;
    camera.position.y = t * -0.001;
    /* This feature not currently working
    camera.position.z = t * -0.0002;
    */
  }
//14:06
  document.body.onscroll = moveCamera;
  moveCamera();





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
