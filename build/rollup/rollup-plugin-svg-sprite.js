const fs = require('fs')
const path = require('path')
const {createFilter} = require('rollup-pluginutils')
module.exports = function svgSprite(options = {}) {
  const filter = createFilter( options.include, options.exclude );
  return {
    name: 'rollup-plugin-svg-sprite',
    load(id) {
      if (!filter(id)) {
        return
      } 
      const {
        ext: extName,
        name,
      } = path.parse(id)
      if (extName === '.svg') {
        const xmlns = 'http://www.w3.org/2000/svg'
        const code = fs.readFileSync(id, {
          encoding: 'utf8'
        })
        const symbolCode = code.replace(/<svg(.*)>(.*)<\/svg>/, function(match, p1, p2) {
          return `<symbol${p1}>${p2}</symbol>`
        })
        const template = `var element = document.createElementNS("${xmlns}", "svg");
                          var defs = document.createElementNS("${xmlns}", "defs");
                          element.appendChild(defs);
                          element.setAttributeNS(null, "style", "position:absolute;width:0;height:0")
                          var domParser = new DOMParser();
                          var xmlDocument = domParser.parseFromString('${symbolCode}', "application/xml");
                          var svgCore = xmlDocument.children[0]
                          svgCore.setAttributeNS(null, "id", "${name}")
                          defs.appendChild(svgCore);
                          var body = document.querySelector("body");
                          body.appendChild(element);
                          `
        return template
      }
      return void 0
    },
  }
}