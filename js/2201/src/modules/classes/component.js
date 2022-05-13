export default class Component {
  constructor(el) {
    this.selector = el;
    this.element = document.querySelector(this.selector);
    // this.children = [...this.element.children]
  }
}
