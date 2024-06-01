import React, { useRef, useEffect } from 'react';

const PaletteTracker = ({ analyser }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const draw = () => {
      const canvas = canvasRef.current;
      const canvasCtx = canvas.getContext('2d');
      const bufferLength = analyser.fftSize;
      const dataArray = new Uint8Array(bufferLength);

      const drawVisual = () => {
        analyser.getByteFrequencyData(dataArray);
        canvasCtx.fillStyle = 'rgb(0, 0, 0)';
        canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / bufferLength) * 2.5;
        let barHeight;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          barHeight = dataArray[i];

          canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
          canvasCtx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);

          x += barWidth + 1;
        }

        requestAnimationFrame(drawVisual);
      };

      drawVisual();
    };

    draw();
  }, [analyser]);

  return <canvas ref={canvasRef} width="640" height="360"></canvas>;
};

export default PaletteTracker;