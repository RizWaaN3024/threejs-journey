import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const scene = new THREE.Scene();
const canvas = document.querySelector('canvas.webgl');
const loadingManager = new THREE.LoadingManager();

loadingManager.onStart = () => {
    console.log("Started")
}

loadingManager.onProgress = () => {
    console.log("Progress")
}

loadingManager.onLoad = () => {
    console.log("Loaded")
}

loadingManager.onError = () => {
    console.log("Error")
}
const textureLoader = new THREE.TextureLoader(loadingManager)
const colorTexture = textureLoader.load('/textures/minecraft.png')
// colorTexture.repeat.x = 3;
// colorTexture.repeat.y = 3;
colorTexture.wrapS = THREE.RepeatWrapping
colorTexture.wrapT = THREE.RepeatWrapping
colorTexture.colorSpace = THREE.SRGBColorSpace

// colorTexture.rotation = Math.PI / 4;
// colorTexture.center.x = 0.5;
// colorTexture.center.y = 0.5;

colorTexture.generateMipmaps = false

// colorTexture.minFilter =  THREE.NearestFilter
colorTexture.magFilter = THREE.NearestFilter

// sizes object
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ map: colorTexture})
const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 1;
scene.add(camera)


const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
// renderer

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.render(scene, camera);

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


const tick = () => {
    renderer.render(scene, camera)

    controls.update()

    window.requestAnimationFrame(tick)
}

tick()