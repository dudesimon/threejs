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
    
    earth.position.set(-20, 10, 10); // Positioning

    scene.add(earth);

    // //Create the Ring
    // const ringGeometry = new THREE.TorusGeometry(12, 0.5, 2, 100);  // Adjusted torus for flatter, thinner ring
    // const ringMaterial = new THREE.MeshStandardMaterial({ color: 0xFF6347 });
    // const saturnRing = new THREE.Mesh(ringGeometry, ringMaterial);
    
    // saturnRing.position.set(20, 10, 0)
    // saturnRing.rotation.x = Math.PI / 2; // Rotate the ring to be flat

    // scene.add(saturnRing)


    // Cleanup: Remove the box from the scene when component is unmounted
    return () => {
      scene.remove(earth);
    };
  }, [scene]);

  return null; // This component doesn’t render anything by itself
};

export default Earth;
