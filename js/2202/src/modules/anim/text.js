import gsap from 'gsap'
import SplitText from '../../libs/SplitText.min.js'
import { Animation } from './anim.js'
import { anim } from '../utils/config.js'


/*
 * Titles
*/

export class Text extends Animation {
  constructor(element) {
    super(element);
    this.element = element;
    this.animated = splitLines(this.element);

  }

  animIn() {
    this.animation = gsap.to(this.animated, {
      y: '0%',
      duration: anim.in.duration,
      ease: anim.in.ease,
      delay: anim.in.delay,
      stagger: {
        each: anim.in.stagger,
        from: anim.in.from
      }
    })
  }

  animOut() {
    this.animation = gsap.to(this.animated, {
      y: '200%',
      duration: anim.out.duration,
      ease: anim.out.ease,
      delay: anim.out.delay,
      stagger: {
        each: anim.out.stagger,
        from: anim.out.from
      }
    })
  }

  setIn() {
    gsap.set(this.animated, {
      y: '0%'
    })
  }

  setOut() {
    if (this.animation) this.animation.kill()

    gsap.set(this.animated, {
      y: '200%',
    })
  }

}


/*
 * Splits
 */

export class Char extends Text {
  constructor(element) {
    super(element);
    this.element = element;
    this.animated = splitChars(this.element);

  }

}

export class Word extends Text {
  constructor(element) {
    super(element);
    this.element = element;
    this.animated = splitWords(this.element);

  }

}

export class Line extends Text {
  constructor(element) {
    super(element);
    this.element = element;
    this.animated = splitLines(this.element);

  }

}




/*
 * Utils
 */

const splitChars = (el) => {
  return new SplitText(el, {
    type:"chars",
  }).chars
}

const splitWords = (el) => {
  return new SplitText(el, {
    type:"words",
  }).words
}

const splitLines = (el) => {
  return new SplitText(el, {
    type:" lines",
  }).lines
}
