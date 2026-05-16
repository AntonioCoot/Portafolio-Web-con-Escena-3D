import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';

// 1. Configuración de Escena y Renderizador Base
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x121212); // Fondo muy oscuro y neutro
const container = document.getElementById('container-3d');

// Matriz de proyección de la cámara con plano lejano expandido (5000) para el mapa extendido
const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 5000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });

renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 0.75;

renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Optimización de pixeles en pantallas Retina/4K
container.appendChild(renderer.domElement);

// 2. Sistema de Iluminación Integrado para Resaltar Materiales de Blender
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x222222, 0.5);
scene.add(hemiLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
directionalLight.position.set(15, 30, 20);
scene.add(directionalLight);

// Luz de acento interactiva neutral, sin dominancia azul
const pointLight = new THREE.PointLight(0xffffff, 0.35, 220);
pointLight.position.set(0, 8, 0);
scene.add(pointLight);

// 3. Controles Orbitacionales Interactivos
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Efecto de inercia fluido al soltar el clic
controls.dampingFactor = 0.05;
controls.maxPolarAngle = Math.PI / 2 - 0.05; // Evita que la cámara pase por debajo del suelo del mapa

// 4. Cargador del Modelo glTF/glb Final
const loader = new GLTFLoader();
loader.load(
    './assets/3d/FNAFFINALOPTIMIZACION.glb', // Ruta relativa explícita
    (gltf) => {
        console.log("✓ Modelo cargado exitosamente", gltf);
        const model = gltf.scene;
        scene.add(model);
        
        // --- ALGORITMO DINÁMICO DE ENCUADRE Y ESCALA ---
        // Genera una caja delimitadora matemática envolvente alrededor del objeto cargado
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        console.log("Dimensiones del modelo:", { x: size.x, y: size.y, z: size.z });
        
        // Desplaza el modelo para situar su centro de gravedad exacto en el origen (0,0,0)
        model.position.sub(center); 
        
        // Calcula la magnitud espacial máxima para ajustar el campo de visión de forma automática
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        let cameraDistance = Math.abs(maxDim / 2 / Math.tan(fov / 2));
        
        cameraDistance *= 1.5; // Zoom más cercano para mejor detalle
        
        // Reposiciona la cámara con ángulo frontal-elevado para ver el interior correctamente
        camera.position.set(cameraDistance * 0.6, maxDim * 0.5, cameraDistance * 0.8);
        
        // Ajusta el punto de pivotaje orbital hacia el centro del modelo
        controls.target.set(0, maxDim * 0.2, 0);
        controls.update();
        
        console.log("✓ Infraestructura 3D inyectada de manera íntegra.");
    },
    // Callback de progreso con porcentaje de carga
    (xhr) => {
        const percentComplete = (xhr.loaded / xhr.total * 100);
        console.log(percentComplete.toFixed(2) + '% cargado');
        if (xhr.total === xhr.loaded) {
            console.log("✓ Descarga completada");
        }
    },
    (error) => { 
        console.error("✗ Fallo crítico en la lectura del flujo binario GLB:", error);
        console.error("Verifica que la ruta es: ./assets/3d/FNAFFINALOPTIMIZACION.glb");
    }
);

// 5. Intercambiador de Color Lumínico del Botón de Ambiente
document.getElementById('btn-luces').addEventListener('click', () => {
    const esBlanco = pointLight.color.getHex() === 0xffffff;
    // Intercambia entre blanco neutro y magenta/fucsia suave
    pointLight.color.setHex(esBlanco ? 0xff77ff : 0xffffff);
    pointLight.intensity = esBlanco ? 1.0 : 1.0;
});

// 6. Bucle de Animación Continuo (Frecuencia de refresco sincronizada)
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Actualiza la inercia del ratón
    renderer.render(scene, camera);
}

// 7. Manejo Dinámico del Viewport para Diseños Flexibles / Responsivos
window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});

// 8. Protección adicional: Verificar que DOM está listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log("✓ DOM listo. Container 3D dimensiones:", { width: container.clientWidth, height: container.clientHeight });
        animate();
    });
} else {
    console.log("✓ DOM ya estaba listo. Container 3D dimensiones:", { width: container.clientWidth, height: container.clientHeight });
    animate();
}