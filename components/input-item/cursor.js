/**
 * get position of input cursor
 */
export function getCursorsPosition(ctrl) {
  /* istanbul ignore if */
  if (!ctrl) {
    return 0
  }
  let CaretPos = 0 // IE Support
  /* istanbul ignore next */
  if (document.selection) {
    ctrl.focus()
    const Sel = document.selection.createRange()
    Sel.moveStart('character', -ctrl.value.length)
    CaretPos = Sel.text.length
  } else if (ctrl.selectionStart || ctrl.selectionStart === '0') {
    // Firefox support
    CaretPos = ctrl.selectionStart
  }
  return CaretPos
}

let timer = null
/**
 * set position of input cursor
 */
export function setCursorsPosition(ctrl, pos) {
  /* istanbul ignore if */
  if (!ctrl) {
    return
  }
  /* istanbul ignore if */
  if (timer) {
    clearTimeout(timer)
  }

  timer = setTimeout(() => {
    /* istanbul ignore next */
    if (ctrl.setSelectionRange) {
      ctrl.focus()
      ctrl.setSelectionRange(pos, pos)
    } else if (ctrl.createTextRange) {
      const range = ctrl.createTextRange()
      range.collapse(true)
      range.moveEnd('character', pos)
      range.moveStart('character', pos)
      range.select()
    }
  }, 50)
}
