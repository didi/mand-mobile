import {root, inBrowser} from './env'

/* istanbul ignore file */
export const render = (function(global) {
  // for ssr
  if (!inBrowser) {
    return function(content, left, top) {
      content.style.marginLeft = left ? `${-left}px` : ''
      content.style.marginTop = top ? `${-top}px` : ''
    }
  }
  const docStyle = document.documentElement.style

  let engine

  if (global.opera && Object.prototype.toString.call(opera) === '[object Opera]') {
    engine = 'presto'
  } else if ('MozAppearance' in docStyle) {
    engine = 'gecko'
  } else if ('WebkitAppearance' in docStyle) {
    engine = 'webkit'
  } else if (typeof navigator.cpuClass === 'string') {
    engine = 'trident'
  }

  const vendorPrefix = {
    trident: 'ms',
    gecko: 'Moz',
    webkit: 'Webkit',
    presto: 'O',
  }[engine]

  const helperElem = document.createElement('div')
  const perspectiveProperty = vendorPrefix + 'Perspective'
  const transformProperty = vendorPrefix + 'Transform'

  if (helperElem.style[perspectiveProperty] !== undefined) {
    return function(content, left, top, useNativeDriver = true) {
      if (useNativeDriver) {
        content.style[transformProperty] = `translate3d(${-left}px,${-top}px,0)`
      } else {
        content.style[transformProperty] = `translate(${-left}px,${-top}px)`
      }
    }
  } else if (helperElem.style[transformProperty] !== undefined) {
    return function(content, left, top) {
      content.style[transformProperty] = `translate(${-left}px,${-top}px)`
    }
  } else {
    return function(content, left, top) {
      content.style.marginLeft = left ? `${-left}px` : ''
      content.style.marginTop = top ? `${-top}px` : ''
    }
  }
})(root)
