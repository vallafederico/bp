import Quad from "./mod/_quad";
// import DomQuad from "./mod/_dom";

export default class {
  constructor(gl) {
    this.gl = gl;

    this.create();
  }

  create() {
    this.quad = new Quad(this.gl);
  }

  render(t, y) {
    if (this.quad) this.quad.render(t);
  }

  resize(gl) {
    this.gl = gl;
    if (this.quad) this.quad.resize(this.gl);
  }
}
