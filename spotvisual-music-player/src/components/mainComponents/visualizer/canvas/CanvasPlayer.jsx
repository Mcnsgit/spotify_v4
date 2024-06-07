import "./reactive-canvas-one.scss";
import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import SceneInit from "../../../utils/InitScene.jsx";
import { vertexShader, fragmentShader } from "../../../utils/Shaders.jsx";
import { GUI } from "dat-gui";

//*Component Import
import AudioPlayer from "../../player/Audioplayer.jsx";
import { Player } from "../../player/Player.jsx";
import { AudioUploader } from "../audioUploader/AudioUploader.jsx";
import { AudioMicrophone } from "../audioMicrophone/AudioMicrophone.jsx";
import ShapeSelector from "../ShapeSelector/ShapeSelector.jsx";
import { Instructions } from "../Instructions/Instructions.jsx";
import PlayerController from "../../playerControls/PlayerControls.jsx";

let test, audioContext,  audioElement, dataArray, analyser, source, gui;


export default function ReactiveCanvasOne() {
  const [componentState, setComponentState] = useState("player");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentShape, setCurrentShape] = useState(null);
  const player = useSpotifyPlayer();
  const audioRef = useRef(null);
  
  useEffect(() => {
    if (player && player.isPlaying) {
      setIsPlaying(true);
    }
  }, [player]);
  const togglePlay = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
  };

  const clearGui = () => {
    const myGuiContainer = document.getElementById("myGui");
    myGuiContainer.innerHTML = "";
  };

  const selectShape = (shape) => {
    setCurrentShape(shape);
  };

  const renderSwitch = (componentState) => {
    switch (componentState) {
      case "player":
        return (
          <AudioPlayer
            togglePlay={togglePlay}
            setComponentState={setComponentState} 
            />
        );
      case "upload":
        return <AudioUploader setComponentState={setComponentState} />;
      case "microphone":
        return <AudioMicrophone setComponentState={setComponentState} />;
      default:
        return (
          <AudioPlayer 
            togglePlay={togglePlay} 
            setComponentState={setComponentState}
            />
        );
    }
  };

  const initGui = () => {
    gui = new GUI({ autoPlace: false });
    gui.domElement.id = "gui";
    const myGuiContainer = document.getElementById("myGui");
    myGuiContainer.appendChild(gui.domElement);
  };

  const setupAudioContext = () => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioContext = new AudioContext();
      const source = audioContext.createMediaElementSource(audioElement);
      analyser = audioContext.createAnalyser();
      source.connect(analyser);
      analyser.connect(audioContext.destination);
      analyser.fftSize = 1024;
      dataArray = new Uint8Array(analyser.frequencyBinCount);
    }
  };

  const render = (uniforms) => {
    if (!audioContext) setupAudioContext();
    analyser.getByteFrequencyData(dataArray);
    uniforms.u_amplitude.value = 20.0;
    uniforms.u_color_r.value = 32.0;
    uniforms.u_color_g.value = 32.0;
    uniforms.u_color_b.value = 32.0;
    requestAnimationFrame(() => render(uniforms));
  };

  useEffect(() => {
    window.addEventListener("resize", windowResize);
    return () => window.removeEventListener("resize", windowResize);
  }, []);
      
const windowResize = () => {
   if (audioContext) {
    analyser.getByteFrequencyData(dataArray);
    requestAnimationFrame(() => {
      render();
    })
   }
  }


 const play = () => {
    if (!audioContext) setupAudioContext();
    const uniforms = {
      u_amplitude: { type: 'f', value: 20.0 },
      u_data_arr: { type: 'float[64]', value: dataArray },
      u_color_r: { type: 'f', value: 32.0 },
      u_color_g: { type: 'f', value: 32.0 },
      u_color_b: { type: 'f', value: 32.0 },
    };
  
    const choseShape = (currentShape) => {
      switch (currentShape) {
        case "sphere":
          return new THREE.SphereGeometry(64, 64, 64);
        case "plane":
          return new THREE.PlaneGeometry(64, 64, 64, 64);
        case "torus":
          return new THREE.TorusGeometry(64, 20, 10, 100);
        default:
          return "none";
      
    };
  
     const planeGeometry = new THREE.PlaneGeometry(64, 64, 64, 64);
    const planeMaterial = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: vertexShader(),
      fragmentShader: fragmentShader(),
      wireframe: true,
    });

    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    render(uniforms);
  };
  
  useEffect(() => {
    if (currentShape) play();
  }, [currentShape, isPlaying]);

    clearGui();
    initGui();

    const audioWaveGui = gui.addFolder("audio");
    audioWaveGui
      .add(uniforms.u_amplitude, "value", 1.0, 100.0)
      .name("amplitude")
      .listen();

    const shapeResponse = gui.addFolder("shape");
    shapeResponse
    .add(planeCustomMaterial, "wireframe")
    .name("wireframe")
    .listen();

    const color = gui.addFolder("colour");
    color.add(uniforms.u_color_r, "value", 0.0, 250.0).name("R").listen();
    color.add(uniforms.u_color_g, "value", 0.0, 250.0).name("G").listen();
    color.add(uniforms.u_color_b, "value", 0.0, 250.0).name("B").listen();

    if (isPlaying) {
      render(uniforms);
    }
  };

  useEffect(() => {
    test = new SceneInit("myThreeJsCanvas");
    test.initScene();
    test.animate();

    if (currentShape) {
      play();
    }
  }, [currentShape, isPlaying]);

  
  return (
    <>
      <div className="reactive-canvas__controls">
        <ShapeSelector currentShape={currentShape} selectShape={selectShape} />
        {!currentShape && <Instructions instruction={"shape"} />}
        {currentShape && renderSwitch(componentState)}
        {audioContext === undefined && <Instructions instruction={"audio"} />}
        <div id="myGui" className="reactive-canvas__gui"></div>
      </div>
      <div id="canvas-container">
      <canvas id="myThreeJsCanvas"></canvas>
      <audio ref={audioRef} controls></audio>
    </div>
      <div className="reactive-canvas__container" id="canvas-container">
        <canvas id="myThreeJsCanvas"></canvas>
      </div>
    </>
  );
}