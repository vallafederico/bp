import { Mesh, PlaneBufferGeometry } from "three";
import PlaneMaterial from "./mat/raw/";

export default class extends Mesh {
  constructor(data = {}) {
    super();
    this.data = data;

    this.geometry = new PlaneBufferGeometry(1, 1, 1, 1);
    this.material = new PlaneMaterial();
  }

  render(t) {
    // console.log(t);
  }
}
