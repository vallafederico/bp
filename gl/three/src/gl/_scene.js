import { Scene } from "three";
import Quad from "./_quad.js";

export default class extends Scene {
  constructor(data = {}) {
    super();
    this.data = data;
    // this.shouldRender = true;

    this.create();
  }

  create() {
    this.quad = new Quad();
    this.add(this.quad);
  }

  /** Pass
   */

  render(t) {
    if (!this.shouldRender) return;

    if (this.quad) this.quad.render(t);
    // console.log(t);
  }

  resize() {}
}
