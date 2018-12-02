import {inBrowser} from './env'

class Dom {
  appendChild() {}
  removeChild() {}
  querySelector() {}
  addEventListener() {}
  removeEventListener() {}
}

const dom = new Dom()
let mdDocument = dom
let mdBody = dom

mdDocument.body = mdBody

if (inBrowser) {
  mdDocument = window.document
  mdBody = document.body
}

export {mdDocument, mdBody, dom}
