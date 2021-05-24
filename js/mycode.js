import { scene, camera, renderer } from './scr.js'


const light = new THREE.AmbientLight( 0x333994,2.5 ); // soft white light
scene.add(light);
const controls = new THREE.OrbitControls(camera, renderer.domElement);

const loader = new THREE.GLTFLoader();

loader.load("../js/assets/jordans/scene.gltf", function(gltf){
  scene.add(gltf.scene)
});

const mtl = new THREE.MTLLoader();

mtl.setPath("../js/assets/")
mtl.load("r2-d2.mtl", function (material) {
    material.preload();
    const obj = new THREE.OBJLoader();
    obj.setMaterials(material)
    obj.setPath("../js/assets/")
    obj.load("r2-d2.obj" , function (object) {
    //scene.add(object) 
      object.position.y -= 60;
    })
})

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, wireframeLinewidth: 5 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();