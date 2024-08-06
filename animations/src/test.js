import * as THREE from "three"
import gsap from "gsap";

const canvas = document.querySelector("canvas.webgl")

const scene = new THREE.Scene();
// create a size object
const sizes = {
    width: 800,
    height: 800
}

// object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh)

// create a camera

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera)


// create a renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

let time = Date.now()


// using clock
const clock = new THREE.Clock();
const tick = () => {

    const elapsedTime = clock.getElapsedTime();

    const currentTime = Date.now();
    const deltaTime = currentTime - time;
    time = currentTime;
    

    // mesh.rotation.x = elapsedTime;
    // mesh.rotation.y += 0.01 * deltaTime;
    // mesh.position.y = Math.sin(elapsedTime)
    // mesh.position.x = Math.cos(elapsedTime)
    // mesh.rotation.z = Math.sin(elapsedTime);
    camera.position.x = Math.sin(elapsedTime)
    camera.position.y = Math.cos(elapsedTime)
    // camera.lookAt(mesh.position)
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()

gsap.to(mesh.position, {
    x: 2,
    duration: 2,
    delay:2
})
