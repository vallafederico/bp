import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Scene from "./_scene.js";

export default class Gl {
  constructor(sel) {
    this.renderer = new THREE.WebGLRenderer({});

    this.vp = {
      w: window.innerWidth,
      h: window.innerHeight,
      pixelRatio: Math.min(window.devicePixelRatio, 2),
      container: document.getElementById(sel),
    };

    this.renderer.setPixelRatio(this.vp.pixelRatio);
    this.renderer.setSize(this.vp.w, this.vp.h);
    this.renderer.setClearColor(0x000000, 1);

    this.vp.container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.001,
      1000
    );

    this.camera.position.set(0, 0, 2);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.paused = false;
    this.time = 0;

    this.init();
  }

  init() {
    this.create();
    this.render();

    this.initEvents();
  }

  initEvents() {
    // resize
    new ResizeObserver((entry) => this.resize(entry[0].contentRect)).observe(
      this.vp.container
    );
    // tab
    document.addEventListener("visibilitychange", () => {
      document.hidden ? (this.paused = true) : (this.paused = false);
    });
  }

  create() {
    this.scene = new Scene();
  }

  render() {
    if (this.paused) return;
    this.time += 0.05;

    this.renderChild(this.time);

    requestAnimationFrame(this.render.bind(this));
    this.renderer.render(this.scene, this.camera);
  }

  renderChild(t = 0) {
    if (this.scene && this.scene.render) this.scene.render(t);
  }

  resize() {
    // console.log("resize");
    this.vp.w = this.vp.container.offsetWidth;
    this.vp.h = this.vp.container.offsetHeight;

    this.renderer.setSize(this.vp.w, this.vp.h);
    this.camera.aspect = this.vp.w / this.vp.h;
    this.camera.updateProjectionMatrix();

    this.resizeChild();
  }

  resizeChild() {
    // this.plane.scale.set(this.fullScreen.x, this.fullScreen.y, 0.);
  }

  /* Utils
   */

  get viewSize() {
    const fovInRad = (this.camera.fov * Math.PI) / 180;
    const height = Math.abs(
      this.camera.position.z * Math.tan(fovInRad / 2) * 2
    );
    return { w: height * (this.vp.w / this.vp.h), h: height };
  }

  get res() {
    let ratio = 1.5 / 1,
      a,
      b;
    a = b = 1;
    if (-1 * this.camera.aspect > ratio) {
      a = this.camera.aspect * ratio;
    } else {
      b = -1 * this.camera.aspect * ratio;
    }
    return new THREE.Vector4(
      this.vp.w,
      this.vp.h,
      1,
      -1 * this.camera.aspect * ratio
    );
  }

  get fullScreen() {
    return {
      x: this.viewSize.w / this.geometry.parameters.width || 1,
      y: this.viewSize.h / this.geometry.parameters.height || 1,
    };
  }
}
