import React, { useEffect, useRef } from 'react';

const VisualizerAudio = ({ src }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = src;
      audioRef.current.load();
    }
  }, [src]);

  return; 
};

export default VisualizerAudio;