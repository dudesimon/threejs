// src/components/Stars.tsx
import React, { useEffect } from 'react';
import * as THREE from 'three';

const Stars: React.FC<{ scene: THREE.Scene }> = ({ scene }) => {
  useEffect(() => {
    const addStar = () => {
      const geometry = new THREE.SphereGeometry(0.25, 32, 32);
      const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const star = new THREE.Mesh(geometry, material);
      const [x, y, z] = Array(3).fill(0).map(() => THREE.MathUtils.randFloatSpread(100));
      star.position.set(x, y, z);
      scene.add(star);
    };

    for (let i = 0; i < 200; i++) {
      addStar();
    }

    return () => {
      // Optional: Clean up stars if needed (remove from the scene)
      scene.children
        .filter((child) => child instanceof THREE.Mesh && (child as THREE.Mesh).geometry instanceof THREE.SphereGeometry)
        .forEach((star) => scene.remove(star));
    };
  }, [scene]);

  return null;
};

export default Stars;
