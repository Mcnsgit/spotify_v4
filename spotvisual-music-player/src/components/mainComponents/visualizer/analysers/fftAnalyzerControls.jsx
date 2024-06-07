import React from 'react';

const FftAnalyzerControls = ({ analyser }) => {
  const handleFftSizeChange = (event) => {
    analyser.fftSize = event.target.value;
  };

  return (
    <div>
      <label htmlFor="fftSize">FFT Size: </label>
      <input
        type="range"
        id="fftSize"
        name="fftSize"
        min="32"
        max="2048"
        step="1"
        onChange={handleFftSizeChange}
      />
    </div>
  );
};

export default FftAnalyzerControls;