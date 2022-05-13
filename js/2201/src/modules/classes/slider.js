import Prefix from "prefix";
import Component from "./component"
import { clamp } from "../utils/math";


export default class Slider extends Component {
  constructor(element) {
    super(element)

    this.changeCss();
    this.slides = [...this.element.children]

    // utils
    this.transformPrefix = Prefix("transform")

    // config
    this.shouldSlide = false;
    this.isClicked = false
    this.isDrag = false
    this.factor = 0.0015
    this.pos = 0
    this.speed = 0
    this.rounded = 0

    // launch
    this.onResize()

    // this.init()
    // this.start()

  }

  start() {
    this.shouldSlide = true;
    this.slide();
  }

  stop() {
    this.shouldSlide = false;
  }

  init() {
    // on mouse drag
    if ("ontouchmove" in window) {
      this.element.addEventListener("touchstart", this.mouseDown.bind(this))
      this.element.addEventListener("touchmove", this.mouseMove.bind(this))
      this.element.addEventListener("touchend", this.mouseUp.bind(this))
    } else {
      this.element.addEventListener("mousedown", this.mouseDown.bind(this))
      this.element.addEventListener("mousemove", this.mouseMove.bind(this))
      this.element.addEventListener("mouseup", this.mouseUp.bind(this))
    }
    document.addEventListener("mouseleave", () => {this.isClicked = false} ) // safety check to prevent slide when mouse exits window

    // on wheel
    // this.element.addEventListener('wheel', this.wheel.bind(this));

  }

  destroy() {
    if ("ontouchmove" in window) {
      this.element.removeEventListener("touchstart", this.mouseDown.bind(this));
      this.element.removeEventListener("touchmove", this.mouseMove.bind(this));
      this.element.removeEventListener("touchend", this.mouseUp.bind(this));
    } else {
      this.element.removeEventListener("mousedown", this.mouseDown.bind(this));
      this.element.removeEventListener("mousemove", this.mouseMove.bind(this));
      this.element.removeEventListener("mouseup", this.mouseUp.bind(this));
    }
  }

  wheel(e) {
    this.speed = -e.deltaY * this.factor;
  }

  mouseDown(e) {
    this.isClicked = true;
  }

  mouseMove(e) {
    if (!this.isClicked) return;
    this.drag = true;
    this.speed = e.movementX * this.factor;

  }

  mouseUp(e) {
    this.isClicked = false;
    // (!this.isDrag) ? console.log('only click') : this.isDrag = false;

  }


  slide() {
    if (!this.shouldSlide) return

    // Easing Calculation
    this.pos += this.speed;
    this.speed *= .95;

    // snap to position
    if(!this.isClicked) {
      this.rounded = Math.round(this.pos);
      let diff = this.rounded - this.pos;
      this.pos += Math.sign(diff) * Math.pow(Math.abs(diff), .75) * .06; // .025
    }

    // limit movement
    this.pos = clamp(-this.fullWidth * this.factor, 0 , this.pos)

    // slide
    this.slides.forEach((item, i) => {
      item.style[this.transformPrefix] = `translateX(${this.pos*this.slideWidth}px)`;
    });

    window.requestAnimationFrame(this.slide.bind(this))
  }

  /*
   * Utils
   */

   onResize() {
     this.slideWidth = this.slides[0].clientWidth
     this.fullWidth = (this.slideWidth * this.slides.length) - this.element.clientWidth
   }

  changeCss() {
    this.element.style.draggable = false;
  }

}
