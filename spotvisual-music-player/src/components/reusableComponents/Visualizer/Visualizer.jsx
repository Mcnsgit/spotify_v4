// src/components/reusableComponents/Visualizer/Visualizer.jsx
import React, { useEffect, useRef } from 'react';

const Visualizer = ({ audioData }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const draw = () => {
      // Example visualization code
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Drawing logic goes here
      requestAnimationFrame(draw);
    };

    draw();
  }, [audioData]);

  return <canvas ref={canvasRef} width="300" height="300" />;
};

export default Visualizer;
