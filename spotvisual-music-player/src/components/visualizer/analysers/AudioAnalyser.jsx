import React, { useRef, useEffect } from 'react';

const AudioAnalyzer = ({ audioContext, source }) => {
  const analyser = useRef(null);
  const dataArray = useRef(null);

  useEffect(() => {
    if (audioContext && source) {
      analyser.current = audioContext.createAnalyser();
      source.connect(analyser.current);
      analyser.current.fftSize = 2048;
      dataArray.current = new Uint8Array(analyser.current.frequencyBinCount);
    }
  }, [audioContext, source]);

  const getFrequencyData = () => {
    if (analyser.current && dataArray.current) {
      analyser.current.getByteFrequencyData(dataArray.current);
      return dataArray.current;
    }
    return [];
  };

  return (
    <div>
      <button onClick={getFrequencyData}>Get Frequency Data</button>
    </div>
  );
};

export default AudioAnalyzer;