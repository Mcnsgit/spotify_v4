import React, { useEffect } from "react";

class AudioAnalyzer {
    constructor(audioContext, audioSource) {
        this.audioContext = audioContext;
        this.analyser = audioContext.createAnalyser();
        this.audioSource = audioSource;
        this.audioSource.connect(this.analyser);
        this.analyser.connect(audioContext.destination);
        this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    }

    getFrequencyData() {
        this.analyser.getByteFrequencyData(this.dataArray);
        return this.dataArray;
    }

    getWaveformData() {
        this.analyser.getByteTimeDomainData(this.dataArray);
        return this.dataArray;
    }

    detectBeats() {
            // Implement beat detection logic
            // A basic implementation of beat detection
            // uses a peak picker to detect peaks in the frequency spectrum.
            // The algorithm sets a threshold, and if the peak is above the threshold,
            // it is considered a beat.
            // In this case, the threshold is set to 128, but can be adjusted.
            const peaks = this.dataArray.slice().map((value, index) => {
                if (value > 128 && (index === 0 || this.dataArray[index - 1] < 128) && (index === this.dataArray.length - 1 || this.dataArray[index + 1] < 128)) {
                    return value;
                } else {
                    return null;
                }
            }).filter(value => value !== null);
            return peaks.length > 0;
        }
}

export default AudioAnalyzer;

