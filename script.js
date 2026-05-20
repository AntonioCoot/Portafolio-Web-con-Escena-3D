import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';

const container = document.getElementById('container-3d');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b1220);

// Cache-busting model URL using current commit short SHA (update on each push)
const MODEL_VERSION = '84d1413';
const MODEL_URL = `./assets/3d/FNAFFINALOPTIMIZACION.glb?v=${MODEL_VERSION}`;

const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 5000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 0.8;
container.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.1);
directionalLight.position.set(18, 30, 18);
directionalLight.castShadow = true;
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffffff, 0.35, 220);
pointLight.position.set(0, 8, 0);
scene.add(pointLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.maxPolarAngle = Math.PI / 2.1;
controls.minDistance = 2;
controls.maxDistance = 30;

let loadedModel = null;
let autoRotate = false;

const loader = new GLTFLoader();
loader.load(
    MODEL_URL,
    (gltf) => {
        loadedModel = gltf.scene;
        scene.add(loadedModel);

        const box = new THREE.Box3().setFromObject(loadedModel);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);

        loadedModel.position.sub(center);
        const fov = camera.fov * (Math.PI / 180);
        let cameraDistance = Math.abs(maxDim / 2 / Math.tan(fov / 2));
        cameraDistance *= 1.8;

        camera.position.set(cameraDistance * 0.55, maxDim * 0.45, cameraDistance * 0.95);
        controls.target.set(0, maxDim * 0.18, 0);
        controls.update();
    },
    (xhr) => {
        if (xhr.total) {
            const percentComplete = (xhr.loaded / xhr.total) * 100;
            console.log(`Modelo 3D cargado: ${percentComplete.toFixed(1)}%`);
        }
    },
    (error) => {
        console.error('Error al cargar el modelo GLB:', error);
    }
);

const ambientButton = document.getElementById('btn-luces');
const rotateButton = document.getElementById('btn-rotar');

ambientButton.addEventListener('click', () => {
    const isWhite = pointLight.color.getHex() === 0xffffff;
    pointLight.color.setHex(isWhite ? 0xff77ff : 0xffffff);
    pointLight.intensity = isWhite ? 1.0 : 0.75;
    ambientButton.textContent = isWhite ? 'ESCUCHA EL SETUP' : 'CAMBIAR AMBIENTE';
});

rotateButton.addEventListener('click', () => {
    autoRotate = !autoRotate;
    rotateButton.textContent = autoRotate ? 'DESACTIVAR ROTACIÓN' : 'ACTIVAR ROTACIÓN';
});

function animate() {
    requestAnimationFrame(animate);
    if (autoRotate && loadedModel) {
        loadedModel.rotation.y += 0.0035;
    }
    controls.update();
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});
