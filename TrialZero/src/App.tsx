// src/App.tsx
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

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
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const material = new THREE.MeshBasicMaterial({ color: 0xFF6347, wireframe: true });
    const torus = new THREE.Mesh(geometry, material);

    scene.add(torus);

    camera.position.z = 30

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      torus.rotation.x += 0.01
      torus.rotation.y += 0.01
      renderer.render(scene, camera);
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
