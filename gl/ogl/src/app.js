import Gl from "./gl/gl.js";

class App {
  constructor() {
    this.start();
  }

  start() {
    this.gl = new Gl();
  }
}

new App();
