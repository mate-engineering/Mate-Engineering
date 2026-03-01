import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const modelPaths = ['assets/models/house.glb'];
let currentIdx = 0;
let isTransitioning = false;
const container = document.getElementById('canvas-container');

if(container) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 11);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    
    scene.add(new THREE.AmbientLight(0xffffff, 2.5));
    const light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(5, 10, 7);
    scene.add(light);
    
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    
    const mainRotationGroup = new THREE.Group();
    scene.add(mainRotationGroup);
    const loader = new GLTFLoader();

    async function loadModel(path) {
        return new Promise(res => {
            loader.load(path, g => {
                const m = g.scene;
                const box = new THREE.Box3().setFromObject(m);
                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());
                const scale = 5.5 / Math.max(size.x, size.y, size.z);
                
                m.scale.set(scale, scale, scale);
                m.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
                m.traverse(n => {
                    if(n.isMesh) {
                        n.material = n.material.clone();
                        n.material.transparent = true;
                        n.material.opacity = 0;
                    }
                });
                
                const group = new THREE.Group();
                group.add(m);
                res(group);
            }, undefined, (err) => console.log("Model not found"));
        });
    }

    async function swap() {
        if(isTransitioning || mainRotationGroup.children.length === 0) return;
        isTransitioning = true;
        const old = mainRotationGroup.children[0];
        currentIdx = (currentIdx + 1) % modelPaths.length;
        const next = await loadModel(modelPaths[currentIdx]);
        next.position.y = -5;
        mainRotationGroup.add(next);
        
        let p = 0;
        const int = setInterval(() => {
            p += 0.03;
            old.position.y += 0.1;
            next.position.y += 0.1;
            old.children[0].traverse(n => { if(n.isMesh) n.material.opacity -= 0.05; });
            next.children[0].traverse(n => { if(n.isMesh) n.material.opacity += 0.05; });
            if(p >= 1) {
                clearInterval(int);
                mainRotationGroup.remove(old);
                next.position.y = 0;
                isTransitioning = false;
            }
        }, 20);
    }

    const firstModel = await loadModel(modelPaths[0]);
    if(firstModel) {
        mainRotationGroup.add(firstModel);
        firstModel.children[0].traverse(n => { if(n.isMesh) n.material.opacity = 1; });
    }

    function animate() {
        requestAnimationFrame(animate);
        mainRotationGroup.rotation.y += 0.005;
        if(!isTransitioning && mainRotationGroup.rotation.y >= Math.PI*2) {
            mainRotationGroup.rotation.y = 0;
            swap();
        }
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
}