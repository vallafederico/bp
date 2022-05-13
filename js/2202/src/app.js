// import './styles/main.css';
import Preloader from "./modules/preloader";
import Dom from "./modules/dom";

import Scroll from "./modules/classes/scroll";

class App {
  constructor() {
    this.body = document.querySelector("body");
    // this.load()
    this.init();
  }

  load() {
    this.preloader = new Preloader();
    this.preloader.once("finished", (data) => console.log(data));
    this.preloader.once("out", () => this.init());
    this.preloader.preload();
  }

  init() {
    // this.dom = new Dom()
    // console.log('init!');
    // this.addEventsListeners();

    this.scroll = new Scroll();
  }

  /*
   ** Loop
   */

  update() {
    window.requestAnimationFrame(this.update.bind(this));
  }

  /*
   ** Events
   */

  addEventsListeners() {
    new ResizeObserver((entry) => this.onResize(entry[0].contentRect)).observe(
      this.body
    );

    if ("ontouchmove" in window) {
      window.addEventListener("touchstart", this.handleMouseDown.bind(this));
      window.addEventListener("touchmove", this.handleMouseMove.bind(this));
      window.addEventListener("touchend", this.handleMouseUp.bind(this));
    } else {
      window.addEventListener("mousedown", this.handleMouseDown.bind(this));
      window.addEventListener("mousemove", this.handleMouseMove.bind(this));
      window.addEventListener("mouseup", this.handleMouseUp.bind(this));
    }
  }

  onResize() {
    // console.log('resizing');
  }

  handleMouseDown() {}
  handleMouseMove() {}
  handleMouseUp() {}
}

new App();
