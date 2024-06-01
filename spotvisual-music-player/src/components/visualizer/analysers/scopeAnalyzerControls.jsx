import React from 'react';

const ScopeAnalyzerControls = ({ analyser }) => {
  const handleTimeDomain = () => {
    const bufferLength = analyser.fftSize;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteTimeDomainData(dataArray);
    console.log(dataArray);
  };

  return (
    <div>
      <button onClick={handleTimeDomain}>Get Time Domain Data</button>
    </div>
  );
};

export default ScopeAnalyzerControls;