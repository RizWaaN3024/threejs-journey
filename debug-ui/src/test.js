import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from "gsap";
import GUI from "lil-gui";
// import { OrbitControls } from "three/examples/jsm/Addons.js";


const canvas = document.querySelector("canvas.webgl")

const gui = new GUI({
    width: 340,
    title: "DEBUG GUI"
})

const debugObject = {}

debugObject.color = "#ffffgh"

const testTweaks = gui.addFolder('test-tweaks')




// Sizes object

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({color: "#FFFFFF", wireframe: true})

const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh);
testTweaks.add(mesh.position, 'y').min(0).max(10).step(0.1)
testTweaks.addColor(debugObject, 'color').onChange(() => {
    material.color.set(debugObject.color)
})
testTweaks.add(mesh, 'visible')
// create a camera

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 1;
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

renderer.render(scene, camera)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update the renderer 
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
debugObject.spin = () => {
    gsap.to(mesh.rotation, {y: mesh.rotation.y + Math.PI * 2})
}

testTweaks.add(debugObject, 'spin')
const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()

