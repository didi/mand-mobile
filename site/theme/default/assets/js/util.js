export function findMenu(list, nav) {
  let sublist
  list.forEach(item => {
    if (item.name === nav) {
      return (sublist = item.menu)
    }
  })
  return sublist
}


export function setScale (scale) {
  const viewPort = document.querySelector('meta[name=viewport]')

  if (!viewPort) {
    return
  }

  const viewPortContent = viewPort.getAttribute('content')
  const viewPortContentParts = viewPortContent.split(',')

  let newViewPortContent = ''

  for (let i = 0, len = viewPortContentParts.length; i < len; i++) {
    const attr = viewPortContentParts[i]
    if ((attr.indexOf('initial-scale') >= 0) || (attr.indexOf('maximum-scale') >= 0) || (attr.indexOf('minimum-scale') >= 0)) {
      continue
    } else {
      newViewPortContent += `${attr},`
    }
  }
  newViewPortContent += `initial-scale=${scale}, maximum-scale=${scale}, minimum-scale=${scale}`
  viewPort.setAttribute('content', newViewPortContent)
}


function getStorage (type, key) {
  const storage = window[type]
  const json = /^[{[][\w\W]*[}\]]$/
  try {
    const item = storage.getItem(key) || undefined
    return json.test(item)
      ? JSON.parse(storage.getItem(key)) || undefined
      : item
  } catch (e) {
    return null
  }
}

function setStorage (type, key, value) {
  const storage = window[type]
  let val = null
  if (typeof value === 'object') {
    val = JSON.stringify(value)
  } else {
    val = value
  }
  try {
    storage.setItem(key, val)
    return true
  } catch (e) {
    return false
  }
}

export function localStore (key, value) {
  if (value === undefined) {
    return getStorage('localStorage', key)
  } else {
    return setStorage('localStorage', key, value)
  }
}

export function sessionStore (key, value) {
  if (value === undefined) {
    return getStorage('sessionStore', key)
  } else {
    return setStorage('sessionStore', key, value)
  }
}

export function debouce (fn, delay = 0) {
  let timer = null

  return function () {
    // @ts-ignore
    let context = this
    
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(function () {
      fn.apply(context, arguments)
    }, delay)
  }
}

export function throttle (fn, interval = 0) {
  let last = 0

  return function () {
    // @ts-ignore
    let context = this
    const now = Date.now()

    if (now - last > interval) {
      last = now
      fn.apply(context, arguments)
    }
  }
}

