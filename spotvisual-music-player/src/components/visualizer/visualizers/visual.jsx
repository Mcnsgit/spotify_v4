import React, { useState, useEffect } from 'react';
import AudioScope from './AudioScope';
import PaletteTracker from './PaletteTracker';
import Visual3D from './Visual3D';

const Visual = ({ audioContext, source }) => {
  const [analyser, setAnalyser] = useState(null);

  useEffect(() => {
    if (audioContext && source) {
      const analyser = audioContext.createAnalyser();
      source.connect(analyser);
      setAnalyser(analyser);
    }
  }, [audioContext, source]);

  return (
    <div>
      {analyser && (
        <>
          <AudioScope analyser={analyser} />
          <PaletteTracker analyser={analyser} />
          <Visual3D analyser={analyser} />
        </>
      )}
    </div>
  );
};

export default Visual;