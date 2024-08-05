import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */

// group
const group = new THREE.Group();
scene.add(group);

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)

group.add(cube1)
const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
)

group.add(cube2)
cube2.position.x = 2;

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
)

group.add(cube3)
cube3.position.y = 2;

group.position.x = 2;
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)
// // mesh.position.x = 2;
// // mesh.position.y = 1;
// // mesh.position.z = -1;
// mesh.position.set(2, 1, -1)
// mesh.position.normalize();
// scene.add(mesh)

// Axes Helper

const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

// scale
// mesh.scale.x = 2;
// mesh.scale.y = 1;
// mesh.scale.z = 2;
// mesh.scale.set(2, 1, 2);

// rotation

// mesh.rotation.y = Math.PI * 0.5;
// mesh.rotation.x = Math.PI * 0.5;

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
camera.position.x = 1;
camera.position.y = 1;
// camera.lookAt(mesh.position)
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)