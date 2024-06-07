import React, { useEffect } from 'react';
import * as THREE from 'three';

const AutoOrbitCamera = ({ scene, renderer }) => {
  useEffect(() => {
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      camera.position.x = 5 * Math.sin(Date.now() / 1000);
      camera.position.z = 5 * Math.cos(Date.now() / 1000);
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };

    animate();
  }, [scene, renderer]);

  return null;
};

export default AutoOrbitCamera;