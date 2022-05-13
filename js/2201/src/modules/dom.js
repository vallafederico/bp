import { Char, Word } from './anim/text.js'

export default class {
  constructor() {

    this.create()
  }

  create() {
    // this.titles = this.createTitles()
    // this.paragraphs = this.createParagraphs()


  }

  /* Dom Animations Functions
  **/

  createTitles(id = '[data-dom="tit"]') {
    return [...document.querySelectorAll(id)].map((item) => {
      const el = new Char(item);
      el.setOut()
      return el;
    })
  }

  createParagraphs(id = '[data-dom="par"]') {
    return [...document.querySelectorAll(id)].map((item) => {
      const el = new Word(item);
      el.setOut()
      return el;
    })
  }


}
