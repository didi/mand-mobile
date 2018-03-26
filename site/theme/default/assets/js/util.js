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