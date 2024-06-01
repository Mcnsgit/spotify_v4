import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import Stats from "three/examples/jsm/libs/stats.module";

export default class SceneInit {
  constructor(
    canvasID,
    camera,
    scene,
    controls,
    renderer,
    container,
    fov = 36
  ) {
    this.fov = fov;
    this.scene = scene;

    this.camera = camera;
    this.controls = controls;
    this.renderer = renderer;
    this.canvasID = canvasID;
    this.container = container;
  }

  initScene() {
    this.container = document.getElementById("canvas-container");
    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      this.container.offsetWidth / this.container.offsetHeight,
      1,
      1000
    );
    this.camera.position.z = 400;

    this.clock = new THREE.Clock();
    this.scene = new THREE.Scene();

    this.uniforms = {
      u_time: { type: "f", value: 1.0 },
      colorB: { type: "vec3", value: new THREE.Color(0xfff000) },
      colorA: { type: "vec3", value: new THREE.Color(0xffffff) },
    };

    // specify a canvas which is already created in the HTML file and tagged by an id
    // aliasing enabled
    const canvas = document.getElementById("myThreeJsCanvas");
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });
    this.renderer.setSize(
      this.container.offsetWidth,
      this.container.offsetHeight
    );
    this.container.appendChild(canvas);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.scene.background = new THREE.Color(0x000000);

    // this.stats = Stats();
    // document.body.appendChild(this.stats.dom);

    // ambient light which is for the whole scene
    let ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    ambientLight.castShadow = false;
    this.scene.add(ambientLight);

    // spot light which is illuminating the chart directly
    let spotLight = new THREE.SpotLight(0xffffff, 0.55);
    spotLight.castShadow = true;
    spotLight.position.set(0, 80, 10);
    this.scene.add(spotLight);

    // if window resizes
    window.addEventListener("resize", () => this.onWindowResize(), false);
  }

  animate() {
    // NOTE: Window is implied.
    // requestAnimationFrame(this.animate.bind(this));
    window.requestAnimationFrame(this.animate.bind(this));
    this.render();

    this.controls.update();
  }

  render() {
    this.uniforms.u_time.value += this.clock.getDelta();

    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.camera.aspect =
      this.container.offsetWidth / this.container.offsetHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(
      this.container.offsetWidth,
      this.container.offsetHeight
    );
  }
}
