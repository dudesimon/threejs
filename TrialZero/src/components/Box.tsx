// src/components/Box.tsx
import React, { useEffect } from 'react';
import * as THREE from 'three';

interface BoxProps {
  scene: THREE.Scene;
}

const Box: React.FC<BoxProps> = ({ scene }) => {
  useEffect(() => {
    // Create a simple box geometry
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Green box
    const box = new THREE.Mesh(geometry, material);
    
    box.position.set(0, 0, 0); // Position it at the center of the scene

    // Add the box to the scene
    scene.add(box);

    // Cleanup: Remove the box from the scene when component is unmounted
    return () => {
      scene.remove(box);
    };
  }, [scene]);

  return null; // This component doesn’t render anything by itself
};

export default Box;
