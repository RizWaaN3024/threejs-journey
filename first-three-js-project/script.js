import * as THREE from "three"

// canvas
const canvas = document.querySelector("canvas.webgl")

// create a scene
const scene = new THREE.Scene();

// create a geometry
// object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// define sizes
const sizes = {
    width: 800,
    height: 600
}

// Create and add a camera

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3;
scene.add(camera)

// renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)

renderer.render(scene, camera)