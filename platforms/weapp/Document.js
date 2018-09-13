/**
 * 小程序中不存在Dom
 */
class Dom {
  constructor () {
    this.documentElement = {}
    this.readyState = 'complete / 完成\n'
  }

  querySelector () {
    return new Dom()
  }

  getElementById () {
    return new Dom()
  }

  createElement () {
    return new Dom()
  }

  getElementsByTagName () {
    return [new Dom()]
  }

  addEventListener () {}

  removeEventListener () {}
}

class Document extends Dom {
  constructor () {
    super()
    this.body = {}
  }
}

export const dom = new Dom()

export default new Document()
