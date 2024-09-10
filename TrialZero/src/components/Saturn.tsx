// src/components/Box.tsx
import React, { useEffect } from 'react';
import * as THREE from 'three';

interface SaturnProps {
  scene: THREE.Scene;
}

const Saturn: React.FC<SaturnProps> = ({ scene }) => {
  useEffect(() => {
    // Create a simple sphere geometry
    const saturnTexture = new THREE.TextureLoader().load('./src/assets/saturn.jpg')
    const geometry = new THREE.SphereGeometry(3, 60, 60);
    const material = new THREE.MeshStandardMaterial({ map: saturnTexture });
    const saturn = new THREE.Mesh(geometry, material);
    
    saturn.position.set(20, 10, -25); // Positioning

    scene.add(saturn);

    //Create the Ring
    const ringGeometry = new THREE.TorusGeometry(5, 0.5, 2, 100);  // Adjusted torus for flatter, thinner ring
    const ringMaterial = new THREE.MeshStandardMaterial({ color: 0xFF6347 });
    const saturnRing = new THREE.Mesh(ringGeometry, ringMaterial);
    
    saturnRing.position.set(20, 10, -25)
    saturnRing.rotation.x = Math.PI / 2; // Rotate the ring to be flat

    scene.add(saturnRing)


    // Cleanup: Remove the box from the scene when component is unmounted
    return () => {
      scene.remove(saturn);
    };
  }, [scene]);

  return null; // This component doesn’t render anything by itself
};

export default Saturn;
