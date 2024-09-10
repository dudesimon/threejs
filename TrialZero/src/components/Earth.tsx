// src/components/Box.tsx
import React, { useEffect } from 'react';
import * as THREE from 'three';

interface EarthProps {
  scene: THREE.Scene;
}

const Earth: React.FC<EarthProps> = ({ scene }) => {
  useEffect(() => {
    // Create a simple sphere geometry
    const earthTexture = new THREE.TextureLoader().load('./src/assets/earth.jpg')
    const geometry = new THREE.SphereGeometry(3, 60, 60);
    const material = new THREE.MeshStandardMaterial({ map: earthTexture });
    const earth = new THREE.Mesh(geometry, material);
    
    earth.position.set(6, -6, 17); // Positioning

    scene.add(earth);

    //Moon
    const moonTexture = new THREE.TextureLoader().load('./src/assets/moon.jpg')
    const moonGeometry = new THREE.SphereGeometry()

    // Cleanup: Remove the box from the scene when component is unmounted
    return () => {
      scene.remove(earth);
    };
  }, [scene]);

  return null; // This component doesn’t render anything by itself
};

export default Earth;
