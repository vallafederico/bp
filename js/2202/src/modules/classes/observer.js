

export class Observer {
  constructor (element) {
    this.element = element
    this.createObserver();
    this.start();

  }

  createObserver () {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // this.animIn();
        } else {
          // this.animOut();
        }
      })
    });

  }

  start() {
    this.observer.observe(this.element);
  }

  stop() {
    this.observer.unobserve(this.element)
  }

}
