
import { OrbitControls } from 'https://unpkg.com/three/examples/jsm/controls/OrbitControls.js'
import { scene,  renderer, camera } from './scr.js'


renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


camera.position.set(75,20,0)
 

const light = new THREE.DirectionalLight( 0xffffff, 1.0 );
light.position.set(20, 100, 10);
light.target.position.set(0,0,0);
light.castShadow = true;
scene.add(light)



let geometry = new THREE.PlaneGeometry(100, 100, 10, 10);
let material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    wireframe: true,
})

const plane = new THREE.Mesh(geometry, material);
plane.castShadow = true;
plane.receiveShadow = true;
plane.rotation.x = -Math.PI / 2;

scene.add(plane)

const animate = function() {
    requestAnimationFrame(animate);
    plane.rotation.z += 0.01;
    renderer.render(scene, camera);
}
animate();