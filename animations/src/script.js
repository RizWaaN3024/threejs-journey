import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1, 5, 5, 5)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}


// Cursor

const cursor = {
    x: 0,
    y: 0
}
window.addEventListener("mousemove", (event) => {
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = -(event.clientY / sizes.height - 0.5);
})
// Camera
// const camera = new THREE.PerspectiveCamera(verticalFieldOfView, aspectRation, nearValue, farValue);
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.01, 100)
const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100)
// camera.position.x = 2;
// camera.position.y = 2;
camera.position.z = 2;
camera.lookAt(mesh.position)
scene.add(camera)

// orthographic Camera
// const camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)


// animations

const tick = () => {
    console.log("tick")

    // mesh.position.x += 0.01;
    mesh.rotation.y += 0.01;
    // update camera
    camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3; 
    camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
    camera.position.y = cursor.x * 10;
    camera.lookAt(mesh.position)
    // mesh.rotation.x += 0.01;
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()
