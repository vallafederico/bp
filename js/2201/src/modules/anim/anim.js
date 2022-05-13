import gsap from 'gsap'
import SplitText from '../../libs/SplitText.min.js'
import { anim } from '../utils/config.js'

/*
 * Animation
*/

export class Animation {
  constructor (element) {
    this.element = element;

    // displayt none gate
    if (
      this.element.offsetWidth === 0 ||
      this.element.offsetHeight === 0
    ) return;

    this.createObserver();
    this.start();

  }

  createObserver () {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animIn();
        } else {
          this.setOut();
        }
      })
    },
    {
      // root: document.querySelector('#scrollArea'),
      rootMargin: '200px',
      threshold: 1.0
    });

  }

  start() {
    this.observer.observe(this.element);
  }

  stop() {
    this.observer.unobserve(this.element)
  }

  animIn() {}
  animOut() {}
  setIn() {}
  setOut() {}

}
