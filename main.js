import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// 1. Movimiento del Cursor
const cursor = document.getElementById('custom-cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// 2. Carga de Oficina 3D
const container = document.getElementById('threejs-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 400, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize(window.innerWidth, 400);
container.appendChild(renderer.domElement);

const loader = new GLTFLoader();
loader.load('assets/3d/oficina.glb', (gltf) => {
    scene.add(gltf.scene);
    gltf.scene.position.y = -1;
});

const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);
camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// 3. Animación Rive
new rive.Rive({
    src: 'assets/rive/login_bear.riv',
    canvas: document.getElementById('rive-canvas'),
    autoplay: true,
    stateMachines: 'State Machine 1',
});