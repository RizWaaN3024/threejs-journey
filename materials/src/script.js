import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'


// debug

const gui = new GUI()


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Textures

const textureLoader = new THREE.TextureLoader();

const doorColorTexture = textureLoader.load('./textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('./textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('./textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('./textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('./textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('./textures/matcaps/8.png')
const gradientTexture = textureLoader.load('./textures/gradients/3.jpg')

doorColorTexture.colorSpace = THREE.SRGBColorSpace
matcapTexture.colorSpace = THREE.SRGBColorSpace

// objects

// Mesh Basic Material
// const material = new THREE.MeshBasicMaterial({ map: gradientTexture });
// material.color = new THREE.Color("red")
// material.wireframe = true;
// material.transparent = true
// material.side = THREE.DoubleSide

// Mesh Normal Material

// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true
// material.side = THREE.DoubleSide

// MeshMatcapMaterial

// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture


// Mesh Lambert Material

// const material = new THREE.MeshLambertMaterial();


// MeshPhongMaterial

// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100;
// material.specular = new THREE.Color(0x1188ff)

// MeshToonMaterial

// const material = new THREE.MeshToonMaterial()
// material.gradientMap = gradientTexture
// gradientTexture.magFilter = THREE.NearestFilter
// gradientTexture.generateMipmaps = false


// MeshStandardMaterial
const material = new THREE.MeshStandardMaterial();
material.metalness = 0.45
material.roughness = 0.65

gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)

const sphere = new THREE.SphereGeometry(0.5, 16, 16)
const sphereMesh = new THREE.Mesh(sphere, material)

sphereMesh.position.x = -1.5;

// Plane

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    material
);

// Torus
const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 16, 32),
    material
)

torus.position.x = 1.5;

scene.add(sphereMesh, plane, torus)

// Lights
// THREE.AmbientLight(color, intensity)
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 30)
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects

    sphereMesh.rotation.y = 0.1 * elapsedTime;
    plane.rotation.y = 0.1 * elapsedTime;
    torus.rotation.y = 0.1 * elapsedTime;

    sphereMesh.rotation.x = -0.15 * elapsedTime;
    plane.rotation.x = -0.15 * elapsedTime;
    torus.rotation.x = -0.15 * elapsedTime;

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()