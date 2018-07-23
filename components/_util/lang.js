/* istanbul ignore file */
export function noop() {}

/**
 * Include external script dynamically
 */
export function requireRemoteScript(src, callback) {
  const doc = document
  const head = doc.head || doc.getElementsByTagName('head')[0]

  let node = doc.createElement('script')
  const supportOnload = 'onload' in node
  const onload = function() {
    node = null
    typeof callback === 'function' && callback()
  }

  if (supportOnload) {
    node.onload = onload
  } else {
    node.onreadystatechange = function() {
      if (/loaded|complete/.test(node.readyState)) {
        onload()
      }
    }
  }

  node.async = true
  node.crossOrigin = true
  node.charset = 'utf-8'
  node.src = src
  head.appendChild(node)
}

export function getDpr() {
  const getParam = (name, str) => {
    const reg = new RegExp(`(^|,)${name}=([^,]*)(,|$)`, 'i')
    const r = str.match(reg)
    if (r != null) {
      return r[2]
    }
    return null
  }

  const viewPort = document.querySelector('meta[name=viewport]')

  if (!viewPort) {
    return 1
  }

  const viewPortContent = viewPort.getAttribute('content')
  const initialScale = +(getParam('initial-scale', viewPortContent) || 1)
  const maximumScale = +(getParam('maximum-scale', viewPortContent) || 1)
  const minimumScale = +(getParam('minimum-scale', viewPortContent) || 1)

  return 1 / Math.min(initialScale, maximumScale, minimumScale)
}

/**
 * transform a Function to Blob Url
 */
export function functionToUrl(fn) {
  const blob = new Blob([`(${fn.toString()})(null)`], {type: 'application/javascript'})
  return URL.createObjectURL(blob)
}

/**
 * generate random id
 */
export function randomId(prefix = '', length = 8) {
  return `${prefix}-${parseInt(Math.pow(Math.random() * 10, length))}`
}
