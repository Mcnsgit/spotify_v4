import { useEffect, useState } from 'react';
import AudioAnalyzer from '../services/AudioAnalyzer';

const useAudioAnalyzer = (audioSource) => {
    const [frequencyData, setFrequencyData] = useState([]);
    const [waveformData, setWaveformData] = useState([]);
    const [audioAnalyzer, setAudioAnalyzer] = useState(null);

    useEffect(() => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const analyzer = new AudioAnalyzer(audioContext, audioSource);
        setAudioAnalyzer(analyzer);

        const updateData = () => {
            setFrequencyData(analyzer.getFrequencyData());
            setWaveformData(analyzer.getWaveformData());
            requestAnimationFrame(updateData);
        };

        updateData();

        return () => {
            audioContext.close();
        };
    }, [audioSource]);

    return { frequencyData, waveformData, audioAnalyzer };
};

export default useAudioAnalyzer;
