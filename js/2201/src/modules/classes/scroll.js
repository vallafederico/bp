import normalizeWheel from "normalize-wheel";
import { lerp, clamp, map } from "../utils/math.js";
import { isTablet } from "../utils/agents.js";
import Prefix from "prefix";

export default class {
  constructor({ element = "data-scroll", factor = 1, doesMouseDrive = true, hasSpeed = true }) {
    this.element = document.querySelector(`[${element}]`);
    this.factor = factor;
    this.mouseDrive = doesMouseDrive;
    this.shouldGetSpeed = hasSpeed; // make param in the future

    // config
    this.changeCss();
    this.position = 0;

    this.shouldScroll = false;

    this.scroll = {
      current: 0,
      target: 0,
      last: 0,
      limit: 500
    };

    // utils
    this.transformPrefix = Prefix("transform");
    this.onResize();
    window.addEventListener("resize", this.onResize.bind(this));

    // start
    if (!mobileOrTablet()) this.init();
  }

  /**
   * Init and Destroy, Start and Stop
   */

  init() {
    // wheel
    document.addEventListener("mousewheel", this.handleWheel.bind(this));
    // mouse and touch
    if (this.mouseDrive) {
      // mouse base
      this.mouse = {
        isDown: false,
        down: 0,
        factor: this.factor * 0.2
      };
      window.addEventListener("mousedown", this.mouseDown.bind(this));
      window.addEventListener("mousemove", this.mouseMove.bind(this));
      window.addEventListener("mouseup", this.mouseUp.bind(this));
    }
    this.start();
  }

  destroy() {
    document.removeEventListener("mousewheel", this.handleWheel.bind(this));
    if (this.mouseDrive) {
      window.removeEventListener("mousedown", this.handleMouseDown.bind(this));
      window.removeEventListener("mousemove", this.handleMouseMove.bind(this));
      window.removeEventListener("mouseup", this.handleMouseUp.bind(this));
    }
    this.stop();
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

  onResize() {
    this.scroll.limit = this.element.clientHeight - window.innerHeight;
  }

  /**
   * Scrolling Events
   */

  handleWheel(e) {
    const normal = normalizeWheel(e).spinY;
    this.scroll.target += normal * 20 * this.factor;
  }

  mouseDown(e) {
    this.mouse.isDown = true;
    this.mouse.down = e.pageY;
  }

  mouseUp() {
    this.mouse.isDown = false;
  }

  mouseMove(e) {
    if (!this.mouse.isDown) return;
    this.scroll.target += (this.mouse.down - e.pageY) * this.mouse.factor;
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
    this.scroll.target = clamp(0, this.scroll.limit, this.scroll.target);
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, 0.1);
    if (this.scroll.target < 0.01) this.scroll.target = 0;

    this.move();
    // check if should stop calculation
    // if (Math.floor(this.scroll.current) == Math.floor(this.scroll.target)) this.isScrolling = false;
  }

  move() {
    // translate selected element
    this.element.style[this.transformPrefix] = `translateY(-${this.scroll.current}px)`;
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
new SmoothScroll({
  // the element that will move AKA full page rapper
  // * default is data-scroll
  element: "data-scroll",
  // movement multiplier 8-15 usually does the job
  // * default is 15
  factor: 1.1,
  // if true mouse click+drag will happen
  // * default is false
  doesMouseDrive: true,
  // if should return speed as a value
  // defaults to false
  hasSpeed: true
});
*/
