// import './styles/main.css';
import Preloader from './modules/preloader.js'
import Dom from './modules/dom.js'



class App {
  constructor() {

    // this.load()
    this.init();

  }

  load() {
    this.preloader = new Preloader();
    this.preloader.once('finished', (data) => console.log(data) );
    this.preloader.once('out', () => this.init() );
    this.preloader.preload();
  }

  init() {
    // this.dom = new Dom()
    // console.log('init!');
    // this.addEventsListeners();


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
    window.addEventListener('resize', this.onResize.bind(this));
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

new App()
