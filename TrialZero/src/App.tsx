// src/App.tsx
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const App: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const canvas = document.querySelector('#background') as HTMLCanvasElement | null;

    // Check if the canvas is found
    if (!canvas) {
      console.error('Canvas element with ID "background" not found.');
      return;
    }
    //Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 30

    //Objects
    const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const material = new THREE.MeshStandardMaterial({ color: 0xFF6347});
    const torus = new THREE.Mesh(geometry, material);

    scene.add(torus);

    function addStar(): void {
      const geometry = new THREE.SphereGeometry(0.25, 32, 32);
      const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const star = new THREE.Mesh(geometry, material);
      const [x, y, z] = Array(3).fill(0).map(() => THREE.MathUtils.randFloatSpread( 100 ))
      star.position.set(x, y, z);
      scene.add(star);
    }
    // Loop to add stars
    for (let i = 0; i < 200; i++)
      addStar()

    const moonTexture = new THREE.TextureLoader().load('./src/assets/moon.jpg')
    const normalTexture = new THREE.TextureLoader().load('./src/assets/normal.jpg')
    const moon = new THREE.Mesh(
      new THREE.SphereGeometry(3, 60, 60),
      new THREE.MeshStandardMaterial({ map: moonTexture, normalMap: normalTexture })
    )
    scene.add(moon)
    

    //Lighting
    const pointLight = new THREE.PointLight(0xffffff)
    pointLight.position.set(5, 5, 5);

    const ambientLight = new THREE.AmbientLight(0xffffff)
    scene.add(pointLight, ambientLight);

    //Helper
    // const lightHelper = new THREE.PointLightHelper(pointLight)
    // scene.add(lightHelper)
    const gridHelper = new THREE.GridHelper(200, 50)
    scene.add(gridHelper)

    //Controller
    const controls = new OrbitControls(camera, renderer.domElement);

    //Texture Packs
    //can add a callback for when we want a loading bar for alot of static images
    scene.background = new THREE.Color(0x00051F)
    
    


    

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      torus.rotation.x += 0.01
      torus.rotation.y += 0.005
      renderer.render(scene, camera);
      controls.update();
    };
    animate();

    // Cleanup on unmount
    return () => {
      // No need to remove the renderer's canvas element because it's managed by the DOM
    };
  }, []);

  return (
    <div ref={mountRef} style={{ width: '100vw', height: '100vh' }}>
      <canvas id="background" style={{ position: 'fixed', top: 0, left: 0 }} />
    </div>
  );
};

export default App;
