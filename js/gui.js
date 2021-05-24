import * as THREE from 'https://cdn.skypack.dev/three/';
import { OrbitControls } from 'https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three/examples/jsm/loaders/GLTFLoader.js';
import { MTLLoader } from 'https://cdn.skypack.dev/three/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from 'https://cdn.skypack.dev/three/examples/jsm/loaders/OBJLoader.js';
import { PixelShader } from 'https://cdn.skypack.dev/three/examples/jsm/shaders/PixelShader.js';
import { EffectComposer } from 'https://cdn.skypack.dev/three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://cdn.skypack.dev/three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'https://cdn.skypack.dev/three/examples/jsm/postprocessing/ShaderPass.js';
import { GUI } from 'https://cdn.skypack.dev/three/examples/jsm/libs/dat.gui.module.js';

let renderer, scene, camera, loader , pixelPass, composer, params, controls, group

console.log(PixelShader)

init();
animate();


function init() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //Pixel attempt
    // scene = new THREE.Scene();

    // const geometries = [
    //     new THREE.SphereGeometry( 1, 64, 64 ),
    //     new THREE.BoxGeometry( 1, 1, 1 ),
    //     new THREE.ConeGeometry( 1, 1, 32 ),
    //     new THREE.TetrahedronGeometry( 1 ),
    //     new THREE.TorusKnotGeometry( 1, .4 )
    // ];


    // group = new THREE.Group();

    // for ( let i = 0; i < 25; i ++ ) {

    //     const geom = geometries[ Math.floor( Math.random() * geometries.length ) ];

    //     const color = new THREE.Color();
    //     color.setHSL( Math.random(), .7 + .2 * Math.random(), .5 + .1 * Math.random() );

    //     const mat = new THREE.MeshPhongMaterial( { color: color, shininess: 200 } );

    //     const mesh = new THREE.Mesh( geom, mat );

    //     const s = 4 + Math.random() * 10;
    //     mesh.scale.set( s, s, s );
    //     mesh.position.set( Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5 ).normalize();
    //     mesh.position.multiplyScalar( Math.random() * 200 );
    //     mesh.rotation.set( Math.random() * 2, Math.random() * 2, Math.random() * 2 );
    //     group.add( mesh );

    // }

    // scene.add(group);


    // composer = new EffectComposer( renderer );
    // composer.addPass( new RenderPass( scene, camera ) );



    // pixelPass = new ShaderPass( PixelShader );
    // pixelPass.uniforms[ "resolution" ].value = new THREE.Vector2( window.innerWidth, window.innerHeight );
    // pixelPass.uniforms[ "resolution" ].value.multiplyScalar( window.devicePixelRatio );
    // composer.addPass( pixelPass );

    // window.addEventListener( 'resize', onWindowResize );

    // params = {
    //     pixelSize: 16,
    //     postprocessing: true
    // };
    // gui = new GUI();
    // gui.add( params, 'pixelSize' ).min( 2 ).max( 32 ).step( 2 );
    // gui.add( params, 'postprocessing' );


const mtl = new MTLLoader();

mtl.setPath("/js/assets/globe/source/")
mtl.load("sphere.mtl", function (material) {
    material.preload();
    const obj = new OBJLoader();
    obj.setMaterials(material)
    obj.setPath("/js/assets/globe/source/")
    obj.load("displacement_sphere_and_clouds_1r1.obj" , function (object) {
   

    const scale = object.scale

    const globeParams = {
        scalex: scale.x,
        scalez: scale.z,
        scaley: scale.y,
        visible: true
        }
        const globeFolder = gui.addFolder("Globe")

        globeFolder.add(globeParams, "visible");
        globeFolder.add(globeParams, "scalex")
        globeFolder.add(globeParams, "scalez")
        globeFolder.add(globeParams, "scaley")
        .onChange(function (val) {object.visible = val })

        .onChange (function(val){
            scale.x = val
        })
        .onChange (function(val){
            scale.y = val
        })
        .onChange (function(val){
            scale.z = val
        })


    scene.add(object) 
    object.position.y = 10
      console.log(object)
    })
})


    loader = new GLTFLoader();

    loader.load("../js/assets/jordans/scene.gltf", function (gltf) {
        const object = gltf.scene
        object.position.y = 5
        object.rotation.x += 10
        object.scale.x = 0.5
        object.scale.y = 0.5
        object.scale.z = 0.5
        object.castShadow = true;
        object.receiveShadow = true;
        console.log(object.animations)
        scene.add(object)
        console.log("Trainers" , object)

        const scale = object.scale
        
       const loaderParams = {
        scalex: scale.x,
        scalez: scale.z,
        scaley: scale.y
        }

        const ObjectFolder = gui.addFolder("Object props")
        ObjectFolder.add(loaderParams, "scalex")
        ObjectFolder.add(loaderParams, "scalez")
        ObjectFolder.add(loaderParams, "scaley")
        .onChange (function(val){
            scale.x = val
        })
        
        .onChange (function(val){
            scale.z = val
        })
        
        .onChange (function(val){
            scale.y = val
        })


    });


    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
    camera.position.set(0, 20, 35)

    scene = new THREE.Scene();

    const AmbientLight = new THREE.AmbientLight(0xffffff, 0.1); // soft white light
    scene.add(AmbientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    scene.add(directionalLight)

    const floor = new THREE.BoxBufferGeometry(2000, 0.1, 2000);
    const matFloor = new THREE.MeshStandardMaterial({
        color: 0x808080,
        roughness: 0,
        metalness: 0,
       
    });

    const x = new THREE.Mesh(floor, matFloor)
    scene.add(x)

    const matForObjects = new THREE.MeshStandardMaterial({
        color: 0xa00000,
        roughness: 0,
        metalness: 0,
        
    })

    const GoogleBox = new THREE.BoxBufferGeometry(Math.PI, Math.sqrt(2), Math.E);
    const meshbox = new THREE.Mesh(GoogleBox, matForObjects)
    meshbox.position.set(0, 5, 0)
    meshbox.rotation.set(0, Math.PI / 2.0, 0);
    meshbox.castShadow = true;
    meshbox.receiveShadow = true;
    scene.add(meshbox)
    console.log(meshbox, "Box")

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.copy(meshbox.position)
    controls.update();


    const gui = new GUI({ width: 300 })
    gui.open();

    let params = {
        motion: true,
        light: true,
        wireframe: true,
        AmbientLight: AmbientLight.intensity, 
        "Material color": matForObjects.color.getHex()
    };



    const meshFolder = gui.addFolder("Floor")

    meshFolder.add(params, "wireframe")
    .onChange(function (val) {
        matFloor.wireframe = val
        
    });
    meshFolder.addColor(params, "Material color").onChange(function (val){
        matFloor.color.setHex(val) 
    })

    const motionFolder = gui.addFolder("Motion")
    motionFolder.add(params, "motion");

    const lightFolder = gui.addFolder("Light")

    lightFolder
        .add(params, "AmbientLight", 0.1, 1)
        .step(0.01)
        .onChange(function (val) {
            AmbientLight.intensity = val;
        });
        lightFolder.addColor(params, "Material color").onChange(function (val){
            matForObjects.color.setHex(val) 
        })
    lightFolder.open()
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    pixelPass.uniforms[ "resolution" ].value.set( window.innerWidth, window.innerHeight ).multiplyScalar( window.devicePixelRatio );

}


function animate() {

    // pixelPass.uniforms[ "pixelSize" ].value = params.pixelSize;
    
    renderer.render( scene, camera );
    window.requestAnimationFrame( animate );
}
