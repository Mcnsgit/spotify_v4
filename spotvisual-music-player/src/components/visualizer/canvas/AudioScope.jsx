import React, { useRef, useEffect } from 'react';

const AudioScope = ({ analyser }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const draw = () => {
      const canvas = canvasRef.current;
      const canvasCtx = canvas.getContext('2d');
      const bufferLength = analyser.fftSize;
      const dataArray = new Uint8Array(bufferLength);

      const drawVisual = () => {
        analyser.getByteTimeDomainData(dataArray);
        canvasCtx.fillStyle = 'rgb(200, 200, 200)';
        canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
        canvasCtx.beginPath();

        const sliceWidth = (canvas.width * 1.0) / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0;
          const y = (v * canvas.height) / 2;

          if (i === 0) {
            canvasCtx.moveTo(x, y);
          } else {
            canvasCtx.lineTo(x, y);
          }

          x += sliceWidth;
        }

        canvasCtx.lineTo(canvas.width, canvas.height / 2);
        canvasCtx.stroke();
        requestAnimationFrame(drawVisual);
      };

      drawVisual();
    };

    draw();
  }, [analyser]);

  return <canvas ref={canvasRef} width="640" height="100"></canvas>;
};

export default AudioScope;