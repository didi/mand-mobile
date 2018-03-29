'use strict'
const marked = require('marked')
const fm = require('front-matter')
const highlightCore = require('highlight.js')
const renderer = new marked.Renderer()

let toc = [] // toc html fragment

/**
 * Generate toc during parse heading elements
 * @param {string} text content of heading element
 * @param {number} level level of heading element
 */
renderer.heading = function(text, level) {
  const link = (isShowText = true) => {
    return `<a href="javascript:jumpAnchor('${text}')" class="mfe-blog-toc-item mfe-blog-toc-item-h${level}">${isShowText ? text : '#'}</a>`
  }
  toc.push(link())
  return `<h${level} id="${text}">${text}${link(false)}</h${level}>`
}

const highlight = function(code) {
  return highlightCore.highlightAuto(code).value
}

marked.setOptions({
  renderer: renderer,
  highlight: highlight,
})

/**
 * Parse Markdown content to html fragment & get info from markdown
 * @param {string} content markdown content
 * @return {object} {info, body, toc}
 * info {object} markdown info
 * body {string} html fragment of markdown content
 * toc {string} html fragment of toc
 */
const markdown = function(content) {
  const res = fm(content) // get markdown info from front matter
  toc = []
  return {
    info: res.attributes,
    body: JSON.stringify(marked(res.body)),
    toc: JSON.stringify(toc.join('')),
  }
}

module.exports = {markdown, highlight}
