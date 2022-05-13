import Emitter from "./component.js";

export class SectionObserver extends Emitter {
  constructor(id) {
    super();

    this.sections = [...document.querySelectorAll(id)];
    this.setupObserver();
    this.startObs();
  }

  setupObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          let index = entry.target.elems_index;

          if (entry.isIntersecting) {
            console.log(index);
          } else {
            // console.log('out: ', index)
          }
        });
      },
      {
        root: null,
        threshold: 0.6,
        rootMargin: "20% 20% 20% 20%",
      }
    );
  }

  startObs() {
    this.sections.forEach((section, i) => {
      section.elems_index = i;
      this.observer.observe(section);
    });
  }
}
