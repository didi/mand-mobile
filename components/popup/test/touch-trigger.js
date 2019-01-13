export default function(element, eventName, x, y, keyCodeOrValue) {
  const touch = {
    identifier: Date.now(),
    target: element,
    pageX: x,
    pageY: y,
    clientX: x,
    clientY: y,
    radiusX: 2.5,
    radiusY: 2.5,
    rotationAngle: 10,
    force: 0.5,
  }

  const event = document.createEvent('CustomEvent')
  event.initCustomEvent(eventName, true, true, {})
  event.touches = [touch]
  event.targetTouches = [touch]
  event.changedTouches = [touch]
  event.keyCode = keyCodeOrValue
  event.clientX = x
  event.clientY = y
  event.pageX = x
  event.pageY = y

  element.value += keyCodeOrValue

  element.dispatchEvent(event)
}
