// Vue插件，Tap事件处理
import Vue from 'vue'

const _IS_MOBILE = /mobile|table|ip(ad|hone|od)|android/i.test(navigator.userAgent)

const plugin = {
  bind: function(el, binding) {
    el.binding_ref = binding
    el.tapEventHandler = function(evt) {
      const {disabled = false, methods} = el.binding_ref.value
      // 阻止事件冒泡
      evt.stopPropagation()
      // 禁止点击，直接返回
      if (disabled) {
        return
      }
      // 执行点击方法，并回传值
      methods(el.innerHTML)
    }
    el.tapEventHandler_nop = function() {}

    // 绑定监听事件
    if (_IS_MOBILE) {
      el.addEventListener('touchstart', el.tapEventHandler, false)
      el.addEventListener('touchend', el.tapEventHandler_nop, false)
    } else {
      el.addEventListener('click', el.tapEventHandler, false)
    }
  },
  unbind: function(el) {
    // 移除监听事件
    if (_IS_MOBILE) {
      el.removeEventListener('touchstart', el.tapEventHandler, false)
      el.removeEventListener('touchend', el.tapEventHandler_nop, false)
    } else {
      el.removeEventListener('click', el.tapEventHandler, false)
    }
  },
  update: function(el, binding) {
    el.binding_ref = binding
  },
}

export const directiveInit = () => {
  Vue.directive('tap', plugin)
}

export const getParentTag = (startTag, parentTagList = []) => {
  // 传入标签是否是DOM对象
  if (!(startTag instanceof HTMLElement)) {
    return parentTagList
  }
  // 没有父节点
  if (!startTag.parentElement) {
    return parentTagList
  }
  // 父级标签是否是body,是着停止返回集合,反之继续
  if (startTag.parentElement.nodeName !== 'BODY') {
    // 放入集合
    parentTagList.push(startTag.parentElement)
    // 再上一层寻找
    return getParentTag(startTag.parentElement, parentTagList)
  } else {
    // 返回集合,结束
    return parentTagList
  }
}

export const queryCurParentNode = (startTag, idList) => {
  // 查询所有父节点
  const parentTagList = getParentTag(startTag)

  // 查询当前父节点是否含有当前查找className
  const tParentNode = parentTagList.findIndex(item => {
    return (item.id && idList.includes(item.id)) || false
  })
  return tParentNode !== -1
}

/**
 * 将元素滚动到顶部
 * @param {number} position 滚动位置
 * @param {element} elem 要滚动的元素
 */
function scrollToTop(elem, position) {
  if (elem && elem.scrollTo) {
    elem.scrollTo(0, position)
  } else {
    elem.scrollTop = position
  }
}

/**
 * 将元素平滑滚动到指定位置
 * @param position 要滚动的位置
 * @param elem 有滑动的元素
 */
export function scrollSmoothTo(position, elem) {
  // 当前滚动高度
  let scrollTop = elem && elem.scrollTop
  // 滚动step方法
  let step = function() {
    // 距离目标滚动距离
    let distance = position - scrollTop
    // 目标滚动位置
    scrollTop = scrollTop + distance / 5
    if (Math.abs(distance) < 1) {
      scrollToTop(elem, position)
    } else {
      scrollToTop(elem, scrollTop)
      requestAnimationFrame(step)
    }
  }
  step()
}

// 生成唯一值
export function unique() {
  let nowTime = Date.now() || new Date().getTime()
  let str = 'xxxxxxxx-xxxx-7xxx-yxxx-xxxxxxxxxxxx'
  // 高精度计时器
  if (window.performance && typeof window.performance.now === 'function') {
    nowTime += performance.now()
  }

  return str.replace(/[xy]/gi, c => {
    let r = ((nowTime + Math.random() * 16) % 16) | 0
    nowTime = Math.floor(nowTime / 16)
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}
