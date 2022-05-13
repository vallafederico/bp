import normalizeWheel from "normalize-wheel";
import { lerp, clamp, map } from "../utils/math.js";
import { isTablet } from "../utils/agents.js";
import Prefix from "prefix";

export default class {
  constructor() {
    this.element = document.querySelector(`[data-scroll]`);
    this.factor = 1;
    this.mouseDrive = true;
    this.shouldGetSpeed = false;
    this.ag = isTablet();

    // config
    this.changeCss();
    this.position = 0;
    this.scroll = {
      current: 0,
      target: 0,
      last: 0,
      limit: 500,
    };

    // utils
    this.transformPrefix = Prefix("transform");
    new ResizeObserver((entry) => this.onResize(entry[0].contentRect)).observe(
      this.element
    );

    // start
    this.init();
  }

  /**
   * Init and Destroy, Start and Stop
   */

  init() {
    // wheel
    document.addEventListener("wheel", this.handleWheel.bind(this));

    if ("ontouchmove" in window) {
      this.touch = {
        isDown: false,
        down: 0,
        factor: this.factor * 0.2,
      };

      window.addEventListener("touchstart", this.touchDown.bind(this));
      window.addEventListener("touchmove", this.touchMove.bind(this));
      window.addEventListener("touchend", this.touchUp.bind(this));
    } else if (this.mouseDrive) this.initMouse();

    this.start();
  }

  initMouse() {
    this.mouse = {
      isDown: false,
      down: 0,
      factor: this.factor * 0.2,
    };

    window.addEventListener("mousedown", this.mouseDown.bind(this));
    window.addEventListener("mousemove", this.mouseMove.bind(this));
    window.addEventListener("mouseup", this.mouseUp.bind(this));
    window.addEventListener("mouseout", this.mouseUp.bind(this));
  }

  destroy() {
    document.removeEventListener("wheel", this.handleWheel.bind(this));
    if (this.mouseDrive) this.destroyMouse();

    this.stop();
  }

  destroyMouse() {
    window.removeEventListener("mousedown", this.mouseDown.bind(this));
    window.removeEventListener("mousemove", this.mouseMove.bind(this));
    window.removeEventListener("mouseup", this.mouseUp.bind(this));
  }

  start() {
    this.shouldScroll = true;
    this.raf();
  }

  stop() {
    this.shouldScroll = false;
  }

  /**
   * Utility methods
   */

  onResize(data) {
    // console.log("resize", data.height);
    this.scroll.limit = data.height - window.innerHeight;
  }

  /**
   * Scrolling Events
   */

  handleWheel(e) {
    const normal = normalizeWheel(e).spinY;
    this.scroll.target += normal * 20 * this.factor;
  }

  /**
   * Mouse Events
   */

  mouseDown(e) {
    if (e.which !== 1) return;
    this.mouse.isDown = true;
    this.mouse.down = e.pageY;
  }

  mouseUp() {
    this.mouse.isDown = false;
  }

  mouseMove(e) {
    // this.start();
    if (!this.mouse.isDown) return;
    this.scroll.target += (this.mouse.down - e.pageY) * this.mouse.factor;
  }

  /**
   * Touch Events
   */

  touchDown(e) {
    this.touch.isDown = true;
    this.touch.down = e.touches[0].clientY;
  }

  touchUp() {
    this.touch.isDown = false;
  }

  touchMove(e) {
    // this.start();
    if (!this.touch.isDown) return;
    this.scroll.target +=
      (this.touch.down - e.touches[0].clientY) * this.touch.factor;
  }

  /**
   * Loop!
   */

  raf() {
    if (!this.shouldScroll) return;

    this.calc();
    if (this.shouldGetSpeed) this.getSpeed();

    window.requestAnimationFrame(this.raf.bind(this));
  }

  calc() {
    if (Math.abs(this.scroll.target - this.scroll.current) < 0.1) return;

    this.scroll.target = clamp(0, this.scroll.limit, this.scroll.target);
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, 0.1);
    if (this.scroll.target < 0.01) this.scroll.target = 0;

    this.move();
  }

  move() {
    this.element.style[
      this.transformPrefix
    ] = `translateY(-${this.scroll.current}px)`;
  }

  getSpeed() {
    let speed = this.scroll.current - this.scroll.target;
    this.speed = -map(speed, -1000, 1000, -1, 1);
  }

  /**
   * Utils and Fallbacks
   */

  changeCss() {
    this.element.parentElement.style.position = "fixed";
    this.element.parentElement.style.width = "100%";
    this.element.parentElement.style.height = "100%";
    this.element.style.draggable = "false";
  }
}

/*
[X] resize through mutationobserver
[x] detect if mouse leaves the window and stop scroll
[x] correctly handle mobile events
[ ] set flag to handle mobile
  [ ] set mobile as standard scroll
*/
