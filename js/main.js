import * as THREE from 'https://cdn.skypack.dev/three/';
import { OrbitControls }  from 'https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader }  from 'https://cdn.skypack.dev/three/examples/jsm/loaders/GLTFLoader.js';
import Stats  from 'https://cdn.skypack.dev/three/examples/jsm/libs/stats.module.js';
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap; 
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );

const fov = 60;
const aspect = 1920 / 1080;
const near = 1
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)

camera.position.set(75,20,0)

const scene = new THREE.Scene();

const light = new THREE.DirectionalLight(0xffffff, 1.0)
light.position.set(20, 100, 10);
light.target.position.set(0,0,0);
light.castShadow = true;
scene.add(light)

// const light = new THREE.AmbientLight( 0xffffff, 1 ); // soft white light
// scene.add( light );

// // adds light from top and bottom
// const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
// scene.add( light );

const controls = new OrbitControls (camera,renderer.domElement);

const loader = new GLTFLoader();

loader.load("../js/assets/jordans/scene.gltf", function(gltf){
    const object = gltf.scene
    object.position.y = 5
    object.castShadow = true;
    object.receiveShadow = true;
  scene.add(object)
  console.log(gltf)
  
});

let geometry = new THREE.PlaneGeometry(100, 100, 10, 10);
let material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    wireframe: false,
})

const plane = new THREE.Mesh(geometry, material);
plane.castShadow = true;
plane.receiveShadow = true;
plane.rotation.x = -Math.PI / 2;

const stats = new Stats();
document.body.appendChild(stats.dom)

scene.add(plane)

const box = new THREE.Mesh(
    new THREE.BoxGeometry(2,2,2),
    new THREE.MeshStandardMaterial({
        color: 0xffffff,
        wireframe: false
        
    })
)

box.position.set(0,5,0);
box.castShadow = true
box.receiveShadow = true;
scene.add(box)
console.log(box)

function animate() {
    requestAnimationFrame(animate);
    stats.update();
    renderer.render(scene, camera);
}
animate();